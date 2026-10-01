import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { listLikedQuestions } from "@/services/engagement";
import { EmptyState } from "@/components/ui";
import { ButtonLink } from "@/components/ui/button";
import { McqCard } from "@/components/mcq/mcq-card";

export const dynamic = "force-dynamic";

export default async function LikedQuestionsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/dashboard/liked");

  const questions = await listLikedQuestions(user.id);

  return (
    <section aria-labelledby="liked-heading">
      <h2 id="liked-heading" className="mb-4 text-xl font-bold">
        Liked questions
      </h2>
      {questions.length === 0 ? (
        <EmptyState
          title="No liked questions yet"
          description="Like questions you find useful to revisit them quickly."
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
