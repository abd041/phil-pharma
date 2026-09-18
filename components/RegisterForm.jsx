"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Field from "@/components/Field";
import { ArrowIcon } from "@/components/Icons";
import { useToast } from "@/components/UiProviders";
import {
  firstError,
  required,
  validateConfirmPassword,
  validateEmail,
  validatePassword,
} from "@/lib/validation";

function PasswordField({
  label,
  name,
  value,
  error,
  hint,
  autoComplete,
  showPassword,
  onToggle,
  onChange,
}) {
  return (
    <Field label={label} name={name} error={error} hint={hint} className="form-span-2">
      {({ describedBy, invalid }) => (
        <span className="login-password">
          <input
            type={showPassword ? "text" : "password"}
            name={name}
            autoComplete={autoComplete}
            value={value}
            aria-invalid={invalid}
            aria-describedby={describedBy}
            onChange={(event) => onChange(name, event.target.value)}
          />
          <button
            type="button"
            className="login-show"
            onClick={onToggle}
            aria-pressed={showPassword}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </span>
      )}
    </Field>
  );
}

export default function RegisterForm() {
  const router = useRouter();
  const { pushToast } = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    research: false,
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const setValue = (name, value) => {
    setForm((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: "" }));
  };

  const submit = (event) => {
    event.preventDefault();
    const next = {
      name: required(form.name, "Full name"),
      email: validateEmail(form.email),
      password: validatePassword(form.password),
      confirm: validateConfirmPassword(form.password, form.confirm),
      research: form.research ? "" : "Confirm research use to continue.",
    };
    setErrors(next);
    if (firstError(next)) {
      pushToast("Please fix the highlighted fields", "muted");
      event.currentTarget.querySelector("[aria-invalid='true']")?.focus();
      return;
    }
    setSubmitting(true);
    pushToast("Account created (UI preview)", "success");
    window.setTimeout(() => router.push("/account"), 700);
  };

  return (
    <form className="cart-panel login-card" onSubmit={submit} noValidate>
      <p className="label text-faint">Register</p>
      <p className="cart-summary-kicker">Create account</p>
      <div className="login-fields register-fields">
        <Field label="Full name" name="name" error={errors.name}>
          {({ describedBy, invalid }) => (
            <input
              type="text"
              name="name"
              autoComplete="name"
              value={form.name}
              aria-invalid={invalid}
              aria-describedby={describedBy}
              onChange={(event) => setValue("name", event.target.value)}
            />
          )}
        </Field>
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
        <PasswordField
          label="Password"
          name="password"
          value={form.password}
          error={errors.password}
          hint="At least 8 characters"
          autoComplete="new-password"
          showPassword={showPassword}
          onToggle={() => setShowPassword((value) => !value)}
          onChange={setValue}
        />
        <PasswordField
          label="Confirm password"
          name="confirm"
          value={form.confirm}
          error={errors.confirm}
          autoComplete="new-password"
          showPassword={showConfirm}
          onToggle={() => setShowConfirm((value) => !value)}
          onChange={setValue}
        />
        <label className={`login-check form-span-2 ${errors.research ? "is-invalid" : ""}`}>
          <input
            type="checkbox"
            name="research"
            checked={form.research}
            aria-invalid={Boolean(errors.research)}
            aria-describedby={errors.research ? "research-error" : undefined}
            onChange={(event) => setValue("research", event.target.checked)}
          />
          <span>
            I confirm this account is for laboratory / research purchasing only. Products are not
            for human consumption.
          </span>
        </label>
        {errors.research ? (
          <span id="research-error" className="field-error form-span-2" role="alert">
            {errors.research}
          </span>
        ) : null}
      </div>
      <button type="submit" className="btn btn-hero login-submit" disabled={submitting}>
        {submitting ? "Creating account…" : "Create account"}
        {!submitting ? <ArrowIcon /> : null}
      </button>
      <p className="login-switch">
        Already registered? <Link href="/login">Login</Link>
      </p>
      <p className="checkout-pay-note">UI preview only. No live registration runs on this form.</p>
    </form>
  );
}
