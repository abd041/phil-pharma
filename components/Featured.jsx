"use client";

import { useMemo, useState } from "react";
import { featuredProductIds, products } from "@/lib/data";
import { ArrowIcon } from "./Icons";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";
import SplitTitle from "./SplitTitle";
import Link from "next/link";

const filters = [
  { id: "all", label: "All products" },
  { id: "peptides", label: "Peptides" },
  { id: "accessories", label: "Accessories" },
  { id: "oils", label: "Oils" },
];

function matchesFilter(item, filter) {
  if (filter === "all") return true;
  if (filter === "oils") return item.subcategory === "oils";
  return item.category === filter;
}

export default function Featured() {
  const [filter, setFilter] = useState("all");

  const catalogue = useMemo(
    () => products.filter((item) => featuredProductIds.includes(item.id)),
    []
  );

  const visible = useMemo(
    () => catalogue.filter((item) => matchesFilter(item, filter)),
    [catalogue, filter]
  );

  return (
    <section id="catalogue" className="relative pt-20 pb-16 sm:pt-28 sm:pb-20" data-inview>
      <div className="page-wrap">
        <Reveal
          variant="stagger"
          className="grid gap-8 border-t border-white/10 pt-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:pt-6"
        >
          <div>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 sm:mb-8 sm:gap-6">
              <p className="label text-faint">Catalogue</p>
              <p className="label text-faint">03 / Selection</p>
            </div>
            <SplitTitle className="display display-lg">Featured selection</SplitTitle>
            <p className="copy measure mt-4">
              A focused selection from the Phil&apos;s Pharma catalogue.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-7 gap-y-2 lg:justify-end" role="tablist" aria-label="Product filters">
            {filters.map((item) => {
              const active = item.id === filter;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(item.id)}
                  className={`label min-h-11 pb-1 transition-colors ${
                    active ? "border-b border-fg text-fg" : "text-faint hover:text-fg"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="product-cards">
          {visible.length ? (
            visible.map((product, index) => (
              <Reveal key={product.id} delay={index * 0.1} variant="scale">
                <ProductCard product={product} index={index} />
              </Reveal>
            ))
          ) : (
            <p className="copy" style={{ gridColumn: "1 / -1" }}>
              No featured products in this category.
            </p>
          )}
        </div>

        <Reveal className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 py-6">
          <Link href="/shop" className="text-link">
            View all products
            <ArrowIcon />
          </Link>
          <p className="label text-faint">{String(visible.length).padStart(2, "0")} listed</p>
        </Reveal>
      </div>
    </section>
  );
}
