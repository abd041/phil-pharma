"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon, BagIcon, BoltIcon, CartIcon, CheckIcon, GemIcon, HeartIcon, MinusIcon, PlusIcon, ShieldIcon, TruckIcon, UsbCIcon } from "@/components/Icons";
import Reveal from "@/components/Reveal";
import StarRating from "@/components/StarRating";
import ProductCard from "@/components/ProductCard";
import { useCart, useWishlist } from "@/components/UiProviders";
import { getDefaultVariant, getVariantBundles, shopCategories, SHIPPING_LABEL } from "@/lib/data";
import { visibleSpecs } from "@/lib/merchandising";

const HIGHLIGHT_ICONS = {
  bolt: BoltIcon,
  usb: UsbCIcon,
  shield: ShieldIcon,
  gem: GemIcon,
};

export default function ProductDetailClient({ product, related }) {
  const defaultVariant = getDefaultVariant(product);
  const [variantId, setVariantId] = useState(defaultVariant?.id || product.variants?.[0]?.id);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const { has, toggle } = useWishlist();
  const wished = has(product.id);

  const variant = useMemo(
    () => product.variants?.find((item) => item.id === variantId) || defaultVariant,
    [product.variants, variantId, defaultVariant]
  );

  const bundles = getVariantBundles(product, variant?.id);
  const categoryMeta = shopCategories.find((item) => item.slug === product.category);
  const oilsPage = product.subcategory === "oils";
  const outOfStock = variant?.stock === "Out of stock";
  const singleVariant = (product.variants?.length || 0) <= 1;
  const specs = visibleSpecs(product, variant, { singleVariant });
  const categoryHref = oilsPage ? "/shop/oils" : `/shop/${product.relatedCategory || product.category}`;

  const decrease = () => setQty((value) => Math.max(1, value - 1));
  const increase = () => setQty((value) => Math.min(20, value + 1));

  const addToCart = () => {
    if (outOfStock || !variant) return;
    addItem({
      slug: product.slug,
      variantId: variant.id,
      qty,
      name: `${product.name} (${variant.label})`,
    });
    setAdded(true);
  };

  return (
    <>
      <section className="page-section product-detail">
        <div className="page-wrap">
          <div className="product-detail-grid">
            <Reveal variant="scale" className="product-detail-media-wrap">
              <div className="product-detail-media">
                <Image
                    src={product.image}
                    alt={product.name}
                    width={1600}
                    height={1600}
                    priority
                    sizes="(max-width: 1024px) 92vw, 46vw"
                    className="product-detail-photo"
                />
                {product.badge ? <span className="product-card-badge">{product.badge}</span> : null}
                <button
                  type="button"
                  className={`wishlist-btn pdp-media-wish ${wished ? "is-active" : ""}`}
                  aria-pressed={wished}
                  aria-label={wished ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
                  onClick={() => toggle(product)}
                >
                  <HeartIcon filled={wished} />
                </button>
              </div>
            </Reveal>

            <Reveal variant="stagger" className="product-detail-copy">
              <nav className="breadcrumbs" aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <span aria-hidden="true">/</span>
                <Link href="/shop">Shop</Link>
                <span aria-hidden="true">/</span>
                <Link href={oilsPage ? "/shop/oils" : `/shop/${product.category}`}>
                  {categoryMeta?.name || product.category}
                </Link>
                <span aria-hidden="true">/</span>
                <span>{product.name}</span>
              </nav>

              <p className="label text-faint">
                {product.subcategoryLabel || product.tag}
                {product.brand ? ` · ${product.brand}` : ""}
              </p>
              <h1 className="display product-detail-title">{product.name}</h1>
              <StarRating rating={product.rating} count={product.reviews} label="reviews" />
              <p className="copy product-detail-lede">{product.longDescription}</p>

              {product.variants?.length > 1 ? (
                <div className="variant-picker">
                  <p className="label text-faint">Select option</p>
                  <div className="variant-options" role="listbox" aria-label="Product options">
                    {product.variants.map((option) => {
                      const selected = option.id === variant?.id;
                      const disabled = option.stock === "Out of stock";
                      return (
                        <button
                          key={option.id}
                          type="button"
                          role="option"
                          aria-selected={selected}
                          aria-disabled={disabled}
                          className={`variant-option ${selected ? "is-selected" : ""} ${
                            disabled ? "is-oos" : ""
                          }`}
                          onClick={() => {
                            setVariantId(option.id);
                            setQty(1);
                            setAdded(false);
                          }}
                        >
                          <span>{option.label}</span>
                          <span>{disabled ? "Out of stock" : option.priceLabel}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}

              {bundles.length > 0 ? (
                <div className="bundle-panel">
                  <p className="label text-faint">Bundle / deal</p>
                  <ul>
                    {bundles.map((bundle) => (
                      <li key={bundle.id}>
                        <strong>{bundle.note || bundle.label}</strong>
                        {bundle.unitPriceLabel ? <span>{bundle.unitPriceLabel}</span> : null}
                        {bundle.dealPriceLabel ? <span>{bundle.dealPriceLabel}</span> : null}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="pdp-buy-panel">
                <div className="product-price-row">
                  <p className="product-detail-price">{variant?.priceLabel || product.priceLabel}</p>
                  {product.offerChip ? <span className="product-offer-chip">{product.offerChip}</span> : null}
                  <p className={`pdp-stock ${outOfStock ? "is-oos" : "is-in"}`}>
                    <CheckIcon />
                    {outOfStock ? "Out of stock" : "In stock"}
                  </p>
                </div>

                <div className="product-buy-row">
                  <div className="qty-control pdp-qty" aria-label="Quantity">
                    <button type="button" onClick={decrease} aria-label="Decrease quantity" disabled={outOfStock}>
                      <MinusIcon />
                    </button>
                    <span aria-live="polite">{qty}</span>
                    <button type="button" onClick={increase} aria-label="Increase quantity" disabled={outOfStock}>
                      <PlusIcon />
                    </button>
                  </div>
                  <button
                    type="button"
                    className="btn btn-hero product-add-btn"
                    onClick={addToCart}
                    disabled={outOfStock}
                    aria-disabled={outOfStock}
                  >
                    <CartIcon />
                    {outOfStock ? "Out of stock" : added ? "Added to cart" : "Add to cart"}
                  </button>
                </div>

                <Link href="/cart" scroll className={`btn pdp-view-cart-btn ${added ? "btn-hero" : "btn-hero-ghost"}`}>
                  <BagIcon />
                  View cart
                </Link>

                <p className="product-shipping-note">
                  <TruckIcon className="h-4 w-4" />
                  {SHIPPING_LABEL} · No minimum order
                </p>
              </div>

              {product.highlights?.length ? (
                <ul className="pdp-highlights">
                  {product.highlights.map((item) => {
                    const Icon = HIGHLIGHT_ICONS[item.icon] || ShieldIcon;
                    return (
                      <li key={item.title}>
                        <span className="pdp-highlight-icon">
                          <Icon />
                        </span>
                        <p className="pdp-highlight-title">{item.title}</p>
                        <p className="pdp-highlight-body">{item.body}</p>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </Reveal>
          </div>

          {specs.length > 0 && !product.highlights?.length ? (
            <div className="pdp-facts" aria-label="Product details">
              {specs.map((spec) => (
                <article key={spec.label} className="pdp-fact">
                  <p className="label text-faint">{spec.label}</p>
                  <p>{spec.value}</p>
                </article>
              ))}
            </div>
          ) : null}

          {product.inTheBox?.length || product.howTo?.length ? (
            <div className="pdp-detail-split">
              {product.inTheBox?.length ? (
                <div className="pdp-panel">
                  <p className="label text-faint">In the box</p>
                  <ul className="pdp-chip-list">
                    {product.inTheBox.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {product.howTo?.length ? (
                <div className="pdp-panel">
                  <p className="label text-faint">How it works</p>
                  <ol className="pdp-step-grid">
                    {product.howTo.map((item) => (
                      <li key={item.step}>
                        <span>{item.step}</span>
                        <strong>{item.label}</strong>
                      </li>
                    ))}
                  </ol>
                </div>
              ) : null}
            </div>
          ) : null}

          <p className="label text-faint product-disclaimer">
            For research / informational purposes only. No medical advice provided.
          </p>
        </div>
      </section>

      {!outOfStock ? (
        <div className="pdp-sticky-buy">
          <div className="pdp-sticky-buy-inner">
            <div>
              <p className="pdp-sticky-name">{product.name}</p>
              <p className="pdp-sticky-price">{variant?.priceLabel || product.priceLabel}</p>
            </div>
            <div className="pdp-sticky-actions">
              <button type="button" className="btn btn-hero" onClick={addToCart}>
                {added ? "Added" : "Add to cart"}
              </button>
              <Link href="/cart" scroll className={`btn ${added ? "btn-hero" : "btn-hero-ghost"}`}>
                View cart
              </Link>
            </div>
          </div>
        </div>
      ) : null}

      {related.length > 0 ? (
        <section className="page-section page-section-tight">
          <div className="page-wrap">
            <div className="catalogue-toolbar">
              <h2 className="display rest-title" style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)" }}>
                {product.pairsWith?.length ? "Pairs with" : "Related products"}
              </h2>
              <Link href={categoryHref} className="text-link">
                View category
                <ArrowIcon />
              </Link>
            </div>
            <div className="product-cards related-cards">
              {related.map((item, index) => (
                <Reveal key={item.id} delay={index * 0.08} variant="scale">
                  <ProductCard product={item} index={index} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
