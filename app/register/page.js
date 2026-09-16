"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SiteShell from "@/components/SiteShell";
import PageHero from "@/components/PageHero";
import AuthForm from "@/components/AuthForm";
import { ArrowIcon } from "@/components/Icons";

export default function RegisterPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");

  return (
    <SiteShell>
      <PageHero
        kicker="Account"
        title="Register"
        body="Create an account UI profile. No backend registration runs in this phase."
        crumbs={[{ label: "Register" }]}
      />
      <section className="page-section">
        <div className="page-wrap auth-wrap">
          <AuthForm
            title="Create account"
            body="Research customers only. All products remain research-use restricted."
            footer={
              <>
                Already registered? <Link href="/login">Login</Link>
              </>
            }
            onSubmit={(event) => {
              event.preventDefault();
              setMessage("Account created (UI mock).");
              window.setTimeout(() => router.push("/account"), 700);
            }}
          >
            <label>
              Full name
              <input type="text" name="name" required defaultValue="Alex Researcher" />
            </label>
            <label>
              Email
              <input type="email" name="email" required defaultValue="researcher@lab.example" />
            </label>
            <label>
              Password
              <input type="password" name="password" required defaultValue="password" />
            </label>
            <label>
              Confirm password
              <input type="password" name="confirm" required defaultValue="password" />
            </label>
            {message ? <p className="form-note">{message}</p> : null}
            <button type="submit" className="btn btn-hero w-full">
              Create account
              <ArrowIcon />
            </button>
          </AuthForm>
        </div>
      </section>
    </SiteShell>
  );
}
