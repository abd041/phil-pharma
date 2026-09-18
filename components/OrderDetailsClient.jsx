"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import EmptyState from "@/components/EmptyState";
import { LAST_ORDER_KEY, mockAddresses } from "@/lib/data";

export default function OrderDetailsClient({ id, initialOrder, shipTo }) {
  const [order, setOrder] = useState(initialOrder);

  useEffect(() => {
    if (initialOrder) return;
    try {
      const raw = window.localStorage.getItem(LAST_ORDER_KEY);
      if (!raw) return;
      const last = JSON.parse(raw);
      if (last?.id === id) setOrder(last);
    } catch {
      /* ignore */
    }
  }, [id, initialOrder]);

  if (!order) {
    return (
      <EmptyState
        kicker="Not found"
        title="This order is not available"
        body="Live order records will load from the backend later. Mock checkout orders are stored in this browser only."
        href="/account/orders"
        action="Back to orders"
      />
    );
  }

  const address = shipTo || mockAddresses[0];

  return (
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
          <p className="mt-3 font-medium">{order.contact?.name || address.name}</p>
          <p className="copy mt-2" style={{ fontSize: "13px" }}>
            {address.line1}
            {address.line2 ? `, ${address.line2}` : ""}
            <br />
            {address.city}, {address.postcode}
            <br />
            {address.country}
          </p>
        </div>

        <div className="account-card">
          <p className="label text-faint">Status</p>
          <p className="mt-3 text-lg">{order.status}</p>
          <p className="copy mt-3">
            Tracking and documentation requests will connect to live systems in the backend phase.
            This page is a UI preview.
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
  );
}
