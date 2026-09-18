"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import PageHero from "@/components/PageHero";
import { cartSeed, getProductBySlug } from "@/lib/data";
import { MinusIcon, PlusIcon, ArrowIcon } from "@/components/Icons";
import { useToast } from "@/components/UiProviders";

function buildCart(seed) {
  return seed
    .map((entry) => {
      const product = getProductBySlug(entry.slug);
      if (!product) return null;
      const variant =
        product.variants?.find((item) => item.id === entry.variantId) || product.variants?.[0];
      if (!variant) return null;
      return {
        key: `${product.slug}:${variant.id}`,
        slug: product.slug,
        variantId: variant.id,
        name: product.name,
        variantLabel: variant.label,
        tag: product.tag,
        image: product.image,
        imagePosition: product.imagePosition,
        price: variant.price,
        priceLabel: variant.priceLabel,
        qty: entry.qty,
      };
    })
    .filter(Boolean);
}

export default function CartPage() {
  const [lines, setLines] = useState(() => buildCart(cartSeed));
  const { pushToast } = useToast();

  const subtotal = useMemo(
    () => lines.reduce((sum, line) => sum + line.price * line.qty, 0),
    [lines]
  );

  const updateQty = (key, next, name) => {
    setLines((current) => {
      return current
        .map((line) => (line.key === key ? { ...line, qty: Math.max(0, next) } : line))
        .filter((line) => line.qty > 0);
    });
    if (next <= 0) pushToast(`Removed ${name} from cart`, "muted");
  };

  const clearCart = () => {
    setLines([]);
    pushToast("Cart cleared", "muted");
  };

  return (
    <SiteShell>
      <PageHero
        kicker="Cart"
        title="Your cart"
        body="Review items before checkout. Quantities update in this UI mock only. Delivery listed at £8 Tracked 24hr on client menus."
        crumbs={[{ label: "Cart" }]}
      />

      <section className="page-section">
        <div className="page-wrap cart-layout">
          <div className="cart-lines">
            {lines.length === 0 ? (
              <div className="empty-state">
                <p className="label text-faint">Cart empty</p>
                <p className="copy mt-3">Add products from the catalogue to continue.</p>
                <Link href="/shop" className="btn btn-hero mt-6">
                  Browse shop
                </Link>
              </div>
            ) : (
              <>
                <div className="catalogue-toolbar">
                  <p className="label text-faint">{String(lines.length).padStart(2, "0")} lines</p>
                  <button type="button" className="text-link" onClick={clearCart}>
                    Clear cart
                  </button>
                </div>
                {lines.map((line) => (
                  <article key={line.key} className="cart-line">
                    <div className="cart-line-media">
                      <Image
                        src={line.image}
                        alt={line.name}
                        fill
                        className="object-contain object-center"
                        sizes="96px"
                        style={{ objectPosition: line.imagePosition || "center center" }}
                      />
                    </div>
                    <div className="cart-line-copy">
                      <Link href={`/product/${line.slug}`}>
                        <h2>{line.name}</h2>
                      </Link>
                      <p className="label text-faint">
                        {line.tag} · {line.variantLabel}
                      </p>
                      <p className="cart-line-price">{line.priceLabel}</p>
                      <div className="qty-control">
                        <button
                          type="button"
                          onClick={() => updateQty(line.key, line.qty - 1, line.name)}
                          aria-label="Decrease"
                        >
                          <MinusIcon />
                        </button>
                        <span>{line.qty}</span>
                        <button
                          type="button"
                          onClick={() => updateQty(line.key, line.qty + 1, line.name)}
                          aria-label="Increase"
                        >
                          <PlusIcon />
                        </button>
                      </div>
                      <button
                        type="button"
                        className="cart-remove"
                        onClick={() => updateQty(line.key, 0, line.name)}
                      >
                        Remove
                      </button>
                    </div>
                    <p className="cart-line-total">£{(line.price * line.qty).toFixed(2)}</p>
                  </article>
                ))}
              </>
            )}
          </div>

          <aside className="cart-summary">
            <p className="label text-faint">Order summary</p>
            <dl>
              <div>
                <dt>Subtotal</dt>
                <dd>£{subtotal.toFixed(2)}</dd>
              </div>
              <div>
                <dt>Shipping</dt>
                <dd>£8.00 Tracked 24hr</dd>
              </div>
              <div className="cart-summary-total">
                <dt>Total</dt>
                <dd>£{(subtotal + (lines.length ? 8 : 0)).toFixed(2)}</dd>
              </div>
            </dl>
            <Link
              href="/checkout"
              className={`btn btn-hero w-full ${lines.length ? "" : "pointer-events-none opacity-40"}`}
            >
              Proceed to checkout
              <ArrowIcon />
            </Link>
            <Link href="/shop" className="btn btn-hero-ghost w-full">
              Continue shopping
            </Link>
          </aside>
        </div>
      </section>
    </SiteShell>
  );
}
