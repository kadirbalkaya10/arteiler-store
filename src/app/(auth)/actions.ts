"use server";

import { APIError } from "better-auth/api";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { safeRedirect } from "@/lib/session";

export type AuthFormState = {
  error?: string;
  /** The field the error is about; unset means the whole form */
  field?: "name" | "email" | "password";
  /** Submitted values to refill the form; never the password */
  values?: { name?: string; email?: string };
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function field(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

export async function signUp(_state: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const name = field(formData, "name");
  const email = field(formData, "email").toLowerCase();
  const password = formData.get("password");
  const values = { name, email };

  if (!name) return { error: "Enter your name.", field: "name", values };
  if (!EMAIL.test(email)) return { error: "Enter a valid email address.", field: "email", values };
  if (typeof password !== "string" || password.length < 8) {
    return { error: "Use at least 8 characters for your password.", field: "password", values };
  }

  try {
    await auth.api.signUpEmail({ body: { name, email, password }, headers: await headers() });
  } catch (error) {
    if (error instanceof APIError) {
      const code = (error.body as { code?: string } | undefined)?.code ?? "";
      if (code.startsWith("USER_ALREADY_EXISTS")) {
        return {
          error: "An account with this email already exists. Sign in instead.",
          field: "email",
          values,
        };
      }
      if (code === "PASSWORD_TOO_LONG") {
        return { error: "That password is too long.", field: "password", values };
      }
      return { error: "We couldn't create your account. Check your details and try again.", values };
    }
    throw error;
  }

  redirect(safeRedirect(formData.get("next")));
}

export async function signIn(_state: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const email = field(formData, "email").toLowerCase();
  const password = formData.get("password");
  const values = { email };

  if (!email || typeof password !== "string" || !password) {
    return { error: "Enter your email and password.", values };
  }

  try {
    await auth.api.signInEmail({ body: { email, password }, headers: await headers() });
  } catch (error) {
    // One message for every failure, so it doesn't reveal which emails have accounts
    if (error instanceof APIError) return { error: "Email or password is incorrect.", values };
    throw error;
  }

  redirect(safeRedirect(formData.get("next")));
}

export async function signOut() {
  await auth.api.signOut({ headers: await headers() });
  redirect("/");
}
