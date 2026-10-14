# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Stack

Next.js 16 (App Router, `src/app`) · React 19 · Tailwind CSS 4 · Prisma ORM 7 on Neon Postgres (via `@prisma/adapter-neon`) · Better Auth (email + password). Path alias `@/*` → `src/*`.

Next.js 16 differs from older versions — consult `node_modules/next/dist/docs/` before writing Next-specific code (see AGENTS.md). For Prisma 7 work, the project-local skills in `.agents/skills/` (e.g. `prisma-cli`, `prisma-client-api`, `prisma-upgrade-v7`) apply; stay on Prisma 7 even though the CLI advertises an 8.x update.

## Commands

```bash
npm run dev            # dev server at http://localhost:3000
npm run build          # production build
npm run lint           # ESLint (flat config, eslint.config.mjs)
npm run db:generate    # regenerate Prisma Client (also runs on postinstall)
npm run db:migrate     # prisma migrate dev — create/apply migrations
npm run db:studio      # Prisma Studio
npm run db:seed        # upsert sample categories + products (prisma/seed.ts)
npm run auth:generate  # write Better Auth models into prisma/schema.prisma
npm run auth:make-admin -- <email>  # give an existing user the admin role
```

No test framework is configured yet.

## Architecture

- **Database client** — `src/lib/prisma.ts` exports a singleton `prisma` (cached on `globalThis` outside production to survive HMR). It uses the Neon driver adapter with the **pooled** `DATABASE_URL`. Import `PrismaClient`/types from `@/generated/prisma/client`, not `@prisma/client`.
- **Generated client** — Prisma 7 `prisma-client` generator outputs to `src/generated/prisma` (gitignored). Rerun `npm run db:generate` after any schema change.
- **Prisma config** — `prisma7.config.ts` (non-default filename, but the CLI loads it). It loads `.env` via `dotenv` and points the CLI at the **direct** (non-pooled) `DIRECT_URL` for migrations, falling back to `DATABASE_URL`. The datasource block in `schema.prisma` intentionally has no `url`.
- **Auth** — `src/lib/auth.ts` is the server-side Better Auth instance (Prisma adapter, `nextCookies()` plugin must stay last in `plugins`). It is mounted as a catch-all route at `src/app/api/auth/[...all]/route.ts`. `src/lib/auth-client.ts` is the React client, using `NEXT_PUBLIC_APP_URL`.
- **Auth schema workflow** — Better Auth's tables (`user`, `session`, `account`, `verification`) are generated into `schema.prisma`. When changing auth config/plugins: `npm run auth:generate` → review the diff → `npm run db:migrate` → `npm run db:generate` (Prisma 7's `migrate dev` no longer generates the client automatically).

## Database conventions

- **Scope**: the catalog is only `Category 1─* Product`. Don't add carts, orders, payments, reviews, wishlists or variants unless asked.
- **Data access**: components and pages never import `prisma` directly. Catalog queries live in `src/lib/products.ts` (`server-only`), which maps rows to the UI types in `src/lib/catalog.ts`. Wrap queries called by both `generateMetadata` and the page in React `cache()`.
- **Money**: store integer cents (`priceCents`), never floats. Convert to display units only in the mapper.
- **Stock**: a `stock Int` column on `Product`, where 0 means sold out. It moves to a variant table only once variants exist.
- **Identifiers**: `slug` is the unique public key used in URLs and lookups. `id` is an internal cuid.
- **Enums**: values are UPPER_SNAKE in the DB (e.g. `ProductBadge.NEW_IN`). Map them to display labels in the mapper.
- **Editorial content stays in code**: hero, stories, navigation and curated picks (e.g. `GIFT_EDIT_SLUGS`) are not DB data.
- **Constraints**: CHECKs that Prisma can't express (`stock >= 0`, `priceCents >= 0`) are hand-added to migration SQL. Keep them, and add new ones the same way.
- **Seed**: `prisma/seed.ts` upserts by `slug` and must stay idempotent. Write optional fields as explicit `null`, because Prisma skips `undefined` on update.
- **Caching**: catalog pages use `export const revalidate = 60`, so `npm run build` needs a reachable `DATABASE_URL`.

## Auth conventions

- **Scope**: email + password only, with roles `customer` (default) and `admin`. Don't add social login, password reset, 2FA or email verification unless asked.
- **Role**: `user.role` is a Better Auth `additionalField` with `input: false`, so sign-up can't set it. A hand-added CHECK limits it to `customer`/`admin`. The only way to grant admin is `npm run auth:make-admin`.
- **Session checks**: use `getSession` / `requireUser(next)` / `requireAdmin()` from `src/lib/session.ts` (server-only). They read the session from the DB on every request, so sign-out and role changes apply immediately.
- **Where to check**: in each protected page and in every Server Action, never only in a layout or in `src/proxy.ts`. The proxy only checks that a cookie exists. Non-admins get `notFound()` from admin routes.
- **Mutations**: sign up, sign in and sign out are Server Actions calling `auth.api.*`, which relies on `nextCookies()`. Redirect targets go through `safeRedirect()`.
- **Keep the catalog static**: never read the session in the root layout or header. Doing so makes every page dynamic and breaks ISR.

## Environment

Copy `.env.example` to `.env`. Required: `DATABASE_URL` (Neon pooled, host contains `-pooler`), `DIRECT_URL` (Neon direct), `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `NEXT_PUBLIC_APP_URL`.
