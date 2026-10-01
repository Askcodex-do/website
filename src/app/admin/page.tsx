import Link from "next/link";
import { requireAdmin } from "@/lib/admin-guard";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  await requireAdmin("analytics:view");

  const [
    questions,
    published,
    drafts,
    exams,
    subjects,
    topics,
    users,
    openReports,
    newMessages,
    recentAudit,
  ] = await Promise.all([
    db.question.count(),
    db.question.count({ where: { status: "PUBLISHED" } }),
    db.question.count({ where: { status: "DRAFT" } }),
    db.exam.count({ where: { isActive: true } }),
    db.subject.count(),
    db.topic.count(),
    db.user.count(),
    db.report.count({ where: { status: { in: ["OPEN", "REVIEWING"] } } }),
    db.contactMessage.count({ where: { status: "NEW" } }),
    db.auditLog.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: { actor: { select: { email: true } } },
    }),
  ]);

  const cards = [
    { label: "Questions", value: questions, href: "/admin/questions" },
    { label: "Published", value: published, href: "/admin/questions?status=PUBLISHED" },
    { label: "Drafts", value: drafts, href: "/admin/questions?status=DRAFT" },
    { label: "Exams", value: exams, href: "/admin/taxonomy" },
    { label: "Subjects", value: subjects, href: "/admin/taxonomy" },
    { label: "Topics", value: topics, href: "/admin/taxonomy" },
    { label: "Users", value: users, href: "/admin/users" },
    { label: "Open reports", value: openReports, href: "/admin/reports" },
    { label: "New messages", value: newMessages, href: "/admin/messages" },
  ];

  return (
    <div className="space-y-8">
      <section aria-labelledby="admin-stats">
        <h2 id="admin-stats" className="mb-4 text-xl font-bold">
          Content at a glance
        </h2>
        <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {cards.map((card) => (
            <Link
              key={card.label}
              href={card.href}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 hover:border-brand-300 hover:bg-brand-50"
            >
              <dt className="text-sm text-[var(--text-muted)]">{card.label}</dt>
              <dd className="mt-1 text-2xl font-bold tabular-nums">
                {card.value.toLocaleString()}
              </dd>
            </Link>
          ))}
        </dl>
      </section>

      <section aria-labelledby="admin-audit">
        <h2 id="admin-audit" className="mb-4 text-xl font-bold">
          Recent admin activity
        </h2>
        {recentAudit.length === 0 ? (
          <p className="text-sm text-[var(--text-muted)]">
            No administrative actions recorded yet.
          </p>
        ) : (
          <ul className="divide-y divide-[var(--border)] overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] text-sm">
            {recentAudit.map((entry) => (
              <li key={entry.id} className="flex flex-wrap justify-between gap-2 p-3">
                <span className="font-medium">{entry.action}</span>
                <span className="text-[var(--text-muted)]">
                  {entry.actor?.email ?? "system"} ·{" "}
                  {entry.createdAt.toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
