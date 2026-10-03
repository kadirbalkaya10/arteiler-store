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
npm run auth:generate  # write Better Auth models into prisma/schema.prisma
```

No test framework is configured yet.

## Architecture

- **Database client** — `src/lib/prisma.ts` exports a singleton `prisma` (cached on `globalThis` outside production to survive HMR). It uses the Neon driver adapter with the **pooled** `DATABASE_URL`. Import `PrismaClient`/types from `@/generated/prisma/client`, not `@prisma/client`.
- **Generated client** — Prisma 7 `prisma-client` generator outputs to `src/generated/prisma` (gitignored). Rerun `npm run db:generate` after any schema change.
- **Prisma config** — `prisma7.config.ts` (non-default filename, but the CLI loads it). It loads `.env` via `dotenv` and points the CLI at the **direct** (non-pooled) `DIRECT_URL` for migrations, falling back to `DATABASE_URL`. The datasource block in `schema.prisma` intentionally has no `url`.
- **Auth** — `src/lib/auth.ts` is the server-side Better Auth instance (Prisma adapter, `nextCookies()` plugin must stay last in `plugins`). It is mounted as a catch-all route at `src/app/api/auth/[...all]/route.ts`. `src/lib/auth-client.ts` is the React client, using `NEXT_PUBLIC_APP_URL`.
- **Auth schema workflow** — Better Auth's tables (user, session, account, verification) are not in `schema.prisma` yet. When changing auth config/plugins: `npm run auth:generate` → `npm run db:migrate` → `npm run db:generate` (Prisma 7's `migrate dev` no longer generates the client automatically).

## Environment

Copy `.env.example` to `.env`. Required: `DATABASE_URL` (Neon pooled, host contains `-pooler`), `DIRECT_URL` (Neon direct), `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `NEXT_PUBLIC_APP_URL`.
