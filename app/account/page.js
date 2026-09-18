import SiteShell from "@/components/SiteShell";
import AccountPageClient from "@/components/AccountPageClient";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "My account",
  description: "Manage your Phil's Pharma profile, addresses, wishlist, and orders.",
  path: "/account",
  noIndex: true,
});

export default function AccountPage() {
  return (
    <SiteShell>
      <AccountPageClient />
    </SiteShell>
  );
}
