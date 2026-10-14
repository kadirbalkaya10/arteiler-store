"use client";

import { useActionState } from "react";
import { type AuthFormState, signIn, signUp } from "@/app/(auth)/actions";

type AuthFormProps = {
  mode: "sign-in" | "sign-up";
  /** Where to go after success; validated again on the server */
  next?: string;
};

export function AuthForm({ mode, next }: AuthFormProps) {
  const isSignUp = mode === "sign-up";
  const [state, formAction, pending] = useActionState<AuthFormState, FormData>(
    isSignUp ? signUp : signIn,
    {},
  );
  /** aria props for a field: marked invalid when the error is about it or the whole form */
  const errorProps = (field: NonNullable<AuthFormState["field"]>, hint?: string) => {
    const invalid = !!state.error && (!state.field || state.field === field);
    const describedBy = [invalid && "auth-error", hint].filter(Boolean).join(" ");
    return { "aria-invalid": invalid || undefined, "aria-describedby": describedBy || undefined };
  };

  return (
    <form action={formAction} className="flex flex-col gap-6" noValidate>
      {next && <input type="hidden" name="next" value={next} />}

      {isSignUp && (
        <div>
          <label htmlFor="name" className="label">
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            defaultValue={state.values?.name}
            {...errorProps("name")}
            className="input"
          />
        </div>
      )}

      <div>
        <label htmlFor="email" className="label">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          defaultValue={state.values?.email}
          {...errorProps("email")}
          className="input"
        />
      </div>

      <div>
        <label htmlFor="password" className="label">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete={isSignUp ? "new-password" : "current-password"}
          required
          minLength={isSignUp ? 8 : undefined}
          {...errorProps("password", isSignUp ? "password-hint" : undefined)}
          className="input"
        />
        {isSignUp && (
          <p id="password-hint" className="field-hint">
            At least 8 characters.
          </p>
        )}
      </div>

      {state.error && (
        <p id="auth-error" role="alert" className="field-error mt-0">
          {state.error}
        </p>
      )}

      <button type="submit" className="btn btn-primary" disabled={pending}>
        {pending ? "One moment…" : isSignUp ? "Create account" : "Sign in"}
      </button>
    </form>
  );
}
