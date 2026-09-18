"use client";

import { useState } from "react";
import Link from "next/link";
import AuthForm from "@/components/AuthForm";
import Field from "@/components/Field";
import { ArrowIcon } from "@/components/Icons";
import { useToast } from "@/components/UiProviders";
import { validateEmail } from "@/lib/validation";

export default function ForgotPasswordForm() {
  const { pushToast } = useToast();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const submit = (event) => {
    event.preventDefault();
    const next = validateEmail(email);
    setError(next);
    if (next) {
      pushToast("Enter a valid email address", "muted");
      return;
    }
    setSubmitting(true);
    window.setTimeout(() => {
      setSent(true);
      setSubmitting(false);
      pushToast("Reset link sent (UI mock)", "success");
    }, 500);
  };

  return (
    <AuthForm
      title="Reset access"
      body={
        sent
          ? "If an account exists for that email, a reset link would be sent. This is a mock confirmation."
          : "Enter the email associated with your account."
      }
      footer={
        <>
          Remembered it? <Link href="/login">Back to login</Link> ·{" "}
          <Link href="/reset-password">Have a reset code?</Link>
        </>
      }
      onSubmit={submit}
    >
      <Field label="Email" name="email" error={error}>
        {({ describedBy, invalid }) => (
          <input
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            aria-invalid={invalid}
            aria-describedby={describedBy}
            onChange={(event) => {
              setEmail(event.target.value);
              if (error) setError("");
            }}
          />
        )}
      </Field>
      <button type="submit" className="btn btn-hero w-full" disabled={submitting || sent}>
        {sent ? "Link sent" : submitting ? "Sending…" : "Send reset link"}
        {!sent && !submitting ? <ArrowIcon /> : null}
      </button>
    </AuthForm>
  );
}
