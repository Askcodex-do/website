import type { LegalSection } from "@/components/layout/content-page";

/**
 * Legal and policy copy. Kept in one place so every page renders consistent,
 * dated content and updates stay reviewable in a single diff.
 */

export const privacySections: LegalSection[] = [
  {
    heading: "Information we collect",
    paragraphs: [
      "You can use most of this site without an account. When you register we store your name, email address and a securely hashed password. We never store passwords in plain text.",
      "When you take a quiz while signed in, we store the questions presented, the answers you selected, your score and the time taken so you can review past attempts. Guest quiz attempts are linked to an anonymous cookie rather than a personal account.",
    ],
  },
  {
    heading: "How we use your information",
    paragraphs: [
      "Account data is used to operate your account, keep your history and bookmarks, and let you sign in across devices. Aggregate, non-identifying statistics help us understand which subjects and topics need more questions.",
    ],
    list: [
      "To provide the quiz, bookmark, like and history features you request",
      "To protect the service against abuse, spam and automated attacks",
      "To respond to messages you send through the contact form",
    ],
  },
  {
    heading: "Cookies",
    paragraphs: [
      "We use a small number of essential cookies: one to keep you signed in, and one to remember an anonymous guest session so your quiz progress survives a page refresh. We do not use third-party advertising cookies.",
    ],
  },
  {
    heading: "Data retention and your rights",
    paragraphs: [
      "You may request a copy of your data or ask us to delete your account and associated history at any time using the contact form. We will action verified requests within a reasonable period.",
    ],
  },
  {
    heading: "Security",
    paragraphs: [
      "Passwords are hashed with bcrypt. Sessions are stored server-side and delivered over httpOnly cookies. Administrative actions are recorded in an audit log. Quiz scoring is always computed on the server; the browser is never trusted with correct answers or scores.",
    ],
  },
];

export const termsSections: LegalSection[] = [
  {
    heading: "Acceptance of terms",
    paragraphs: [
      "By accessing this website you agree to these terms. If you do not agree, please do not use the service.",
    ],
  },
  {
    heading: "Use of the service",
    paragraphs: [
      "The platform is provided for personal study and exam preparation. You agree not to scrape, bulk-download, resell or systematically extract questions, and not to attempt to disrupt or gain unauthorised access to the service.",
    ],
    list: [
      "Do not use automated tools to harvest questions or answers",
      "Do not attempt to bypass authentication, rate limits or admin controls",
      "Do not upload malicious content or attempt to exploit the service",
    ],
  },
  {
    heading: "Accounts",
    paragraphs: [
      "You are responsible for keeping your account credentials confidential and for activity that occurs under your account. Notify us promptly if you suspect unauthorised use.",
    ],
  },
  {
    heading: "Content accuracy",
    paragraphs: [
      "Questions are provided for practice. While we work to keep content accurate, we do not warrant that every question, answer or explanation is free from error. Use the report button to flag anything that looks wrong.",
    ],
  },
  {
    heading: "Changes",
    paragraphs: [
      "We may update these terms from time to time. Continued use of the service after changes take effect constitutes acceptance of the revised terms.",
    ],
  },
];

export const disclaimerSections: LegalSection[] = [
  {
    heading: "No affiliation",
    paragraphs: [
      "This website is an independent practice resource. It is not affiliated with, endorsed by, or connected to any examination board, recruiting agency, university or government body. Exam names are used only to describe the subject matter of practice questions.",
    ],
  },
  {
    heading: "No guarantee of results",
    paragraphs: [
      "Practising questions can support your preparation, but we make no guarantee about examination outcomes. Selection criteria and syllabi change; always confirm requirements with the official source.",
    ],
  },
  {
    heading: "Accuracy of information",
    paragraphs: [
      "Content is provided as-is without warranty of any kind. To the fullest extent permitted by law, we disclaim liability for any loss arising from reliance on the material on this site.",
    ],
  },
];

export const cookieSections: LegalSection[] = [
  {
    heading: "Essential cookies",
    paragraphs: [
      "These cookies are required for the site to function and cannot be switched off through the site.",
    ],
    list: [
      "Session cookie — keeps you signed in after you log in",
      "Guest cookie — remembers an anonymous practice session so your quiz is not lost on refresh",
    ],
  },
  {
    heading: "No advertising or tracking cookies",
    paragraphs: [
      "We do not set third-party advertising or cross-site tracking cookies. If this changes, we will update this policy and, where required, ask for your consent first.",
    ],
  },
  {
    heading: "Managing cookies",
    paragraphs: [
      "You can clear or block cookies in your browser settings. Blocking the essential cookies will prevent sign-in and may interrupt an in-progress guest quiz.",
    ],
  },
];

export const faqItems: Array<{ question: string; answer: string }> = [
  {
    question: "Do I need an account to practise?",
    answer:
      "No. You can browse questions, search, answer MCQs and take quizzes as a guest. An account is only needed to keep your quiz history, bookmarks and likes across devices.",
  },
  {
    question: "How are questions chosen for an exam?",
    answer:
      "Every question is tagged with metadata such as subject, topic, exams, education level and difficulty. A single selection engine reads the exam's configuration and retrieves matching questions automatically, so new exams reuse the same architecture.",
  },
  {
    question: "What is the difference between static and random mode?",
    answer:
      "Static mode presents questions in a fixed, deterministic order — useful for exams that follow a set paper sequence. Random mode draws a fresh set from the relevant pool each time.",
  },
  {
    question: "How is my score calculated?",
    answer:
      "Scoring happens entirely on the server. Each answer is compared against the stored correct option, and any configured negative marking is applied. Your browser never supplies the score.",
  },
  {
    question: "I found a mistake in a question. What should I do?",
    answer:
      "Use the report button on the question and choose the reason. Reports go to our moderation queue and are reviewed by an administrator.",
  },
  {
    question: "Can I share a question with a friend?",
    answer:
      "Yes. Every question has its own permanent, shareable URL, and there are buttons for copying the link or sharing to WhatsApp, Facebook, X and LinkedIn.",
  },
];
