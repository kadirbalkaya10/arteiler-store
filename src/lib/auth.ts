import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { prisma } from "@/lib/prisma";

const DAY = 60 * 60 * 24;

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: { enabled: true, minPasswordLength: 8, autoSignIn: true },
  // Persistent, rolling sessions: 30 days, extended at most once a day
  session: { expiresIn: 30 * DAY, updateAge: DAY },
  user: {
    additionalFields: {
      // "customer" | "admin". input: false, so sign-up can never set it
      role: { type: "string", required: true, defaultValue: "customer", input: false },
    },
  },
  plugins: [nextCookies()], // must be last
});

export type Session = typeof auth.$Infer.Session;
