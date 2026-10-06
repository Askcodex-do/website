-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('UNVERIFIED', 'PENDING_REVIEW', 'VERIFIED', 'REJECTED', 'FLAGGED');

-- CreateEnum
CREATE TYPE "ContentOrigin" AS ENUM ('OFFICIAL_PAPER', 'VERIFIED_PRACTICE', 'GENERATED', 'IMPORTED');

-- CreateEnum
CREATE TYPE "PaperKind" AS ENUM ('MOCK', 'SUBJECT', 'TOPIC', 'DIFFICULTY', 'GUESS', 'RANDOM');

-- CreateEnum
CREATE TYPE "PrepPageType" AS ENUM ('OVERVIEW', 'ELIGIBILITY', 'SYLLABUS', 'PATTERN', 'SUBJECTS', 'TOPICS', 'STRATEGY', 'NOTES', 'FAQ', 'PREPARATION');

-- AlterTable
ALTER TABLE "Exam" ADD COLUMN     "categoryId" TEXT,
ADD COLUMN     "duration" TEXT,
ADD COLUMN     "eligibility" TEXT,
ADD COLUMN     "organizationId" TEXT,
ADD COLUMN     "syllabus" TEXT,
ADD COLUMN     "testPattern" TEXT,
ADD COLUMN     "totalMarks" TEXT,
ADD COLUMN     "website" TEXT;

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "origin" "ContentOrigin" NOT NULL DEFAULT 'GENERATED',
ADD COLUMN     "reviewNote" TEXT,
ADD COLUMN     "verification" "VerificationStatus" NOT NULL DEFAULT 'UNVERIFIED',
ADD COLUMN     "verifiedAt" TIMESTAMP(3),
ADD COLUMN     "verifiedById" TEXT;

-- AlterTable
ALTER TABLE "QuizAttempt" ADD COLUMN     "subSubjectId" TEXT,
ADD COLUMN     "subtopicId" TEXT;

-- AlterTable
ALTER TABLE "Topic" ADD COLUMN     "subSubjectId" TEXT;

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shortName" TEXT,
    "website" TEXT,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubSubject" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "subjectId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubSubject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subtopic" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "topicId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subtopic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionSubSubject" (
    "questionId" TEXT NOT NULL,
    "subSubjectId" TEXT NOT NULL,

    CONSTRAINT "QuestionSubSubject_pkey" PRIMARY KEY ("questionId","subSubjectId")
);

-- CreateTable
CREATE TABLE "QuestionSubtopic" (
    "questionId" TEXT NOT NULL,
    "subtopicId" TEXT NOT NULL,

    CONSTRAINT "QuestionSubtopic_pkey" PRIMARY KEY ("questionId","subtopicId")
);

-- CreateTable
CREATE TABLE "PreviousPaper" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "paperName" TEXT,
    "session" TEXT,
    "source" TEXT,
    "reference" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "examId" TEXT,
    "subjectId" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PreviousPaper_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PreviousPaperQuestion" (
    "paperId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "orderIndex" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PreviousPaperQuestion_pkey" PRIMARY KEY ("paperId","questionId")
);

-- CreateTable
CREATE TABLE "GeneratedPaper" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "kind" "PaperKind" NOT NULL DEFAULT 'MOCK',
    "examId" TEXT,
    "subjectId" TEXT,
    "topicId" TEXT,
    "difficulty" "Difficulty",
    "questionCount" INTEGER NOT NULL,
    "timeLimitMinutes" INTEGER,
    "filters" JSONB,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GeneratedPaper_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GeneratedPaperQuestion" (
    "paperId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "orderIndex" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "GeneratedPaperQuestion_pkey" PRIMARY KEY ("paperId","questionId")
);

-- CreateTable
CREATE TABLE "PrepPage" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "examId" TEXT,
    "type" "PrepPageType" NOT NULL DEFAULT 'OVERVIEW',
    "title" TEXT NOT NULL,
    "summary" TEXT,
    "sections" JSONB,
    "faqs" JSONB,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PrepPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionReview" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "reviewerId" TEXT,
    "fromStatus" "VerificationStatus",
    "toStatus" "VerificationStatus" NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuestionReview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE INDEX "Category_isActive_sortOrder_idx" ON "Category"("isActive", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_slug_key" ON "Organization"("slug");

-- CreateIndex
CREATE INDEX "Organization_isActive_idx" ON "Organization"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "SubSubject_slug_key" ON "SubSubject"("slug");

-- CreateIndex
CREATE INDEX "SubSubject_subjectId_isActive_idx" ON "SubSubject"("subjectId", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "Subtopic_slug_key" ON "Subtopic"("slug");

-- CreateIndex
CREATE INDEX "Subtopic_topicId_isActive_idx" ON "Subtopic"("topicId", "isActive");

-- CreateIndex
CREATE INDEX "QuestionSubSubject_subSubjectId_idx" ON "QuestionSubSubject"("subSubjectId");

-- CreateIndex
CREATE INDEX "QuestionSubtopic_subtopicId_idx" ON "QuestionSubtopic"("subtopicId");

-- CreateIndex
CREATE UNIQUE INDEX "PreviousPaper_slug_key" ON "PreviousPaper"("slug");

-- CreateIndex
CREATE INDEX "PreviousPaper_examId_year_idx" ON "PreviousPaper"("examId", "year");

-- CreateIndex
CREATE INDEX "PreviousPaper_subjectId_idx" ON "PreviousPaper"("subjectId");

-- CreateIndex
CREATE INDEX "PreviousPaper_isPublished_verified_idx" ON "PreviousPaper"("isPublished", "verified");

-- CreateIndex
CREATE INDEX "PreviousPaperQuestion_questionId_idx" ON "PreviousPaperQuestion"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "GeneratedPaper_slug_key" ON "GeneratedPaper"("slug");

-- CreateIndex
CREATE INDEX "GeneratedPaper_examId_idx" ON "GeneratedPaper"("examId");

-- CreateIndex
CREATE INDEX "GeneratedPaper_kind_idx" ON "GeneratedPaper"("kind");

-- CreateIndex
CREATE INDEX "GeneratedPaperQuestion_questionId_idx" ON "GeneratedPaperQuestion"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "PrepPage_slug_key" ON "PrepPage"("slug");

-- CreateIndex
CREATE INDEX "PrepPage_examId_type_idx" ON "PrepPage"("examId", "type");

-- CreateIndex
CREATE INDEX "PrepPage_isPublished_idx" ON "PrepPage"("isPublished");

-- CreateIndex
CREATE INDEX "QuestionReview_questionId_createdAt_idx" ON "QuestionReview"("questionId", "createdAt");

-- CreateIndex
CREATE INDEX "QuestionReview_reviewerId_idx" ON "QuestionReview"("reviewerId");

-- CreateIndex
CREATE INDEX "Exam_categoryId_idx" ON "Exam"("categoryId");

-- CreateIndex
CREATE INDEX "Exam_organizationId_idx" ON "Exam"("organizationId");

-- CreateIndex
CREATE INDEX "Question_status_verification_idx" ON "Question"("status", "verification");

-- CreateIndex
CREATE INDEX "Question_origin_idx" ON "Question"("origin");

-- CreateIndex
CREATE INDEX "Topic_subSubjectId_isActive_idx" ON "Topic"("subSubjectId", "isActive");

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubSubject" ADD CONSTRAINT "SubSubject_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_subSubjectId_fkey" FOREIGN KEY ("subSubjectId") REFERENCES "SubSubject"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subtopic" ADD CONSTRAINT "Subtopic_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_verifiedById_fkey" FOREIGN KEY ("verifiedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionSubSubject" ADD CONSTRAINT "QuestionSubSubject_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionSubSubject" ADD CONSTRAINT "QuestionSubSubject_subSubjectId_fkey" FOREIGN KEY ("subSubjectId") REFERENCES "SubSubject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionSubtopic" ADD CONSTRAINT "QuestionSubtopic_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionSubtopic" ADD CONSTRAINT "QuestionSubtopic_subtopicId_fkey" FOREIGN KEY ("subtopicId") REFERENCES "Subtopic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreviousPaper" ADD CONSTRAINT "PreviousPaper_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreviousPaper" ADD CONSTRAINT "PreviousPaper_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreviousPaperQuestion" ADD CONSTRAINT "PreviousPaperQuestion_paperId_fkey" FOREIGN KEY ("paperId") REFERENCES "PreviousPaper"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreviousPaperQuestion" ADD CONSTRAINT "PreviousPaperQuestion_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeneratedPaper" ADD CONSTRAINT "GeneratedPaper_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeneratedPaperQuestion" ADD CONSTRAINT "GeneratedPaperQuestion_paperId_fkey" FOREIGN KEY ("paperId") REFERENCES "GeneratedPaper"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeneratedPaperQuestion" ADD CONSTRAINT "GeneratedPaperQuestion_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrepPage" ADD CONSTRAINT "PrepPage_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizAttempt" ADD CONSTRAINT "QuizAttempt_subSubjectId_fkey" FOREIGN KEY ("subSubjectId") REFERENCES "SubSubject"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizAttempt" ADD CONSTRAINT "QuizAttempt_subtopicId_fkey" FOREIGN KEY ("subtopicId") REFERENCES "Subtopic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionReview" ADD CONSTRAINT "QuestionReview_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionReview" ADD CONSTRAINT "QuestionReview_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
