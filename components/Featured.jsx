"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { products } from "@/lib/data";
import { ArrowIcon, CartIcon, StarIcon } from "./Icons";
import Reveal from "./Reveal";
import SplitTitle from "./SplitTitle";

const filters = ["All products", "Peptides", "Accessories"];

export default function Featured() {
  const [filter, setFilter] = useState("All products");

  const visible = useMemo(() => {
    if (filter === "All products") return products;
    return products.filter((item) => item.category === filter);
  }, [filter]);

  return (
    <section id="catalogue" className="relative pt-20 pb-16 sm:pt-28 sm:pb-20" data-inview>
      <div className="page-wrap">
        <Reveal variant="stagger" className="grid gap-8 border-t border-white/10 pt-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:pt-6">
          <div>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 sm:mb-8 sm:gap-6">
              <p className="label text-faint">Catalogue</p>
              <p className="label text-faint">03 / Selection</p>
            </div>
            <SplitTitle className="display display-lg">Featured peptides</SplitTitle>
            <p className="copy measure mt-4">
              A focused selection from the Phil&apos;s Pharma catalogue.
            </p>
          </div>

          <div
            className="flex flex-wrap gap-x-7 gap-y-2 lg:justify-end"
            role="tablist"
            aria-label="Product filters"
          >
            {filters.map((item) => {
              const active = item === filter;
              return (
                <button
                  key={item}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(item)}
                  className={`label min-h-11 pb-1 transition-colors ${
                    active ? "border-b border-fg text-fg" : "text-faint hover:text-fg"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="product-cards">
          {visible.map((product, index) => (
            <Reveal key={product.id} delay={index * 0.1} variant="scale">
              <article className="product-card">
                <div className="product-card-media">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 639px) 48vw, (max-width: 1280px) 44vw, 22vw"
                    className="object-cover"
                    style={{ objectPosition: product.imagePosition }}
                  />
                  <span className="product-card-fx" aria-hidden="true" />
                  <span className="product-card-meta">
                    <span className="product-card-tag">{product.tag}</span>
                    <span className="product-card-index">{String(index + 1).padStart(2, "0")}</span>
                  </span>
                  {product.badge ? <span className="product-card-badge">{product.badge}</span> : null}
                </div>

                <div className="product-card-body">
                  <h3>{product.name}</h3>
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
                  <p className="product-card-price">{product.price}</p>
                  <a href="#catalogue" className="product-card-cart">
                    <CartIcon />
                    Add to cart
                    <ArrowIcon />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 py-6">
          <a href="#catalogue" className="text-link">
            View all products
            <ArrowIcon />
          </a>
          <p className="label text-faint">{String(visible.length).padStart(2, "0")} listed</p>
        </Reveal>
      </div>
    </section>
  );
}
