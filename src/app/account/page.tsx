import type { Metadata } from "next";
import Link from "next/link";
import { signOut } from "@/app/(auth)/actions";
import { requireUser } from "@/lib/session";

export const metadata: Metadata = { title: "Your account" };

const memberSince = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" });

export default async function AccountPage() {
  const { user } = await requireUser("/account");

  return (
    <section aria-labelledby="account-title" className="container-form section">
      <div className="mb-8 flex flex-col gap-3 md:mb-10">
        <p className="type-eyebrow text-muted">Your account</p>
        <h1 id="account-title" className="type-title-l">
          Welcome, {user.name}
        </h1>
      </div>

      <dl className="flex flex-col gap-4 border-t border-divider pt-8">
        <div className="flex flex-col gap-1">
          <dt className="label">Email address</dt>
          <dd className="type-body">{user.email}</dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="label">Member since</dt>
          <dd className="type-body">{memberSince.format(user.createdAt)}</dd>
        </div>
      </dl>

      <div className="mt-10 flex flex-col gap-6 border-t border-divider pt-8">
        {user.role === "admin" && (
          <Link href="/admin" className="link-cta w-fit">
            Go to admin
          </Link>
        )}
        <form action={signOut}>
          <button type="submit" className="btn btn-secondary">
            Sign out
          </button>
        </form>
      </div>
    </section>
  );
}
