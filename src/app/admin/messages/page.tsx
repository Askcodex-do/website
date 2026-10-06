import { requireAdmin } from "@/lib/admin-guard";
import { listContactMessages } from "@/services/admin";
import { ModerationSelect } from "@/components/admin/moderation-select";
import { Badge } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  await requireAdmin("contact:manage");
  const messages = await listContactMessages();

  return (
    <section aria-labelledby="messages-heading">
      <h2 id="messages-heading" className="mb-4 text-xl font-bold">
        Contact messages
      </h2>

      {messages.length === 0 ? (
        <p className="text-sm text-[var(--text-muted)]">No messages received yet.</p>
      ) : (
        <ul className="space-y-3">
          {messages.map((message) => (
            <li
              key={message.id}
              className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Badge tone={message.status === "NEW" ? "brand" : "neutral"}>
                    {message.status}
                  </Badge>
                  <span className="font-medium">{message.subject}</span>
                </div>
                <span className="text-xs text-[var(--text-muted)]">
                  {message.createdAt.toLocaleString()}
                </span>
              </div>
              <p className="mt-2 text-sm">
                <span className="font-medium">{message.name}</span>{" "}
                <a href={`mailto:${message.email}`} className="text-brand-600 hover:underline">
                  &lt;{message.email}&gt;
                </a>
              </p>
              <p className="mt-2 whitespace-pre-line text-sm text-[var(--text-muted)]">
                {message.message}
              </p>
              <div className="mt-3">
                <ModerationSelect
                  kind="message"
                  id={message.id}
                  label="Message status"
                  current={message.status}
                  options={[
                    { value: "NEW", label: "New" },
                    { value: "READ", label: "Read" },
                    { value: "REPLIED", label: "Replied" },
                    { value: "SPAM", label: "Spam" },
                  ]}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
