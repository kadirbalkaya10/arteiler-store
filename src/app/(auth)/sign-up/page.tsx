import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth/auth-form";
import { getSession, safeRedirect } from "@/lib/session";

export const metadata: Metadata = { title: "Create an account" };

export default async function SignUpPage({ searchParams }: PageProps<"/sign-up">) {
  const next = safeRedirect((await searchParams).next);
  if (await getSession()) redirect(next);

  return (
    <section aria-labelledby="sign-up-title" className="container-form section">
      <div className="mb-8 flex flex-col gap-3 md:mb-10">
        <p className="type-eyebrow text-muted">Your account</p>
        <h1 id="sign-up-title" className="type-title-l">
          Create an account
        </h1>
      </div>

      <AuthForm mode="sign-up" next={next} />

      <p className="mt-8 type-small text-muted">
        Already have an account?{" "}
        <Link href={`/sign-in?next=${encodeURIComponent(next)}`} className="link">
          Sign in
        </Link>
      </p>
    </section>
  );
}
