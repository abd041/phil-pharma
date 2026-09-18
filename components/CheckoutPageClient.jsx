"use client";

import { useLayoutEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import EmptyState from "@/components/EmptyState";
import Field from "@/components/Field";
import { ArrowIcon, CheckIcon, LockIcon, TruckIcon } from "@/components/Icons";
import { scrollWindowToTop } from "@/components/ScrollToTop";
import { useCart, useToast } from "@/components/UiProviders";
import { LAST_ORDER_KEY, SHIPPING_LABEL, cartTotals, hydrateCartLines } from "@/lib/data";
import { firstError, required, validateEmail, validatePostcode } from "@/lib/validation";

const emptyForm = {
  email: "",
  phone: "",
  name: "",
  country: "United Kingdom",
  address: "",
  city: "",
  postcode: "",
  cardname: "",
  card: "",
  expiry: "",
  cvc: "",
};

function money(value) {
  return `£${Number(value).toFixed(2)}`;
}

function CheckoutSteps({ current }) {
  const steps = [
    { id: "cart", label: "Cart", href: "/cart" },
    { id: "details", label: "Details" },
    { id: "confirmed", label: "Confirmed" },
  ];

  return (
    <ol className="checkout-steps" aria-label="Checkout progress">
      {steps.map((step, index) => {
        const done = steps.findIndex((item) => item.id === current) > index;
        const active = step.id === current;
        return (
          <li key={step.id} className={active ? "is-current" : done ? "is-done" : ""}>
            <span className="checkout-step-index">{String(index + 1).padStart(2, "0")}</span>
            {step.href && !active ? <Link href={step.href}>{step.label}</Link> : <span>{step.label}</span>}
          </li>
        );
      })}
    </ol>
  );
}

export default function CheckoutPageClient() {
  const { lines, ready, clear } = useCart();
  const items = useMemo(() => hydrateCartLines(lines), [lines]);
  const { subtotal, total } = cartTotals(items);
  const { pushToast } = useToast();
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [order, setOrder] = useState(null);
  const itemCount = items.reduce((sum, line) => sum + line.qty, 0);
  const itemWord = itemCount === 1 ? "item" : "items";

  useLayoutEffect(() => {
    scrollWindowToTop();
  }, [order, ready]);

  const setValue = (name, value) => {
    setForm((current) => ({ ...current, [name]: value }));
    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: "" }));
    }
  };

  const validate = () => {
    const next = {
      email: validateEmail(form.email),
      name: required(form.name, "Full name"),
      country: required(form.country, "Country"),
      address: required(form.address, "Address"),
      city: required(form.city, "City"),
      postcode: validatePostcode(form.postcode),
      cardname: required(form.cardname, "Cardholder name"),
      card: required(form.card, "Card number"),
      expiry: required(form.expiry, "Expiry"),
      cvc: required(form.cvc, "CVC"),
    };
    setErrors(next);
    return !firstError(next);
  };

  const submit = (event) => {
    event.preventDefault();
    if (!items.length) return;
    if (!validate()) {
      pushToast("Please fix the highlighted fields", "muted");
      const firstInvalid = event.currentTarget.querySelector("[aria-invalid='true']");
      firstInvalid?.focus({ preventScroll: false });
      return;
    }
    setSubmitting(true);
    const placed = {
      id: `PP-UI-${Date.now().toString().slice(-5)}`,
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      status: "Processing",
      total: money(total),
      items: items.map((line) => ({
        name: `${line.name} · ${line.variantLabel}`,
        qty: line.qty,
        price: money(line.price * line.qty),
      })),
      contact: { email: form.email, name: form.name },
    };
    window.setTimeout(() => {
      try {
        window.localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(placed));
      } catch {
        /* ignore quota */
      }
      clear(true);
      setOrder(placed);
      setSubmitting(false);
      pushToast("Order placed (UI preview)", "success");
    }, 650);
  };

  if (order) {
    return (
      <section className="page-section checkout-page">
        <div className="page-wrap">
          <header className="cart-head">
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/cart">Cart</Link>
              <span aria-hidden="true">/</span>
              <span>Checkout</span>
            </nav>
            <CheckoutSteps current="confirmed" />
            <p className="label text-faint">Confirmed</p>
            <h1 className="display cart-title">Order placed</h1>
          </header>

          <div className="checkout-confirm">
            <div className="cart-panel checkout-confirm-card">
              <span className="checkout-confirm-icon" aria-hidden="true">
                <CheckIcon />
              </span>
              <p className="label text-faint">Reference</p>
              <p className="checkout-confirm-id">{order.id}</p>
              <p className="copy checkout-confirm-copy">
                {order.date} · {order.status} · {order.total}. No payment was taken — this is a
                checkout preview for this browser.
              </p>
              <div className="checkout-confirm-actions">
                <Link href={`/account/orders/${order.id}`} className="btn btn-hero">
                  View order
                  <ArrowIcon />
                </Link>
                <Link href="/shop" className="btn btn-hero-ghost">
                  Back to shop
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="page-section checkout-page">
      <div className="page-wrap">
        <header className="cart-head">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/cart">Cart</Link>
            <span aria-hidden="true">/</span>
            <span>Checkout</span>
          </nav>
          <CheckoutSteps current="details" />
          <p className="label text-faint">Checkout</p>
          <div className="cart-head-row">
            <h1 className="display cart-title">Your details</h1>
            {ready && items.length ? (
              <p className="cart-head-meta">
                {itemCount} {itemWord} · {SHIPPING_LABEL}
              </p>
            ) : null}
          </div>
        </header>

        <div className="checkout-layout">
          {!ready ? (
            <div className="cart-panel" aria-busy="true" aria-live="polite">
              <p className="sr-only">Loading checkout</p>
              <div className="cart-skeleton-line" />
              <div className="cart-skeleton-line" />
            </div>
          ) : items.length === 0 ? (
            <div className="cart-panel cart-empty">
              <EmptyState
                kicker="Cart empty"
                title="Nothing to check out"
                body="Add products to your cart before completing this form."
                href="/cart"
                action="Return to cart"
              />
            </div>
          ) : (
            <form id="checkout-form" className="checkout-form" onSubmit={submit} noValidate>
              <fieldset className="cart-panel checkout-card">
                <legend className="label text-faint">Contact</legend>
                <div className="form-grid">
                  <Field label="Email" name="email" error={errors.email}>
                    {({ describedBy, invalid }) => (
                      <input
                        type="email"
                        name="email"
                        autoComplete="email"
                        value={form.email}
                        aria-invalid={invalid}
                        aria-describedby={describedBy}
                        onChange={(event) => setValue("email", event.target.value)}
                      />
                    )}
                  </Field>
                  <Field label="Phone" name="phone" hint="Optional">
                    <input
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={(event) => setValue("phone", event.target.value)}
                    />
                  </Field>
                </div>
              </fieldset>

              <fieldset className="cart-panel checkout-card">
                <legend className="label text-faint">Shipping</legend>
                <div className="form-grid">
                  <Field label="Full name" name="name" error={errors.name}>
                    {({ describedBy, invalid }) => (
                      <input
                        type="text"
                        name="name"
                        autoComplete="name"
                        value={form.name}
                        aria-invalid={invalid}
                        aria-describedby={describedBy}
                        onChange={(event) => setValue("name", event.target.value)}
                      />
                    )}
                  </Field>
                  <Field label="Country" name="country" error={errors.country}>
                    {({ describedBy, invalid }) => (
                      <input
                        type="text"
                        name="country"
                        autoComplete="country-name"
                        value={form.country}
                        aria-invalid={invalid}
                        aria-describedby={describedBy}
                        onChange={(event) => setValue("country", event.target.value)}
                      />
                    )}
                  </Field>
                  <Field label="Address" name="address" className="form-span-2" error={errors.address}>
                    {({ describedBy, invalid }) => (
                      <input
                        type="text"
                        name="address"
                        autoComplete="street-address"
                        value={form.address}
                        aria-invalid={invalid}
                        aria-describedby={describedBy}
                        onChange={(event) => setValue("address", event.target.value)}
                      />
                    )}
                  </Field>
                  <Field label="City" name="city" error={errors.city}>
                    {({ describedBy, invalid }) => (
                      <input
                        type="text"
                        name="city"
                        autoComplete="address-level2"
                        value={form.city}
                        aria-invalid={invalid}
                        aria-describedby={describedBy}
                        onChange={(event) => setValue("city", event.target.value)}
                      />
                    )}
                  </Field>
                  <Field label="Postcode" name="postcode" error={errors.postcode}>
                    {({ describedBy, invalid }) => (
                      <input
                        type="text"
                        name="postcode"
                        autoComplete="postal-code"
                        value={form.postcode}
                        aria-invalid={invalid}
                        aria-describedby={describedBy}
                        onChange={(event) => setValue("postcode", event.target.value)}
                      />
                    )}
                  </Field>
                </div>
              </fieldset>

              <fieldset className="cart-panel checkout-card">
                <legend className="label text-faint">
                  <LockIcon className="h-3.5 w-3.5" />
                  Payment preview
                </legend>
                <div className="form-grid">
                  <Field label="Cardholder name" name="cardname" className="form-span-2" error={errors.cardname}>
                    {({ describedBy, invalid }) => (
                      <input
                        type="text"
                        name="cardname"
                        autoComplete="off"
                        data-lpignore="true"
                        data-1p-ignore="true"
                        value={form.cardname}
                        aria-invalid={invalid}
                        aria-describedby={describedBy}
                        onChange={(event) => setValue("cardname", event.target.value)}
                      />
                    )}
                  </Field>
                  <Field label="Card number" name="card" className="form-span-2" error={errors.card}>
                    {({ describedBy, invalid }) => (
                      <input
                        type="text"
                        name="card"
                        inputMode="numeric"
                        autoComplete="off"
                        data-lpignore="true"
                        data-1p-ignore="true"
                        placeholder="ACCT-000015"
                        value={form.card}
                        aria-invalid={invalid}
                        aria-describedby={describedBy}
                        onChange={(event) => setValue("card", event.target.value)}
                      />
                    )}
                  </Field>
                  <Field label="Expiry" name="expiry" error={errors.expiry}>
                    {({ describedBy, invalid }) => (
                      <input
                        type="text"
                        name="expiry"
                        autoComplete="off"
                        data-lpignore="true"
                        data-1p-ignore="true"
                        placeholder="MM / YY"
                        value={form.expiry}
                        aria-invalid={invalid}
                        aria-describedby={describedBy}
                        onChange={(event) => setValue("expiry", event.target.value)}
                      />
                    )}
                  </Field>
                  <Field label="CVC" name="cvc" error={errors.cvc}>
                    {({ describedBy, invalid }) => (
                      <input
                        type="text"
                        name="cvc"
                        inputMode="numeric"
                        autoComplete="off"
                        data-lpignore="true"
                        data-1p-ignore="true"
                        placeholder="123"
                        value={form.cvc}
                        aria-invalid={invalid}
                        aria-describedby={describedBy}
                        onChange={(event) => setValue("cvc", event.target.value)}
                      />
                    )}
                  </Field>
                </div>
                <p className="checkout-pay-note">UI fields only. Do not enter a real card — no payment is processed.</p>
              </fieldset>

              <button type="submit" className="btn btn-hero checkout-submit" disabled={submitting}>
                <LockIcon className="h-4 w-4" />
                {submitting ? "Placing order…" : `Place order · ${money(total)}`}
              </button>
            </form>
          )}

          <aside className="cart-summary">
            <p className="label text-faint">Order summary</p>
            <p className="cart-summary-kicker">
              {items.length ? `${itemCount} ${itemWord}` : "No items yet"}
            </p>
            {items.length ? (
              <ul className="checkout-items">
                {items.map((line) => (
                  <li key={line.key} className="checkout-item">
                    <span className="checkout-item-media">
                      <Image
                        src={line.image}
                        alt=""
                        width={96}
                        height={96}
                        sizes="48px"
                        style={{ objectPosition: line.imagePosition || "center center" }}
                      />
                    </span>
                    <span className="checkout-item-copy">
                      <strong>{line.name}</strong>
                      <span>
                        {line.variantLabel} · × {line.qty}
                      </span>
                    </span>
                    <span className="checkout-item-price">{money(line.price * line.qty)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="copy checkout-empty-copy">Your cart is empty.</p>
            )}
            <dl>
              <div>
                <dt>Subtotal</dt>
                <dd>{money(subtotal)}</dd>
              </div>
              <div>
                <dt>Shipping</dt>
                <dd>{items.length ? SHIPPING_LABEL : "—"}</dd>
              </div>
              <div className="cart-summary-total">
                <dt>Total</dt>
                <dd>{money(total)}</dd>
              </div>
            </dl>
            {items.length ? (
              <button type="submit" form="checkout-form" className="btn btn-hero w-full" disabled={submitting}>
                {submitting ? "Placing order…" : "Place order"}
                {!submitting ? <ArrowIcon /> : null}
              </button>
            ) : null}
            <Link href="/cart" className="btn btn-hero-ghost w-full">
              Back to cart
            </Link>
            <ul className="cart-trust">
              <li>
                <TruckIcon className="h-4 w-4" />
                {SHIPPING_LABEL} · No minimum order
              </li>
              <li>
                <LockIcon className="h-4 w-4" />
                Discreet tracked dispatch
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
