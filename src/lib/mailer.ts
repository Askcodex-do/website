import "@/lib/server-guard";

import { emailConfigured, env, siteName } from "@/lib/env";

export interface MailMessage {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

/**
 * Transactional email sender.
 *
 * When SMTP is not configured (the default in development), messages are logged
 * to the server console so flows like password reset remain testable without an
 * external provider. Configure SMTP_* to enable real delivery.
 */
export async function sendMail(message: MailMessage): Promise<void> {
  if (!emailConfigured) {
    console.info(
      `[mailer] SMTP not configured — logging message instead\n` +
        `  to: ${message.to}\n  subject: ${message.subject}\n${message.text}`,
    );
    return;
  }

  // Deliberately dependency-free: nodemailer is only needed when SMTP is used.
  // webpackIgnore keeps the bundler from resolving a package that is optional,
  // so the app builds and runs without it installed.
  const nodemailer = await import(
    /* webpackIgnore: true */ "nodemailer"
  ).catch(() => null);
  if (!nodemailer) {
    console.warn(
      "[mailer] SMTP is configured but `nodemailer` is not installed. " +
        "Run `npm i nodemailer` to enable delivery. Message not sent.",
    );
    return;
  }

  const transport = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_PORT === 465,
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASSWORD },
  });

  await transport.sendMail({
    from: env.SMTP_FROM,
    to: message.to,
    subject: message.subject,
    text: message.text,
    html: message.html ?? message.text.replace(/\n/g, "<br />"),
  });
}

export function verificationEmail(url: string): string {
  return `<p>Welcome to ${siteName}!</p><p>Confirm your email address by clicking the link below:</p><p><a href="${url}">${url}</a></p><p>This link expires in 24 hours.</p>`;
}

export function passwordResetEmail(url: string): string {
  return `<p>We received a request to reset your ${siteName} password.</p><p><a href="${url}">Reset your password</a></p><p>This link expires in 1 hour. If you did not request this, you can ignore this email.</p>`;
}
