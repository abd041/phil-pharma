"use client";

import { useMemo, useState } from "react";
import ProductGrid from "./ProductGrid";
import { ChevronDownIcon } from "./Icons";

function sortProducts(items, sort) {
  const next = [...items];
  switch (sort) {
    case "price-asc":
      return next.sort((a, b) => a.price - b.price);
    case "price-desc":
      return next.sort((a, b) => b.price - a.price);
    case "rating":
      return next.sort((a, b) => Number(b.rating) - Number(a.rating));
    case "name":
      return next.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return next;
  }
}

export default function CatalogueBrowser({ items, subcategories = [] }) {
  const [sort, setSort] = useState("featured");
  const [stock, setStock] = useState("all");
  const [subcategory, setSubcategory] = useState("all");

  const filtered = useMemo(() => {
    let list = items;
    if (subcategory !== "all") {
      list = list.filter((item) => item.subcategory === subcategory);
    }
    if (stock === "in") {
      list = list.filter((item) => item.stock === "In stock");
    }
    if (stock === "oos") {
      list = list.filter(
        (item) =>
          item.stock === "Out of stock" ||
          item.variants?.some((variant) => variant.stock === "Out of stock")
      );
    }
    return sortProducts(list, sort);
  }, [items, sort, stock, subcategory]);

  return (
    <div>
      {subcategories.length > 0 ? (
        <div className="subcategory-tabs" role="tablist" aria-label="Subcategories">
          <button
            type="button"
            className={`subcategory-tab ${subcategory === "all" ? "is-active" : ""}`}
            onClick={() => setSubcategory("all")}
          >
            All
          </button>
          {subcategories.map((item) => (
            <button
              key={item.slug}
              type="button"
              className={`subcategory-tab ${subcategory === item.slug ? "is-active" : ""}`}
              onClick={() => setSubcategory(item.slug)}
            >
              {item.name}
            </button>
          ))}
        </div>
      ) : null}

      <div className="catalogue-controls">
        <p className="label text-faint">
          {String(filtered.length).padStart(2, "0")} shown
          {filtered.length !== items.length ? ` of ${String(items.length).padStart(2, "0")}` : ""}
        </p>

        <div className="catalogue-filters">
          <label className="catalogue-select">
            <span className="sr-only">Stock filter</span>
            <select value={stock} onChange={(event) => setStock(event.target.value)}>
              <option value="all">All stock</option>
              <option value="in">In stock</option>
              <option value="oos">Includes out of stock</option>
            </select>
            <ChevronDownIcon />
          </label>

          <label className="catalogue-select">
            <span className="sr-only">Sort products</span>
            <select value={sort} onChange={(event) => setSort(event.target.value)}>
              <option value="featured">Featured</option>
              <option value="price-asc">Price · Low to high</option>
              <option value="price-desc">Price · High to low</option>
              <option value="rating">Top rated</option>
              <option value="name">Name · A–Z</option>
            </select>
            <ChevronDownIcon />
          </label>
        </div>
      </div>

      <ProductGrid items={filtered} />
    </div>
  );
}
