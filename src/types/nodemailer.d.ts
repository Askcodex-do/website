// Type declarations for optional dependencies that are only loaded at runtime
// when the corresponding feature (SMTP delivery) is configured.

declare module "nodemailer" {
  interface TransportOptions {
    host: string;
    port: number;
    secure: boolean;
    auth: { user: string; pass: string };
  }
  interface SendMailOptions {
    from: string;
    to: string;
    subject: string;
    text: string;
    html?: string;
  }
  interface Transport {
    sendMail(options: SendMailOptions): Promise<unknown>;
  }
  export function createTransport(options: TransportOptions): Transport;
}
