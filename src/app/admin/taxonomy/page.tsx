import { requireAdmin } from "@/lib/admin-guard";
import { listTaxonomyForAdmin } from "@/services/admin";
import { Badge } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function TaxonomyPage() {
  await requireAdmin("taxonomy:write");
  const {
    exams,
    subjects,
    topics,
    levels,
    categories,
    organizations,
    subSubjects,
    subtopics,
  } = await listTaxonomyForAdmin();

  return (
    <section aria-labelledby="taxonomy-heading" className="space-y-8">
      <div>
        <h2 id="taxonomy-heading" className="text-xl font-bold">
          Taxonomy
        </h2>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Exams, subjects, topics and education levels. Adding a new exam requires
          data, not code — the selection engine reads these relationships.
        </p>
      </div>

      <div>
        <h3 className="mb-2 text-lg font-semibold">Exams ({exams.length})</h3>
        <div className="overflow-x-auto rounded-[var(--radius-card)] border border-[var(--border)]">
          <table className="w-full text-sm">
            <caption className="sr-only">Exams</caption>
            <thead className="bg-[var(--surface-muted)] text-left">
              <tr>
                <th scope="col" className="p-2">Name</th>
                <th scope="col" className="p-2">Slug</th>
                <th scope="col" className="p-2">Type</th>
                <th scope="col" className="p-2">Mode</th>
                <th scope="col" className="p-2">Questions</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((exam) => (
                <tr key={exam.id} className="border-t border-[var(--border)]">
                  <td className="p-2 font-medium">{exam.name}</td>
                  <td className="p-2 text-[var(--text-muted)]">/{exam.slug}</td>
                  <td className="p-2">{exam.type}</td>
                  <td className="p-2">
                    <Badge tone="brand">{exam.configuration?.mode ?? "RANDOM"}</Badge>
                  </td>
                  <td className="p-2 tabular-nums">{exam.questionCount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-lg font-semibold">Subjects ({subjects.length})</h3>
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => (
            <li
              key={subject.id}
              className="rounded-lg border border-[var(--border)] p-3 text-sm"
            >
              <p className="font-medium">{subject.name}</p>
              <p className="text-xs text-[var(--text-muted)]">/{subject.slug}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="mb-2 text-lg font-semibold">Topics ({topics.length})</h3>
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <li
              key={topic.id}
              className="rounded-lg border border-[var(--border)] p-3 text-sm"
            >
              <p className="font-medium">{topic.name}</p>
              <p className="text-xs text-[var(--text-muted)]">
                {topic.subject.name} · /{topic.slug}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="mb-2 text-lg font-semibold">
          Categories ({categories.length})
        </h3>
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <li
              key={category.id}
              className="rounded-lg border border-[var(--border)] p-3 text-sm"
            >
              <p className="font-medium">{category.name}</p>
              <p className="text-xs text-[var(--text-muted)]">/{category.slug}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="mb-2 text-lg font-semibold">
          Organizations ({organizations.length})
        </h3>
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {organizations.map((organization) => (
            <li
              key={organization.id}
              className="rounded-lg border border-[var(--border)] p-3 text-sm"
            >
              <p className="font-medium">{organization.name}</p>
              <p className="text-xs text-[var(--text-muted)]">
                {organization.shortName ? `${organization.shortName} · ` : ""}
                /{organization.slug}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="mb-2 text-lg font-semibold">
          Sub-subjects ({subSubjects.length})
        </h3>
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {subSubjects.map((subSubject) => (
            <li
              key={subSubject.id}
              className="rounded-lg border border-[var(--border)] p-3 text-sm"
            >
              <p className="font-medium">{subSubject.name}</p>
              <p className="text-xs text-[var(--text-muted)]">
                {subSubject.subject.name} · /{subSubject.slug}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="mb-2 text-lg font-semibold">
          Subtopics ({subtopics.length})
        </h3>
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {subtopics.map((subtopic) => (
            <li
              key={subtopic.id}
              className="rounded-lg border border-[var(--border)] p-3 text-sm"
            >
              <p className="font-medium">{subtopic.name}</p>
              <p className="text-xs text-[var(--text-muted)]">
                {subtopic.topic.name} · /{subtopic.slug}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="mb-2 text-lg font-semibold">Education levels ({levels.length})</h3>
        <ol className="space-y-2">
          {levels.map((level) => (
            <li
              key={level.id}
              className="flex items-center justify-between rounded-lg border border-[var(--border)] p-3 text-sm"
            >
              <span className="font-medium">{level.name}</span>
              <span className="text-xs text-[var(--text-muted)]">
                rank {level.rank} · /{level.slug}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
