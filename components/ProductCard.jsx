"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowIcon, CartIcon, HeartIcon } from "./Icons";
import StarRating from "./StarRating";
import { getDefaultVariant } from "@/lib/data";
import { useCart, useToast, useWishlist } from "./UiProviders";

export default function ProductCard({ product, index = 0 }) {
  const { pushToast } = useToast();
  const { has, toggle } = useWishlist();
  const { addItem } = useCart();
  const wished = has(product.id);
  const variants = product.variants || [];
  const hasOosVariant = variants.some((variant) => variant.stock === "Out of stock");
  const allOut = variants.length > 0 && variants.every((variant) => variant.stock === "Out of stock");
  const parentOut = product.stock === "Out of stock" || allOut;
  const defaultVariant = getDefaultVariant(product);
  const optionCount = variants.length;

  const quickAdd = () => {
    if (parentOut || !defaultVariant) {
      pushToast(`${product.name} is out of stock`, "muted");
      return;
    }
    addItem({
      slug: product.slug,
      variantId: defaultVariant.id,
      qty: 1,
      name: `${product.name} (${defaultVariant.label})`,
    });
  };

  return (
    <article className={`product-card ${parentOut ? "is-oos" : ""}`}>
      <div className="product-card-media">
        <Link href={`/product/${product.slug}`} className="product-card-media-link">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 639px) 48vw, (max-width: 1280px) 44vw, 22vw"
            className="object-contain object-center"
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
          aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          onClick={() => toggle(product)}
        >
          <HeartIcon filled={wished} />
        </button>
      </div>

      <div className="product-card-body">
        <h3>
          <Link href={`/product/${product.slug}`}>{product.name}</Link>
        </h3>
        <StarRating rating={product.rating} count={product.reviews} label="" />
        <p className="product-card-copy">{product.description}</p>
        {optionCount > 1 ? <p className="product-card-options">{optionCount} options</p> : null}
        {product.hasBundle ? <p className="product-card-deal">Bundle / deal available</p> : null}
        <div className="product-card-meta-row">
          <p className="product-card-price">{product.priceLabel}</p>
          <p className={`product-card-stock ${parentOut || hasOosVariant ? "is-oos" : ""}`}>
            {parentOut ? "Out of stock" : hasOosVariant ? "Some options OOS" : product.stock}
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
            disabled={parentOut}
            aria-label={parentOut ? `${product.name} is unavailable` : `Quick add ${product.name}`}
            onClick={quickAdd}
          >
            {parentOut ? "Unavailable" : "Quick add"}
          </button>
        </div>
      </div>
    </article>
  );
}
