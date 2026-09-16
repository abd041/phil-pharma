"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowIcon, CartIcon, HeartIcon, StarIcon } from "./Icons";
import { useToast, useWishlist } from "./UiProviders";

export default function ProductCard({ product, index = 0 }) {
  const { pushToast } = useToast();
  const { has, toggle } = useWishlist();
  const wished = has(product.id);
  const outOfStock = product.stock === "Out of stock";
  const optionCount = product.variants?.length || 0;

  return (
    <article className={`product-card ${outOfStock ? "is-oos" : ""}`}>
      <div className="product-card-media">
        <Link href={`/product/${product.slug}`} className="product-card-media-link">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 639px) 48vw, (max-width: 1280px) 44vw, 22vw"
            className="object-cover"
            style={{ objectPosition: product.imagePosition || "center center" }}
          />
          <span className="product-card-fx" aria-hidden="true" />
        </Link>
        <span className="product-card-meta">
          <span className="product-card-tag">{product.tag}</span>
          <span className="product-card-index">{String(index + 1).padStart(2, "0")}</span>
        </span>
        {product.badge ? <span className="product-card-badge">{product.badge}</span> : null}
        <button
          type="button"
          className={`wishlist-btn ${wished ? "is-active" : ""}`}
          aria-pressed={wished}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => toggle(product)}
        >
          <HeartIcon filled={wished} />
        </button>
      </div>

      <div className="product-card-body">
        <h3>
          <Link href={`/product/${product.slug}`}>{product.name}</Link>
        </h3>
        <p className="product-card-rating">
          <span aria-hidden="true">
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
          </span>
          {product.rating}
          <span>({product.reviews})</span>
        </p>
        <p className="product-card-copy">{product.description}</p>
        {optionCount > 1 ? (
          <p className="product-card-options">{optionCount} options</p>
        ) : null}
        {product.hasBundle ? <p className="product-card-deal">Bundle / deal available</p> : null}
        <div className="product-card-meta-row">
          <p className="product-card-price">{product.priceLabel}</p>
          <p className={`product-card-stock ${outOfStock ? "is-oos" : ""}`}>
            {outOfStock ? "Out of stock" : product.stock}
          </p>
        </div>
        <div className="product-card-actions">
          <Link href={`/product/${product.slug}`} className="product-card-cart">
            <CartIcon />
            View
            <ArrowIcon />
          </Link>
          <button
            type="button"
            className="product-card-quick"
            disabled={outOfStock}
            onClick={() =>
              pushToast(
                outOfStock
                  ? `${product.name} is out of stock`
                  : `${product.name} — open product to choose options`,
                outOfStock ? "muted" : "success"
              )
            }
          >
            {outOfStock ? "Unavailable" : "Quick add"}
          </button>
        </div>
      </div>
    </article>
  );
}
