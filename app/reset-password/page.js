"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SiteShell from "@/components/SiteShell";
import PageHero from "@/components/PageHero";
import AuthForm from "@/components/AuthForm";
import { ArrowIcon } from "@/components/Icons";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");

  return (
    <SiteShell>
      <PageHero
        kicker="Account"
        title="Reset password"
        body="Set a new password through this UI mock. Tokens and email delivery come later."
        crumbs={[{ href: "/login", label: "Login" }, { label: "Reset password" }]}
      />
      <section className="page-section">
        <div className="page-wrap auth-wrap">
          <AuthForm
            title="New password"
            body="Choose a strong password for your research account."
            footer={
              <>
                <Link href="/login">Return to login</Link>
              </>
            }
            onSubmit={(event) => {
              event.preventDefault();
              setMessage("Password updated (UI mock).");
              window.setTimeout(() => router.push("/login"), 800);
            }}
          >
            <label>
              Reset code
              <input type="text" name="code" required defaultValue="PP-RESET-4821" />
            </label>
            <label>
              New password
              <input type="password" name="password" required defaultValue="password" />
            </label>
            <label>
              Confirm password
              <input type="password" name="confirm" required defaultValue="password" />
            </label>
            {message ? <p className="form-note">{message}</p> : null}
            <button type="submit" className="btn btn-hero w-full">
              Update password
              <ArrowIcon />
            </button>
          </AuthForm>
        </div>
      </section>
    </SiteShell>
  );
}
