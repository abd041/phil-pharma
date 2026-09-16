"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon, HeartIcon, MinusIcon, PlusIcon, StarIcon } from "@/components/Icons";
import Reveal from "@/components/Reveal";
import { useToast, useWishlist } from "@/components/UiProviders";
import { getDefaultVariant, getVariantBundles, shopCategories } from "@/lib/data";

export default function ProductDetailClient({ product, related }) {
  const defaultVariant = getDefaultVariant(product);
  const [variantId, setVariantId] = useState(defaultVariant?.id || product.variants?.[0]?.id);
  const [qty, setQty] = useState(1);
  const { pushToast } = useToast();
  const { has, toggle } = useWishlist();
  const wished = has(product.id);

  const variant = useMemo(
    () => product.variants?.find((item) => item.id === variantId) || defaultVariant,
    [product.variants, variantId, defaultVariant]
  );

  const bundles = getVariantBundles(product, variant?.id);
  const categoryMeta = shopCategories.find((item) => item.slug === product.category);
  const outOfStock = variant?.stock === "Out of stock";

  const decrease = () => setQty((value) => Math.max(1, value - 1));
  const increase = () => setQty((value) => Math.min(20, value + 1));

  const addToCart = () => {
    if (outOfStock) {
      pushToast(`${product.name} is out of stock`, "muted");
      return;
    }
    pushToast(`Added ${qty} × ${product.name} (${variant.label}) to cart`, "success");
  };

  return (
    <>
      <section className="page-section product-detail">
        <div className="page-wrap product-detail-grid">
          <Reveal variant="scale" className="product-detail-media">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-cover"
              style={{ objectPosition: product.imagePosition || "center center" }}
            />
            <span className="product-card-fx" aria-hidden="true" />
            {product.badge ? <span className="product-card-badge">{product.badge}</span> : null}
          </Reveal>

          <Reveal variant="stagger" className="product-detail-copy">
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/shop">Shop</Link>
              <span aria-hidden="true">/</span>
              <Link href={`/shop/${product.category}`}>{categoryMeta?.name || product.category}</Link>
              <span aria-hidden="true">/</span>
              <span>{product.name}</span>
            </nav>

            <p className="label text-faint">
              {product.subcategoryLabel || product.tag}
              {product.brand ? ` · ${product.brand}` : ""}
            </p>
            <h1 className="display product-detail-title">{product.name}</h1>

            <p className="product-card-rating product-detail-rating">
              <span aria-hidden="true">
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
              </span>
              {product.rating}
              <span>({product.reviews} reviews)</span>
            </p>

            <p className="product-detail-price">{variant?.priceLabel || product.priceLabel}</p>
            <p className="copy">{product.longDescription}</p>

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
                        className={`variant-option ${selected ? "is-selected" : ""} ${
                          disabled ? "is-oos" : ""
                        }`}
                        onClick={() => {
                          setVariantId(option.id);
                          setQty(1);
                        }}
                      >
                        <span>{option.label}</span>
                        <span>{option.priceLabel}</span>
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

            <dl className="product-spec-grid">
              {product.specs.map((spec) => (
                <div key={spec.label}>
                  <dt className="label text-faint">{spec.label}</dt>
                  <dd>{spec.value}</dd>
                </div>
              ))}
              {variant?.strength ? (
                <div>
                  <dt className="label text-faint">Selected</dt>
                  <dd>{variant.label}</dd>
                </div>
              ) : null}
            </dl>

            <p className={`product-stock ${outOfStock ? "is-oos" : ""}`}>
              {outOfStock ? "Out of stock" : variant?.stock || product.stock}
            </p>

            <div className="product-buy-row">
              <div className="qty-control" aria-label="Quantity">
                <button type="button" onClick={decrease} aria-label="Decrease quantity" disabled={outOfStock}>
                  <MinusIcon />
                </button>
                <span>{qty}</span>
                <button type="button" onClick={increase} aria-label="Increase quantity" disabled={outOfStock}>
                  <PlusIcon />
                </button>
              </div>
              <button
                type="button"
                className="btn btn-hero"
                onClick={addToCart}
                disabled={outOfStock}
                aria-disabled={outOfStock}
              >
                {outOfStock ? "Out of stock" : "Add to cart"}
                {!outOfStock ? <ArrowIcon /> : null}
              </button>
              <button
                type="button"
                className={`btn btn-hero-ghost wishlist-detail-btn ${wished ? "is-active" : ""}`}
                aria-pressed={wished}
                onClick={() => toggle(product)}
              >
                <HeartIcon filled={wished} />
                {wished ? "Saved" : "Wishlist"}
              </button>
            </div>

            <div className="product-secondary-actions">
              <Link href="/cart" className="text-link">
                View cart
                <ArrowIcon />
              </Link>
            </div>

            <p className="label text-faint product-disclaimer">
              For research / informational purposes only. No medical advice provided.
            </p>
          </Reveal>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="page-section page-section-tight">
          <div className="page-wrap">
            <div className="catalogue-toolbar">
              <h2 className="display rest-title" style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)" }}>
                Related products
              </h2>
              <Link href={`/shop/${product.category}`} className="text-link">
                View category
                <ArrowIcon />
              </Link>
            </div>
            <div className="product-cards related-cards">
              {related.map((item, index) => (
                <Reveal key={item.id} delay={index * 0.08} variant="scale">
                  <article className="product-card">
                    <Link href={`/product/${item.slug}`} className="product-card-media">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 639px) 48vw, 22vw"
                        className="object-cover"
                        style={{ objectPosition: item.imagePosition || "center center" }}
                      />
                      <span className="product-card-fx" aria-hidden="true" />
                    </Link>
                    <div className="product-card-body">
                      <h3>
                        <Link href={`/product/${item.slug}`}>{item.name}</Link>
                      </h3>
                      <p className="product-card-price">{item.priceLabel}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
