import "server-only";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { cache } from "react";
import { auth } from "@/lib/auth";

/*
 * Server-side session checks. Pages, layouts and Server Actions use these
 * instead of calling `auth.api` directly. The session is always read from the
 * database, so sign-out and role changes apply on the next request.
 */

/** The current session or null. Memoized per request. */
export const getSession = cache(async () => auth.api.getSession({ headers: await headers() }));

/** The current session; signed-out visitors are sent to sign in and back to `next`. */
export async function requireUser(next: string) {
  const session = await getSession();
  if (!session) redirect(`/sign-in?next=${encodeURIComponent(next)}`);
  return session;
}

/** The current admin session; anyone else gets a 404 so the route stays hidden. */
export async function requireAdmin(next = "/admin") {
  const session = await requireUser(next);
  if (session.user.role !== "admin") notFound();
  return session;
}

/** A same-site path to redirect to after auth; anything else falls back to /account. */
export function safeRedirect(next: unknown) {
  if (typeof next !== "string" || !next.startsWith("/") || /^\/[/\\]/.test(next)) {
    return "/account";
  }
  return next;
}
