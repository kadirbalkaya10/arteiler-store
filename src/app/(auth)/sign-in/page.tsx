import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth/auth-form";
import { getSession, safeRedirect } from "@/lib/session";

export const metadata: Metadata = { title: "Sign in" };

export default async function SignInPage({ searchParams }: PageProps<"/sign-in">) {
  const next = safeRedirect((await searchParams).next);
  if (await getSession()) redirect(next);

  return (
    <section aria-labelledby="sign-in-title" className="container-form section">
      <div className="mb-8 flex flex-col gap-3 md:mb-10">
        <p className="type-eyebrow text-muted">Your account</p>
        <h1 id="sign-in-title" className="type-title-l">
          Sign in
        </h1>
      </div>

      <AuthForm mode="sign-in" next={next} />

      <p className="mt-8 type-small text-muted">
        New to Ateiler?{" "}
        <Link href={`/sign-up?next=${encodeURIComponent(next)}`} className="link">
          Create an account
        </Link>
      </p>
    </section>
  );
}
