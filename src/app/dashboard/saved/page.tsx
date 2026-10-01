import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { listBookmarkedQuestions } from "@/services/engagement";
import { EmptyState } from "@/components/ui";
import { ButtonLink } from "@/components/ui/button";
import { McqCard } from "@/components/mcq/mcq-card";

export const dynamic = "force-dynamic";

export default async function SavedQuestionsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/dashboard/saved");

  const questions = await listBookmarkedQuestions(user.id);

  return (
    <section aria-labelledby="saved-heading">
      <h2 id="saved-heading" className="mb-4 text-xl font-bold">
        Saved questions
      </h2>
      {questions.length === 0 ? (
        <EmptyState
          title="No saved questions yet"
          description="Use the Save button on any question to keep it here."
        action={<ButtonLink href="/mcqs">Browse questions</ButtonLink>}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {questions.map((question) => (
            <McqCard key={question.id} question={question} showSubject />
          ))}
        </div>
      )}
    </section>
  );
}
