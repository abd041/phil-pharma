import SiteShell from "@/components/SiteShell";
import PageHero from "@/components/PageHero";
import ResetPasswordForm from "@/components/ResetPasswordForm";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Reset password",
  description: "Set a new password for your Phil's Pharma account.",
  path: "/reset-password",
  noIndex: true,
});

export default function ResetPasswordPage() {
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
          <ResetPasswordForm />
        </div>
      </section>
    </SiteShell>
  );
}
