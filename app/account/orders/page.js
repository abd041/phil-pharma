import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import PageHero from "@/components/PageHero";
import { mockOrders } from "@/lib/data";
import { ArrowIcon } from "@/components/Icons";

export const metadata = {
  title: "My Orders — Phil's Pharma",
};

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
          <div className="orders-table">
            <div className="orders-head label text-faint">
              <span>Order</span>
              <span>Date</span>
              <span>Status</span>
              <span>Total</span>
              <span />
            </div>
            {mockOrders.map((order) => (
              <div key={order.id} className="orders-row">
                <span>{order.id}</span>
                <span>{order.date}</span>
                <span className="order-status">{order.status}</span>
                <span>{order.total}</span>
                <Link href={`/account/orders/${order.id}`} className="text-link">
                  Details
                  <ArrowIcon />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
