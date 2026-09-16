"use client";

import { useState } from "react";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import PageHero from "@/components/PageHero";
import AuthForm from "@/components/AuthForm";
import { ArrowIcon } from "@/components/Icons";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  return (
    <SiteShell>
      <PageHero
        kicker="Account"
        title="Forgot password"
        body="Request a reset link. This screen is UI-only until auth is implemented."
        crumbs={[{ href: "/login", label: "Login" }, { label: "Forgot password" }]}
      />
      <section className="page-section">
        <div className="page-wrap auth-wrap">
          <AuthForm
            title="Reset access"
            body={
              sent
                ? "If an account exists for that email, a reset link would be sent. (Mock confirmation.)"
                : "Enter the email associated with your account."
            }
            footer={
              <>
                Remembered it? <Link href="/login">Back to login</Link> ·{" "}
                <Link href="/reset-password">Have a reset code?</Link>
              </>
            }
            onSubmit={(event) => {
              event.preventDefault();
              setSent(true);
            }}
          >
            <label>
              Email
              <input type="email" name="email" required defaultValue="researcher@lab.example" />
            </label>
            <button type="submit" className="btn btn-hero w-full">
              {sent ? "Link sent" : "Send reset link"}
              <ArrowIcon />
            </button>
          </AuthForm>
        </div>
      </section>
    </SiteShell>
  );
}
