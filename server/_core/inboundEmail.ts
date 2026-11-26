import { timingSafeEqual } from "crypto";
import type { Express } from "express";
import { createIncomingEmail } from "../blog";

/**
 * Inbound mail webhook.
 *
 * Point the mail provider's inbound route for ghazara.net at
 * `POST /api/email/inbound`. The endpoint accepts JSON or form-encoded bodies
 * and understands the common provider field names (Mailgun, Postmark,
 * SendGrid, Cloudflare Email Workers and generic `{ sender, recipient,
 * subject, body }` payloads).
 *
 * Security: when INBOUND_EMAIL_WEBHOOK_TOKEN is set, callers must send it as
 * `X-Webhook-Token: <token>` (or `?token=<token>`). Without the variable the
 * endpoint still stores mail so local/preview setups work, and logs a warning.
 */

const DEFAULT_RECIPIENT = "info@ghazara.net";
const MAX_BODY_CHARS = 30_000;
const MAX_SUBJECT_CHARS = 500;
const MAX_ADDRESS_CHARS = 320;

let warnedMissingToken = false;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readAddress(value: unknown): string | undefined {
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed || undefined;
  }
  if (Array.isArray(value)) {
    const joined = value.map(readAddress).filter(Boolean).join(", ");
    return joined || undefined;
  }
  if (isRecord(value)) {
    return readAddress(value.address ?? value.email ?? value.value ?? value.text);
  }
  return undefined;
}

function readString(...values: unknown[]): string | undefined {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) return value.trim();
    if (typeof value === "number") return String(value);
    if (Array.isArray(value)) {
      const nested = readString(...value);
      if (nested) return nested;
    }
  }
  return undefined;
}

function htmlToText(html: string): string {
  return html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|li|h[1-6]|tr|blockquote)>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#0?39;/gi, "'")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function readReceivedAt(...values: unknown[]): Date | undefined {
  const raw = readString(...values);
  if (!raw) return undefined;

  if (/^\d{9,13}$/.test(raw)) {
    const numeric = Number(raw);
    const date = new Date(raw.length <= 10 ? numeric * 1000 : numeric);
    return Number.isNaN(date.getTime()) ? undefined : date;
  }

  const date = new Date(raw);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function tokenMatches(provided: string, expected: string): boolean {
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

function clip(value: string | undefined, max: number): string | null {
  if (!value) return null;
  return value.length > max ? value.slice(0, max) : value;
}

export function registerInboundEmailRoute(app: Express) {
  app.post("/api/email/inbound", async (req, res) => {
    const expectedToken = process.env.INBOUND_EMAIL_WEBHOOK_TOKEN?.trim();

    if (expectedToken) {
      const headerToken =
        req.get("x-webhook-token") ?? req.get("authorization")?.replace(/^Bearer\s+/i, "");
      const queryToken = typeof req.query.token === "string" ? req.query.token : undefined;
      const provided = headerToken || queryToken || "";

      if (!tokenMatches(provided, expectedToken)) {
        res.status(401).json({ ok: false, error: "Invalid webhook token" });
        return;
      }
    } else if (!warnedMissingToken) {
      warnedMissingToken = true;
      console.warn(
        "[InboundEmail] INBOUND_EMAIL_WEBHOOK_TOKEN is not set — the inbound email endpoint accepts unauthenticated requests.",
      );
    }

    const payload = isRecord(req.body) ? req.body : {};
    const envelope = isRecord(payload.envelope) ? payload.envelope : {};

    const rawSender = readAddress(
      payload.sender ??
        payload.from ??
        payload.From ??
        payload.from_email ??
        payload.fromEmail ??
        payload.sender_email ??
        envelope.from,
    );

    const rawRecipient = readAddress(
      payload.recipient ??
        payload.to ??
        payload.To ??
        payload.to_email ??
        payload.toEmail ??
        payload.delivered_to ??
        payload.deliveredTo ??
        envelope.to,
    );

    const subject = readString(payload.subject, payload.Subject, payload.title);

    const rawText = readString(
      payload.body,
      payload.text,
      payload.plain,
      payload["body-plain"],
      payload["stripped-text"],
      payload.TextBody,
      payload.content,
    );

    const rawHtml = readString(
      payload.html,
      payload.HtmlBody,
      payload["body-html"],
      payload.body_html,
    );

    const body = rawText ?? (rawHtml ? htmlToText(rawHtml) : undefined);

    if (!rawSender && !subject && !body) {
      res.status(400).json({ ok: false, error: "Empty email payload" });
      return;
    }

    const recipient =
      rawRecipient ??
      process.env.INBOUND_EMAIL_RECIPIENT?.trim() ??
      DEFAULT_RECIPIENT;

    const saved = await createIncomingEmail({
      sender: clip(rawSender ?? "unknown@sender", MAX_ADDRESS_CHARS) ?? "unknown@sender",
      recipient: clip(recipient, MAX_ADDRESS_CHARS) ?? DEFAULT_RECIPIENT,
      subject: clip(subject, MAX_SUBJECT_CHARS),
      body: clip(body, MAX_BODY_CHARS),
      receivedAt: readReceivedAt(
        payload.receivedAt,
        payload.received_at,
        payload.date,
        payload.Date,
        payload.timestamp,
      ),
    });

    if (!saved) {
      res.status(503).json({ ok: false, error: "Mail storage is unavailable" });
      return;
    }

    res.status(201).json({ ok: true, id: saved.id });
  });
}
