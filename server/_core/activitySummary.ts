/**
 * Daily activity summary — collects the last 24 h of user activity and emails
 * a digest to the configured recipient via the Hostinger Mail API.
 *
 * The route POST /api/scheduled/daily-activity-summary is heartbeat-compatible
 * (the Manus Forge cron service can call it on a schedule). When the Forge
 * service is not configured, an in-process timer started in _core/index.ts
 * fires the same function once a day.
 *
 * Requires two secrets (delivered via /run/base44/app.env):
 *   - HOSTINGER_MAIL_API_TOKEN  — Hostinger Mail API bearer token
 *   - ACTIVITY_SUMMARY_RECIPIENT — inbox to receive the digest
 *
 * Without the token the summary still runs but logs to the console instead of
 * sending real mail, so the feature is fully testable in dev.
 */
import { AccountApi, Configuration, SendApi } from "hostinger-mail-api-sdk";
import { ENV } from "./env";
import { getAllUsers, getActivitiesSince } from "../db";

const SUMMARY_WINDOW_HOURS = 24;
const DAY_MS = 1000 * 60 * 60 * 24;

/** Cached mailbox resource ID — fetched once from the Mail API on first send. */
let cachedMailboxResourceId: string | null = null;

/** Resolve the first mailbox the API token can manage. Cached after first call. */
async function getMailboxResourceId(): Promise<string | null> {
  if (cachedMailboxResourceId) return cachedMailboxResourceId;

  const configuration = new Configuration({ accessToken: ENV.hostingerMailApiToken });
  const account = new AccountApi(configuration);
  const { data } = await account.getCurrentAccount();
  const mailbox = data.data.mailboxes?.[0];

  if (!mailbox) {
    console.warn("[ActivitySummary] No mailboxes found for this API token");
    return null;
  }

  cachedMailboxResourceId = mailbox.resourceId;
  console.log(`[ActivitySummary] Using mailbox ${mailbox.address} (${mailbox.resourceId})`);
  return cachedMailboxResourceId;
}

/** Build a readable HTML digest of the recent activity. */
function buildSummaryHtml(activities, users, windowStart: Date): string {
  const dateStr = windowStart.toISOString().slice(0, 10);

  const rows = activities.length
    ? activities
        .map((a) => {
          const time = a.createdAt
            ? new Date(a.createdAt).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "—";
          const who = a.userName ?? a.userOpenId ?? "System";
          const type = (a.type ?? "activity").replace(/_/g, " ");
          const desc = a.description ?? type;
          return `<tr>
            <td style="padding:6px 12px;border-bottom:1px solid #eee">${time}</td>
            <td style="padding:6px 12px;border-bottom:1px solid #eee;font-weight:600">${who}</td>
            <td style="padding:6px 12px;border-bottom:1px solid #eee;text-transform:capitalize">${type}</td>
            <td style="padding:6px 12px;border-bottom:1px solid #eee">${desc}</td>
          </tr>`;
        })
        .join("")
    : `<tr><td colspan="4" style="padding:24px;text-align:center;color:#999">No activity in the last 24 hours.</td></tr>`;

  const activeUsers = users.filter((u) => {
    if (!u.lastSignedIn) return false;
    return Date.now() - new Date(u.lastSignedIn).getTime() < DAY_MS;
  }).length;

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;color:#333;max-width:640px;margin:0 auto;padding:20px">
  <h1 style="font-size:22px;margin-bottom:4px">Ghazara — Daily Activity Summary</h1>
  <p style="color:#666;margin-top:0;margin-bottom:24px">${dateStr} · last 24 hours</p>

  <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
    <tr>
      <td style="background:#f5f5f5;padding:12px 16px;border-radius:8px;text-align:center">
        <div style="font-size:28px;font-weight:700">${activities.length}</div>
        <div style="font-size:12px;color:#666">Activities</div>
      </td>
      <td style="background:#f5f5f5;padding:12px 16px;border-radius:8px;text-align:center">
        <div style="font-size:28px;font-weight:700">${users.length}</div>
        <div style="font-size:12px;color:#666">Total Users</div>
      </td>
      <td style="background:#f5f5f5;padding:12px 16px;border-radius:8px;text-align:center">
        <div style="font-size:28px;font-weight:700">${activeUsers}</div>
        <div style="font-size:12px;color:#666">Active Today</div>
      </td>
    </tr>
  </table>

  <h2 style="font-size:16px;margin-bottom:8px">Activity Log</h2>
  <table style="width:100%;border-collapse:collapse;font-size:14px">
    <thead>
      <tr style="text-align:left;color:#999;font-size:12px;text-transform:uppercase">
        <th style="padding:6px 12px;border-bottom:2px solid #eee">Time</th>
        <th style="padding:6px 12px;border-bottom:2px solid #eee">User</th>
        <th style="padding:6px 12px;border-bottom:2px solid #eee">Type</th>
        <th style="padding:6px 12px;border-bottom:2px solid #eee">Description</th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>

  <p style="margin-top:24px;color:#999;font-size:12px">Sent automatically by Ghazara. Visit the <a href="https://ghazara.net/admin">admin dashboard</a> for details.</p>
</body>
</html>`;
}

/** Plain-text fallback of the digest (for clients without HTML rendering). */
function buildSummaryText(activities, windowStart: Date): string {
  const dateStr = windowStart.toISOString().slice(0, 10);
  if (!activities.length) return `Ghazara — Daily Activity Summary (${dateStr})\n\nNo activity in the last 24 hours.`;
  const lines = activities.map((a) => {
    const time = a.createdAt ? new Date(a.createdAt).toLocaleString() : "—";
    const who = a.userName ?? a.userOpenId ?? "System";
    const desc = a.description ?? a.type;
    return `[${time}] ${who} — ${desc}`;
  });
  return `Ghazara — Daily Activity Summary (${dateStr})\n\n${lines.join("\n")}`;
}

/**
 * Collect recent activity and send the daily digest email.
 * Returns true if the email was delivered (or logged in dev), false on failure.
 */
export async function sendDailyActivitySummary(): Promise<boolean> {
  const windowStart = new Date(Date.now() - SUMMARY_WINDOW_HOURS * 60 * 60 * 1000);

  const [activities, users] = await Promise.all([
    getActivitiesSince(windowStart),
    getAllUsers(),
  ]);

  const dateStr = windowStart.toISOString().slice(0, 10);
  const subject = `Ghazara Daily Summary — ${dateStr} (${activities.length} activities)`;
  const html = buildSummaryHtml(activities, users, windowStart);
  const text = buildSummaryText(activities, windowStart);

  // --- Hostinger Mail API path (requires token + recipient) ---
  if (ENV.hostingerMailApiToken && ENV.activitySummaryRecipient) {
    try {
      const mailboxResourceId = await getMailboxResourceId();
      if (!mailboxResourceId) {
        console.error("[ActivitySummary] Could not resolve a mailbox to send from");
        return false;
      }

      const configuration = new Configuration({ accessToken: ENV.hostingerMailApiToken });
      const sendApi = new SendApi(configuration);
      await sendApi.sendEmail(mailboxResourceId, {
        to: [ENV.activitySummaryRecipient],
        displayName: "Ghazara Summary",
        cc: [],
        bcc: [],
        subject,
        text,
        html,
        attachments: [],
        inReplyTo: undefined as never,
        forwardOf: undefined as never,
      });
      console.log(`[ActivitySummary] Daily digest sent to ${ENV.activitySummaryRecipient} (${activities.length} activities)`);
      return true;
    } catch (error) {
      console.error("[ActivitySummary] Failed to send via Hostinger Mail API:", error);
      return false;
    }
  }

  // --- Dev fallback: log to console (no credentials configured) ---
  console.log(
    "\n[ActivitySummary] (dev — no Hostinger Mail credentials, logging to console)\n" +
      `To: ${ENV.activitySummaryRecipient || "(not configured)"}\nSubject: ${subject}\n\n${text}\n`,
  );
  return true;
}
