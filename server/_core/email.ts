/**
 * Email sender — pluggable transport for transactional emails.
 *
 * In development (no SMTP_URL configured) the email content — including the
 * reset link — is logged to the server console so the flow is fully testable
 * without external infrastructure. In production, set `SMTP_URL` to a
 * `smtp://user:pass@host:port` connection string and install a transport
 * library (e.g. nodemailer) to deliver real mail.
 *
 * The function never throws on delivery failure — a failed email is logged
 * but does not surface a 500 to the user, so account-enumeration via error
 * timing is avoided. It returns true/false so callers can decide whether to
 * degrade gracefully.
 */
import { ENV } from "./env";

export interface EmailMessage {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail(message: EmailMessage): Promise<boolean> {
  if (!ENV.smtpUrl) {
    // Dev fallback: print the full message to the console so the reset link is
    // visible in `docker compose logs`. This is the primary path in this env.
    console.log(
      "\n[Email] (dev — no SMTP configured, logging to console)\n" +
        `To: ${message.to}\nSubject: ${message.subject}\n\n${message.html}\n`,
    );
    return true;
  }

  // Production path: delegate to a real transport. Kept behind a dynamic
  // import so the dev environment never needs the transport dependency.
  try {
    // Optional dependency — only present when SMTP is configured for prod.
    // @ts-expect-error — nodemailer is not installed in dev; the import is
    // resolved at runtime only when SMTP_URL is set.
    const { createTransport } = await import("nodemailer");
    const transporter = createTransport(ENV.smtpUrl);
    await transporter.sendMail({
      to: message.to,
      subject: message.subject,
      html: message.html,
    });
    return true;
  } catch (error) {
    console.error("[Email] Failed to send email:", error);
    return false;
  }
}
