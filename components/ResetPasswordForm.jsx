"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthForm from "@/components/AuthForm";
import Field from "@/components/Field";
import { ArrowIcon } from "@/components/Icons";
import { useToast } from "@/components/UiProviders";
import {
  firstError,
  required,
  validateConfirmPassword,
  validatePassword,
} from "@/lib/validation";

export default function ResetPasswordForm() {
  const router = useRouter();
  const { pushToast } = useToast();
  const [form, setForm] = useState({ code: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const setValue = (name, value) => {
    setForm((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: "" }));
  };

  const submit = (event) => {
    event.preventDefault();
    const next = {
      code: required(form.code, "Reset code"),
      password: validatePassword(form.password),
      confirm: validateConfirmPassword(form.password, form.confirm),
    };
    setErrors(next);
    if (firstError(next)) {
      pushToast("Please fix the highlighted fields", "muted");
      return;
    }
    setSubmitting(true);
    pushToast("Password updated (UI mock)", "success");
    window.setTimeout(() => router.push("/login"), 800);
  };

  return (
    <AuthForm
      title="New password"
      body="Choose a strong password for your research account. Tokens and email delivery come later."
      footer={<Link href="/login">Return to login</Link>}
      onSubmit={submit}
    >
      <Field label="Reset code" name="code" error={errors.code}>
        {({ describedBy, invalid }) => (
          <input
            type="text"
            name="code"
            value={form.code}
            aria-invalid={invalid}
            aria-describedby={describedBy}
            onChange={(event) => setValue("code", event.target.value)}
          />
        )}
      </Field>
      <Field label="New password" name="password" error={errors.password} hint="At least 8 characters">
        {({ describedBy, invalid }) => (
          <input
            type="password"
            name="password"
            autoComplete="new-password"
            value={form.password}
            aria-invalid={invalid}
            aria-describedby={describedBy}
            onChange={(event) => setValue("password", event.target.value)}
          />
        )}
      </Field>
      <Field label="Confirm password" name="confirm" error={errors.confirm}>
        {({ describedBy, invalid }) => (
          <input
            type="password"
            name="confirm"
            autoComplete="new-password"
            value={form.confirm}
            aria-invalid={invalid}
            aria-describedby={describedBy}
            onChange={(event) => setValue("confirm", event.target.value)}
          />
        )}
      </Field>
      <button type="submit" className="btn btn-hero w-full" disabled={submitting}>
        {submitting ? "Updating…" : "Update password"}
        {!submitting ? <ArrowIcon /> : null}
      </button>
    </AuthForm>
  );
}
