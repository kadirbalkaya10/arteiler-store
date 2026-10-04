"use client";

import { useState } from "react";

// Not wired to a provider yet: confirms locally so the flow can be reviewed.
export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <p role="status" className="type-body">
        Thank you. You&rsquo;ll hear from us with the next collection.
      </p>
    );
  }

  return (
    <form
      className="flex flex-col gap-6 md:flex-row md:items-end"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="flex-1">
        <label htmlFor="newsletter-email" className="label">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="name@example.com"
          className="input"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Subscribe
      </button>
    </form>
  );
}
