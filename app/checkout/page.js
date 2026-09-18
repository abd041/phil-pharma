import SiteShell from "@/components/SiteShell";
import CheckoutPageClient from "@/components/CheckoutPageClient";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Checkout",
  description: "Complete your Phil's Pharma order. Payment integration ships with the backend phase.",
  path: "/checkout",
  noIndex: true,
});

export default function CheckoutPage() {
  return (
    <SiteShell>
      <CheckoutPageClient />
    </SiteShell>
  );
}
