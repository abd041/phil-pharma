"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SiteShell from "@/components/SiteShell";
import PageHero from "@/components/PageHero";
import AuthForm from "@/components/AuthForm";
import { ArrowIcon } from "@/components/Icons";

export default function LoginPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");

  return (
    <SiteShell>
      <PageHero
        kicker="Account"
        title="Login"
        body="Sign in to view orders and account details. Authentication will be wired in a later phase."
        crumbs={[{ label: "Login" }]}
      />
      <section className="page-section">
        <div className="page-wrap auth-wrap">
          <AuthForm
            title="Welcome back"
            body="Use any email to preview the account UI."
            footer={
              <>
                No account? <Link href="/register">Register</Link> ·{" "}
                <Link href="/forgot-password">Forgot password</Link>
              </>
            }
            onSubmit={(event) => {
              event.preventDefault();
              setMessage("Signed in (UI mock). Redirecting…");
              window.setTimeout(() => router.push("/account"), 700);
            }}
          >
            <label>
              Email
              <input type="email" name="email" required defaultValue="researcher@lab.example" />
            </label>
            <label>
              Password
              <input type="password" name="password" required defaultValue="password" />
            </label>
            {message ? <p className="form-note">{message}</p> : null}
            <button type="submit" className="btn btn-hero w-full">
              Login
              <ArrowIcon />
            </button>
          </AuthForm>
        </div>
      </section>
    </SiteShell>
  );
}
