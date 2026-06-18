"use server";

import { createSession, destroySession, getSession } from "@/lib/auth";
import { loginSchema } from "@/validations/auth";
import type { SessionUser } from "@/types";

export async function adminLoginAction(formData: FormData) {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const { email, password } = parsed.data;

  if (
    email === (process.env.ADMIN_EMAIL || "admin@luxestore.com") &&
    password === (process.env.ADMIN_PASSWORD || "admin123")
  ) {
    const admin: SessionUser = { id: "admin", name: "Admin", email, role: "admin" };
    await createSession(admin);
    return { success: true, user: admin };
  }

  return { error: "Invalid admin credentials" };
}

export async function logoutAction() {
  await destroySession();
  return { success: true };
}

export async function getCurrentUser() {
  return getSession();
}
