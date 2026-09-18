import SiteShell from "@/components/SiteShell";
import CartPageClient from "@/components/CartPageClient";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Cart",
  description: "Review your Phil's Pharma cart before checkout.",
  path: "/cart",
  noIndex: true,
});

export default function CartPage() {
  return (
    <SiteShell>
      <CartPageClient />
    </SiteShell>
  );
}
