import SiteShell from "@/components/SiteShell";
import LoginView from "@/components/LoginView";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Login",
  description: "Sign in to your Phil's Pharma account.",
  path: "/login",
  noIndex: true,
});

export default function LoginPage() {
  return (
    <SiteShell>
      <LoginView />
    </SiteShell>
  );
}
