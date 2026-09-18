"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import EmptyState from "@/components/EmptyState";
import { LAST_ORDER_KEY, mockOrders } from "@/lib/data";
import { ArrowIcon } from "@/components/Icons";

export default function OrdersList() {
  const [extra, setExtra] = useState([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(LAST_ORDER_KEY);
      if (!raw) return;
      const last = JSON.parse(raw);
      if (last?.id && !mockOrders.some((order) => order.id === last.id)) {
        setExtra([last]);
      }
    } catch {
      setExtra([]);
    }
  }, []);

  const orders = useMemo(() => [...extra, ...mockOrders], [extra]);

  if (!orders.length) {
    return (
      <EmptyState
        kicker="No orders"
        title="You have not placed an order yet"
        body="When the backend is connected, live order history will appear here. Complete checkout in this browser to preview a mock order."
        href="/shop"
        action="Start shopping"
      />
    );
  }

  return (
    <div className="orders-table">
      <div className="orders-head label text-faint">
        <span>Order</span>
        <span>Date</span>
        <span>Status</span>
        <span>Total</span>
        <span />
      </div>
      {orders.map((order) => (
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
  );
}
