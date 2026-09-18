import SiteShell from "@/components/SiteShell";
import PageHero from "@/components/PageHero";
import OrdersList from "@/components/OrdersList";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "My orders",
  description: "Review Phil's Pharma order history. Live order data will sync from the backend later.",
  path: "/account/orders",
  noIndex: true,
});

export default function OrdersPage() {
  return (
    <SiteShell>
      <PageHero
        kicker="Account"
        title="My orders"
        body="Sample order history for the account UI. Live order data will sync from the backend later."
        crumbs={[{ href: "/account", label: "Account" }, { label: "Orders" }]}
      />
      <section className="page-section">
        <div className="page-wrap">
          <OrdersList />
        </div>
      </section>
    </SiteShell>
  );
}
