import { z } from "zod";

/** Validation schemas shared by API routes and forms. */

export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(3, "Email is required")
  .max(254)
  .email("Enter a valid email address");

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(200, "Password is too long")
  .regex(/[a-zA-Z]/, "Password must contain a letter")
  .regex(/[0-9]/, "Password must contain a number");

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(120),
  email: emailSchema,
  password: passwordSchema,
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required").max(200),
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z.object({
  token: z.string().min(10),
  password: passwordSchema,
});

export const answerSchema = z.object({
  optionId: z.string().min(1).nullable(),
  timeSpentSeconds: z.number().int().min(0).max(60 * 60 * 6).optional(),
});

export const createQuizSchema = z.object({
  exam: z.string().max(120).optional(),
  subject: z.string().max(120).optional(),
  topic: z.string().max(120).optional(),
  educationLevel: z.string().max(120).optional(),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]).optional(),
  count: z.number().int().min(1).max(100).optional(),
  mode: z.enum(["static", "random"]).optional(),
  timeLimitSeconds: z.number().int().min(0).max(60 * 60 * 6).nullable().optional(),
});

export const reportSchema = z.object({
  reason: z.enum([
    "WRONG_ANSWER",
    "TYPO",
    "OUTDATED",
    "INAPPROPRIATE",
    "DUPLICATE",
    "OTHER",
  ]),
  message: z.string().trim().max(1000).optional(),
});

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(120),
  email: emailSchema,
  subject: z.string().trim().min(3, "Subject is required").max(160),
  message: z.string().trim().min(10, "Please add a little more detail").max(4000),
  // Honeypot: bots fill every field, humans never see this one.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CreateQuizInput = z.infer<typeof createQuizSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
