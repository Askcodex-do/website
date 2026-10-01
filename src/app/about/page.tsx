import type { Metadata } from "next";
import { ContentPage, contentMetadata } from "@/components/layout/content-page";
import { getPlatformStats } from "@/services/taxonomy";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  return contentMetadata({
    title: "About Us",
    description:
      "Learn how our MCQ practice platform selects questions automatically for each exam, subject and education level.",
    path: "/about",
    keywords: ["about", "MCQ platform", "exam preparation"],
  });
}

export default async function AboutPage() {
  const stats = await getPlatformStats();

  return (
    <ContentPage
      title="About Us"
      description="A focused practice platform for jobs, admissions and competitive examinations."
      path="/about"
      intro={`We maintain a growing bank of ${stats.questions.toLocaleString()} multiple-choice questions across ${stats.subjects} subjects, ${stats.topics} topics and ${stats.exams} exams.`}
      sections={[
        {
          heading: "One engine, every exam",
          paragraphs: [
            "Every question carries structured metadata: subject, topic, the exams it belongs to, education level, difficulty, region and year. A single Question Selection Engine reads that metadata and assembles practice sets and quizzes for any exam.",
            "That means adding a new exam is a configuration task rather than a development project. PST, CSS, JEST and future examinations all share the same reusable architecture.",
          ],
        },
        {
          heading: "Static and random practice",
          paragraphs: [
            "Exams that follow a fixed paper order use static mode, so “PST MCQ 1” is always the same question. Subjects that benefit from variety use random mode, drawing fresh questions from the appropriate pool each time.",
          ],
        },
        {
          heading: "Free to use",
          paragraphs: [
            "You can browse, search, answer questions and take quizzes without an account. Creating an account is optional and only needed to keep your history, bookmarks and progress across devices.",
          ],
        },
        {
          heading: "Accuracy matters",
          paragraphs: [
            "Questions include an explanation and, where relevant, a reference. If you spot an error, use the report button on any question — reports go straight to our moderation queue.",
          ],
        },
      ]}
    />
  );
}
