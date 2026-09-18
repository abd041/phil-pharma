"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import EmptyState from "@/components/EmptyState";
import { cartTotals, hydrateCartLines, SHIPPING_LABEL } from "@/lib/data";
import { ArrowIcon, BagIcon, LockIcon, MinusIcon, PlusIcon, TruckIcon } from "@/components/Icons";
import { useCart } from "@/components/UiProviders";

function money(value) {
  return `£${Number(value).toFixed(2)}`;
}

export default function CartPageClient() {
  const { lines, ready, updateQty, removeItem, clear } = useCart();
  const items = useMemo(() => hydrateCartLines(lines), [lines]);
  const { subtotal, shipping, total } = cartTotals(items);
  const itemCount = items.reduce((sum, line) => sum + line.qty, 0);
  const itemWord = itemCount === 1 ? "item" : "items";

  return (
    <section className="page-section cart-page">
      <div className="page-wrap">
        <header className="cart-head">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/shop">Shop</Link>
            <span aria-hidden="true">/</span>
            <span>Cart</span>
          </nav>
          <p className="label text-faint">Bag</p>
          <div className="cart-head-row">
            <h1 className="display cart-title">Your cart</h1>
            {ready && items.length ? (
              <p className="cart-head-meta">
                {itemCount} {itemWord} · {SHIPPING_LABEL}
              </p>
            ) : null}
          </div>
        </header>

        <div className="cart-layout">
          <div className="cart-lines">
            {!ready ? (
              <div className="cart-panel" aria-busy="true" aria-live="polite">
                <p className="sr-only">Loading cart</p>
                <div className="cart-skeleton-line" />
                <div className="cart-skeleton-line" />
              </div>
            ) : items.length === 0 ? (
              <div className="cart-panel cart-empty">
                <span className="cart-empty-icon" aria-hidden="true">
                  <BagIcon />
                </span>
                <EmptyState
                  kicker="Cart empty"
                  title="Your bag is empty"
                  body="Add products from the catalogue. Items stay in this browser until you clear them or check out."
                />
              </div>
            ) : (
              <div className="cart-panel">
                <div className="cart-panel-toolbar">
                  <p className="label text-faint">
                    {String(items.length).padStart(2, "0")} {items.length === 1 ? "line" : "lines"}
                  </p>
                  <button type="button" className="cart-clear" onClick={() => clear()}>
                    Clear cart
                  </button>
                </div>
                {items.map((line) => (
                  <article key={line.key} className="cart-line">
                    <Link href={`/product/${line.slug}`} className="cart-line-media">
                      <Image
                        src={line.image}
                        alt={line.name}
                        width={240}
                        height={240}
                        sizes="112px"
                        style={{ objectPosition: line.imagePosition || "center center" }}
                      />
                    </Link>
                    <div className="cart-line-copy">
                      <div className="cart-line-top">
                        <Link href={`/product/${line.slug}`}>
                          <h2>{line.name}</h2>
                        </Link>
                        <p className="cart-line-total">{money(line.price * line.qty)}</p>
                      </div>
                      <p className="label text-faint">
                        {line.tag}
                        {line.variantLabel ? ` · ${line.variantLabel}` : ""}
                      </p>
                      <p className="cart-line-price">{line.priceLabel} each</p>
                      <div className="cart-line-actions">
                        <div className="qty-control cart-qty" aria-label={`Quantity for ${line.name}`}>
                          <button
                            type="button"
                            onClick={() => updateQty(line.slug, line.variantId, line.qty - 1)}
                            aria-label={`Decrease ${line.name}`}
                          >
                            <MinusIcon />
                          </button>
                          <span aria-live="polite">{line.qty}</span>
                          <button
                            type="button"
                            onClick={() => updateQty(line.slug, line.variantId, line.qty + 1)}
                            aria-label={`Increase ${line.name}`}
                          >
                            <PlusIcon />
                          </button>
                        </div>
                        <button
                          type="button"
                          className="cart-remove"
                          onClick={() => removeItem(line.slug, line.variantId, line.name)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          <aside className="cart-summary">
            <p className="label text-faint">Order summary</p>
            <p className="cart-summary-kicker">
              {items.length ? `${itemCount} ${itemWord}` : "No items yet"}
            </p>
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
              <Link href="/checkout" scroll className="btn btn-hero w-full">
                Proceed to checkout
                <ArrowIcon />
              </Link>
            ) : (
              <span className="btn btn-hero w-full opacity-40" aria-disabled="true">
                Proceed to checkout
              </span>
            )}
            <Link href="/shop" className="btn btn-hero-ghost w-full">
              Continue shopping
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
