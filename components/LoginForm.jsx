"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Field from "@/components/Field";
import { ArrowIcon } from "@/components/Icons";
import { useToast } from "@/components/UiProviders";
import { firstError, validateEmail, validatePassword } from "@/lib/validation";

export default function LoginForm() {
  const router = useRouter();
  const { pushToast } = useToast();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const setValue = (name, value) => {
    setForm((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: "" }));
  };

  const submit = (event) => {
    event.preventDefault();
    const next = {
      email: validateEmail(form.email),
      password: validatePassword(form.password),
    };
    setErrors(next);
    if (firstError(next)) {
      pushToast("Please fix the highlighted fields", "muted");
      event.currentTarget.querySelector("[aria-invalid='true']")?.focus();
      return;
    }
    setSubmitting(true);
    pushToast("Signed in (UI preview)", "success");
    window.setTimeout(() => router.push("/account"), 700);
  };

  return (
    <form className="cart-panel login-card" onSubmit={submit} noValidate>
      <p className="label text-faint">Sign in</p>
      <p className="cart-summary-kicker">Your account</p>
      <div className="login-fields">
        <Field label="Email" name="email" error={errors.email}>
          {({ describedBy, invalid }) => (
            <input
              type="email"
              name="email"
              autoComplete="email"
              value={form.email}
              aria-invalid={invalid}
              aria-describedby={describedBy}
              onChange={(event) => setValue("email", event.target.value)}
            />
          )}
        </Field>
        <Field
          label="Password"
          name="password"
          error={errors.password}
          hint={
            <Link href="/forgot-password" className="login-forgot">
              Forgot?
            </Link>
          }
        >
          {({ describedBy, invalid }) => (
            <span className="login-password">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                value={form.password}
                aria-invalid={invalid}
                aria-describedby={describedBy}
                onChange={(event) => setValue("password", event.target.value)}
              />
              <button
                type="button"
                className="login-show"
                onClick={() => setShowPassword((value) => !value)}
                aria-pressed={showPassword}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </span>
          )}
        </Field>
      </div>
      <button type="submit" className="btn btn-hero login-submit" disabled={submitting}>
        {submitting ? "Signing in…" : "Login"}
        {!submitting ? <ArrowIcon /> : null}
      </button>
      <p className="login-switch">
        No account? <Link href="/register">Create one</Link>
      </p>
      <p className="checkout-pay-note">UI preview only. No live authentication runs on this form.</p>
    </form>
  );
}
