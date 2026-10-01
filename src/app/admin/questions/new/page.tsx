import Link from "next/link";
import { requireAdmin } from "@/lib/admin-guard";
import { listTaxonomyForAdmin } from "@/services/admin";
import { QuestionForm } from "@/components/admin/question-form";

export const dynamic = "force-dynamic";

export default async function NewQuestionPage() {
  await requireAdmin("question:write");
  const { subjects, topics, exams, levels } = await listTaxonomyForAdmin();

  return (
    <section aria-labelledby="new-question-heading">
      <nav aria-label="Breadcrumb" className="mb-3 text-sm text-[var(--text-muted)]">
        <Link href="/admin/questions" className="hover:underline">
          Questions
        </Link>{" "}
        / New
      </nav>
      <h2 id="new-question-heading" className="mb-4 text-xl font-bold">
        New question
      </h2>
      <QuestionForm
        subjects={subjects.map((s) => ({ id: s.id, name: s.name }))}
        topics={topics.map((t) => ({
          id: t.id,
          name: t.name,
          parentName: t.subjectId,
        }))}
        exams={exams.map((e) => ({ id: e.id, name: e.name }))}
        levels={levels.map((l) => ({ id: l.id, name: l.name }))}
      />
    </section>
  );
}
