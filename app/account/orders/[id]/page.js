import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import PageHero from "@/components/PageHero";
import { mockAddresses, mockOrders } from "@/lib/data";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return mockOrders.map((order) => ({ id: order.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  return { title: `Order ${id} — Phil's Pharma` };
}

export default async function OrderDetailsPage({ params }) {
  const { id } = await params;
  const order = mockOrders.find((item) => item.id === id);
  if (!order) notFound();

  const shipTo = mockAddresses.find((address) => address.primary) || mockAddresses[0];

  return (
    <SiteShell>
      <PageHero
        kicker="Account"
        title={order.id}
        body={`${order.date} · ${order.status}`}
        crumbs={[
          { href: "/account", label: "Account" },
          { href: "/account/orders", label: "Orders" },
          { label: order.id },
        ]}
      />

      <section className="page-section">
        <div className="page-wrap order-detail-layout">
          <div className="account-card">
            <div className="catalogue-toolbar" style={{ marginTop: 0 }}>
              <p className="label text-faint">Items</p>
              <span className="order-status-pill">{order.status}</span>
            </div>
            <ul className="checkout-items mt-4">
              {order.items.map((item) => (
                <li key={item.name}>
                  <span>
                    {item.name} × {item.qty}
                  </span>
                  <span>{item.price}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-6">
              <div>
                <dt>Placed</dt>
                <dd>{order.date}</dd>
              </div>
              <div className="cart-summary-total">
                <dt>Total</dt>
                <dd>{order.total}</dd>
              </div>
            </dl>
          </div>

          <div className="account-main">
            <div className="account-card">
              <p className="label text-faint">Shipping</p>
              <p className="mt-3 font-medium">{shipTo.name}</p>
              <p className="copy mt-2" style={{ fontSize: "13px" }}>
                {shipTo.line1}
                {shipTo.line2 ? `, ${shipTo.line2}` : ""}
                <br />
                {shipTo.city}, {shipTo.postcode}
                <br />
                {shipTo.country}
              </p>
            </div>

            <div className="account-card">
              <p className="label text-faint">Status</p>
              <p className="mt-3 text-lg">{order.status}</p>
              <p className="copy mt-3">
                Tracking and documentation requests will connect to live systems in the backend phase.
                This page is a static UI preview.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/account/orders" className="btn btn-hero-ghost">
                  All orders
                </Link>
                <Link href="/contact" className="btn btn-hero">
                  Contact support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
