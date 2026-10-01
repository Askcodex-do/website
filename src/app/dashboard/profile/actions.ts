"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/lib/db";
import { getCurrentUser, hashPassword, verifyPassword } from "@/lib/auth";
import { audit } from "@/lib/audit";

const profileSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(120),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Enter your current password"),
    newPassword: z
      .string()
      .min(8, "At least 8 characters")
      .regex(/[a-zA-Z]/, "Include a letter")
      .regex(/[0-9]/, "Include a number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

/** Update the signed-in user's display name. */
export async function updateProfile(formData: FormData): Promise<void> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const parsed = profileSchema.safeParse({ name: formData.get("name") });
  if (!parsed.success) return;

  await db.user.update({
    where: { id: user.id },
    data: { name: parsed.data.name },
  });
  await audit({
    actorId: user.id,
    action: "user.profile.update",
    entityType: "user",
    entityId: user.id,
  });
  redirect("/dashboard/profile?updated=1");
}

/** Change the signed-in user's password after verifying the current one. */
export async function changePassword(formData: FormData): Promise<void> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const parsed = passwordSchema.safeParse({
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
    confirmPassword: formData.get("confirmPassword"),
  });
  if (!parsed.success) {
    redirect("/dashboard/profile?passwordError=1");
  }

  const record = await db.user.findUnique({ where: { id: user.id } });
  if (
    !record ||
    !(await verifyPassword(parsed.data.currentPassword, record.passwordHash))
  ) {
    redirect("/dashboard/profile?passwordError=1");
  }

  await db.$transaction([
    db.user.update({
      where: { id: user.id },
      data: { passwordHash: await hashPassword(parsed.data.newPassword) },
    }),
    // Sign out other devices after a password change.
    db.session.updateMany({
      where: { userId: user.id, revokedAt: null },
      data: { revokedAt: new Date() },
    }),
  ]);

  await audit({
    actorId: user.id,
    action: "user.password.change",
    entityType: "user",
    entityId: user.id,
  });
  redirect("/login?next=/dashboard");
}
