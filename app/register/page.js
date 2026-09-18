import SiteShell from "@/components/SiteShell";
import RegisterView from "@/components/RegisterView";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Register",
  description: "Create a Phil's Pharma research account.",
  path: "/register",
  noIndex: true,
});

export default function RegisterPage() {
  return (
    <SiteShell>
      <RegisterView />
    </SiteShell>
  );
}
