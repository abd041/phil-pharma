"use client";

import { useState } from "react";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import PageHero from "@/components/PageHero";
import { cartSeed, getProductBySlug } from "@/lib/data";
import { ArrowIcon } from "@/components/Icons";
import { useToast } from "@/components/UiProviders";

const seedLines = cartSeed
  .map((entry) => {
    const product = getProductBySlug(entry.slug);
    if (!product) return null;
    const variant =
      product.variants?.find((item) => item.id === entry.variantId) || product.variants?.[0];
    if (!variant) return null;
    return {
      slug: product.slug,
      name: product.name,
      variantLabel: variant.label,
      price: variant.price,
      qty: entry.qty,
    };
  })
  .filter(Boolean);

const seedTotal = seedLines.reduce((sum, line) => sum + line.price * line.qty, 0);

export default function CheckoutPage() {
  const [submitted, setSubmitted] = useState(false);
  const { pushToast } = useToast();

  if (submitted) {
    return (
      <SiteShell>
        <PageHero
          kicker="Checkout"
          title="Order placed"
          body="This is a frontend mock confirmation. Payment and order APIs will connect in a later phase."
          crumbs={[{ href: "/cart", label: "Cart" }, { label: "Checkout" }]}
        />
        <section className="page-section">
          <div className="page-wrap auth-panel">
            <p className="label text-faint">Reference</p>
            <p className="display mt-3" style={{ fontSize: "2rem" }}>
              PP-UI-10428
            </p>
            <p className="copy mt-4">
              You can review sample order history in My Orders. No payment was processed.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/account/orders" className="btn btn-hero">
                View orders
              </Link>
              <Link href="/shop" className="btn btn-hero-ghost">
                Back to shop
              </Link>
            </div>
          </div>
        </section>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <PageHero
        kicker="Checkout"
        title="Checkout"
        body="Complete the UI form below. Fields are visual only — no payment gateway is connected yet."
        crumbs={[{ href: "/cart", label: "Cart" }, { label: "Checkout" }]}
      />

      <section className="page-section">
        <div className="page-wrap checkout-layout">
          <form
            className="checkout-form"
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitted(true);
              pushToast("Order placed (UI mock)", "success");
            }}
          >
            <fieldset>
              <legend className="label text-faint">Contact</legend>
              <div className="form-grid">
                <label>
                  Email
                  <input type="email" name="email" required defaultValue="researcher@lab.example" />
                </label>
                <label>
                  Phone
                  <input type="tel" name="phone" defaultValue="+44 7700 900123" />
                </label>
              </div>
            </fieldset>

            <fieldset>
              <legend className="label text-faint">Shipping</legend>
              <div className="form-grid">
                <label>
                  Full name
                  <input type="text" name="name" required defaultValue="Alex Researcher" />
                </label>
                <label>
                  Country
                  <input type="text" name="country" required defaultValue="United Kingdom" />
                </label>
                <label className="form-span-2">
                  Address
                  <input type="text" name="address" required defaultValue="14 Lab Lane" />
                </label>
                <label>
                  City
                  <input type="text" name="city" required defaultValue="Manchester" />
                </label>
                <label>
                  Postcode
                  <input type="text" name="postcode" required defaultValue="M1 2AB" />
                </label>
              </div>
            </fieldset>

            <fieldset>
              <legend className="label text-faint">Payment UI</legend>
              <div className="form-grid">
                <label className="form-span-2">
                  Cardholder name
                  <input type="text" name="cardname" required defaultValue="A Researcher" />
                </label>
                <label className="form-span-2">
                  Card number
                  <input type="text" name="card" required defaultValue="4242 4242 4242 4242" />
                </label>
                <label>
                  Expiry
                  <input type="text" name="expiry" required defaultValue="09 / 28" />
                </label>
                <label>
                  CVC
                  <input type="text" name="cvc" required defaultValue="123" />
                </label>
              </div>
              <p className="copy mt-4" style={{ fontSize: "13px" }}>
                Mock fields only. Do not enter real card details — payment integration comes later.
              </p>
            </fieldset>

            <button type="submit" className="btn btn-hero">
              Place order
              <ArrowIcon />
            </button>
          </form>

          <aside className="cart-summary">
            <p className="label text-faint">Order summary</p>
            <ul className="checkout-items">
              {seedLines.map((line) => (
                <li key={`${line.slug}-${line.variantLabel}`}>
                  <span>
                    {line.name} · {line.variantLabel} × {line.qty}
                  </span>
                  <span>£{(line.price * line.qty).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <dl>
              <div className="cart-summary-total">
                <dt>Total</dt>
                <dd>£{seedTotal.toFixed(2)}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>
    </SiteShell>
  );
}
