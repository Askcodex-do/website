import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin-guard";
import { getAdminQuestion, listTaxonomyForAdmin } from "@/services/admin";
import { QuestionForm } from "@/components/admin/question-form";
import { QuestionRowActions } from "@/components/admin/question-row-actions";

export const dynamic = "force-dynamic";

export default async function EditQuestionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin("question:read");
  const { id } = await params;
  const [question, { subjects, topics, exams, levels }] = await Promise.all([
    getAdminQuestion(id),
    listTaxonomyForAdmin(),
  ]);
  if (!question) notFound();

  const correctIndex = Math.max(
    0,
    question.options.findIndex((option) => option.isCorrect),
  );

  return (
    <section aria-labelledby="edit-question-heading">
      <nav aria-label="Breadcrumb" className="mb-3 text-sm text-[var(--text-muted)]">
        <Link href="/admin/questions" className="hover:underline">
          Questions
        </Link>{" "}
        / Edit
      </nav>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 id="edit-question-heading" className="text-xl font-bold">
          Edit question
        </h2>
        <div className="flex items-center gap-3">
          <Link
            href={`/mcqs/${question.slug}`}
            className="text-sm text-brand-600 hover:underline"
          >
            View public page
          </Link>
          <QuestionRowActions id={question.id} status={question.status} />
        </div>
      </div>

      <QuestionForm
        subjects={subjects.map((s) => ({ id: s.id, name: s.name }))}
        topics={topics.map((t) => ({ id: t.id, name: t.name, parentName: t.subjectId }))}
        exams={exams.map((e) => ({ id: e.id, name: e.name }))}
        levels={levels.map((l) => ({ id: l.id, name: l.name }))}
        initial={{
          id: question.id,
          stem: question.stem,
          slug: question.slug,
          options: question.options.map((o) => o.text),
          correctIndex,
          explanation: question.explanation ?? "",
          source: question.source ?? "",
          reference: question.reference ?? "",
          difficulty: question.difficulty,
          status: question.status,
          subjectId: question.subjects[0]?.subjectId ?? "",
          topicId: question.topics[0]?.topicId ?? "",
          examIds: question.exams.map((e) => e.examId),
          educationLevelIds: question.educationLevels.map((l) => l.educationLevelId),
          year: question.year ? String(question.year) : "",
          province: question.province ?? "",
          tags: question.tags.map((t) => t.tag.name).join(", "),
        }}
      />
    </section>
  );
}
