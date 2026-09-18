import SiteShell from "@/components/SiteShell";
import PageHero from "@/components/PageHero";
import OrderDetailsClient from "@/components/OrderDetailsClient";
import { mockAddresses, mockOrders } from "@/lib/data";
import { pageMetadata } from "@/lib/site";

export const dynamicParams = true;

export function generateStaticParams() {
  return mockOrders.map((order) => ({ id: order.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  return pageMetadata({
    title: `Order ${id}`,
    description: `Order ${id} details for your Phil's Pharma account.`,
    path: `/account/orders/${id}`,
    noIndex: true,
  });
}

export default async function OrderDetailsPage({ params }) {
  const { id } = await params;
  const order = mockOrders.find((item) => item.id === id) || null;
  const shipTo = mockAddresses.find((address) => address.primary) || mockAddresses[0];

  return (
    <SiteShell>
      <PageHero
        kicker="Account"
        title={order?.id || "Order"}
        body={order ? `${order.date} · ${order.status}` : "Order details"}
        crumbs={[
          { href: "/account", label: "Account" },
          { href: "/account/orders", label: "Orders" },
          { label: id },
        ]}
      />
      <section className="page-section">
        <OrderDetailsClient id={id} initialOrder={order} shipTo={shipTo} />
      </section>
    </SiteShell>
  );
}
