import SiteShell from "@/components/SiteShell";
import PageHero from "@/components/PageHero";
import ForgotPasswordForm from "@/components/ForgotPasswordForm";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Forgot password",
  description: "Request a password reset for your Phil's Pharma account.",
  path: "/forgot-password",
  noIndex: true,
});

export default function ForgotPasswordPage() {
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
          <ForgotPasswordForm />
        </div>
      </section>
    </SiteShell>
  );
}
