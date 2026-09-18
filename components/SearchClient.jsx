"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ProductGrid from "@/components/ProductGrid";
import Reveal from "@/components/Reveal";
import SplitTitle from "@/components/SplitTitle";
import { ArrowIcon, SearchIcon } from "@/components/Icons";
import {
  featuredProductIds,
  products,
  searchProducts,
  shopCategories,
} from "@/lib/data";

const SUGGESTIONS = ["retatrutide", "bpc-157", "peptide", "oil", "pen", "syringe", "battery", "d9"];

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

const featured = featuredProductIds
  .map((id) => products.find((item) => item.id === id))
  .filter(Boolean);

export default function SearchClient({ initialQuery = "" }) {
  const router = useRouter();
  const inputRef = useRef(null);
  const [draft, setDraft] = useState(initialQuery);
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("featured");
  const query = initialQuery.trim();
  const matches = useMemo(() => (query ? searchProducts(query) : []), [query]);

  const categoryOptions = useMemo(() => {
    const counts = new Map();
    matches.forEach((item) => {
      const key = item.category;
      if (!key) return;
      counts.set(key, (counts.get(key) || 0) + 1);
    });
    return shopCategories
      .filter((item) => counts.has(item.slug))
      .map((item) => ({ ...item, count: counts.get(item.slug) }));
  }, [matches]);

  const results = useMemo(() => {
    const list = category === "all" ? matches : matches.filter((item) => item.category === category);
    return sortProducts(list, sort);
  }, [matches, category, sort]);

  useEffect(() => {
    setDraft(initialQuery);
    setCategory("all");
  }, [initialQuery]);

  useEffect(() => {
    const id = window.setTimeout(() => {
      const next = draft.trim();
      if (next === query) return;
      router.replace(next ? `/search?q=${encodeURIComponent(next)}` : "/search");
    }, 320);
    return () => window.clearTimeout(id);
  }, [draft, query, router]);

  const submit = (event) => {
    event.preventDefault();
    const next = draft.trim();
    router.push(next ? `/search?q=${encodeURIComponent(next)}` : "/search");
  };

  const applySuggestion = (term) => {
    setDraft(term);
    router.push(`/search?q=${encodeURIComponent(term)}`);
  };

  const clear = () => {
    setDraft("");
    setCategory("all");
    setSort("featured");
    router.push("/search");
    inputRef.current?.focus();
  };

  return (
    <article className="search-page">
      <header className="about-hero">
        <div className="page-wrap">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Search</span>
          </nav>

          <Reveal variant="stagger" className="about-hero-copy">
            <p className="standard-kicker">
              <span className="standard-kicker-line" aria-hidden="true" />
              Catalogue
            </p>
            <SplitTitle className="display rest-title about-hero-title">
              {query ? (
                <>
                  Results for <span>“{query}”</span>
                </>
              ) : (
                <>
                  Find it by name, <span>not by guesswork.</span>
                </>
              )}
            </SplitTitle>
            <p className="copy rest-lead about-hero-lead">
              Search listed peptides, medications, oils, pens, and accessories. Strength and format
              stay on the product page.
            </p>
          </Reveal>

          <form className="search-console" onSubmit={submit} role="search">
            <label className="sr-only" htmlFor="site-search">
              Search products
            </label>
            <div className="search-field search-field-lg">
              <SearchIcon />
              <input
                ref={inputRef}
                id="site-search"
                type="search"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Search peptides, oils, pens…"
                autoComplete="off"
                autoFocus
              />
              {draft ? (
                <button type="button" className="search-clear" onClick={clear}>
                  Clear
                </button>
              ) : null}
            </div>
            <button type="submit" className="btn btn-hero search-go">
              Search
            </button>
          </form>

          <div className="search-suggest" aria-label="Suggested searches">
            {SUGGESTIONS.map((term) => (
              <button
                key={term}
                type="button"
                className={query.toLowerCase() === term ? "is-active" : ""}
                onClick={() => applySuggestion(term)}
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </header>

      <section className="about-section">
        <div className="page-wrap">
          {!query ? (
            <>
              <div className="about-section-head">
                <p className="label text-faint">Browse by menu</p>
                <h2 className="search-section-title">Jump into a category</h2>
              </div>
              <div className="about-categories search-cats">
                {shopCategories.map((item, index) => (
                  <Reveal key={item.slug} delay={index * 0.05} variant="scale">
                    <Link href={item.href} className="about-category">
                      <p className="label text-faint">{String(index + 1).padStart(2, "0")}</p>
                      <h2>{item.name}</h2>
                      <p>{item.blurb}</p>
                      <span className="text-link">
                        View {item.name.toLowerCase()}
                        <ArrowIcon />
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </div>

              {featured.length ? (
                <div className="search-featured">
                  <div className="catalogue-toolbar">
                    <p className="label text-faint">Featured</p>
                    <Link href="/shop" className="text-link">
                      Browse catalogue
                      <ArrowIcon />
                    </Link>
                  </div>
                  <ProductGrid items={featured} />
                </div>
              ) : null}
            </>
          ) : (
            <>
              <div className="catalogue-toolbar search-toolbar">
                <p className="label text-faint">
                  {results.length
                    ? `${String(results.length).padStart(2, "0")} result${results.length === 1 ? "" : "s"}`
                    : "No matches"}
                  {category !== "all" && matches.length !== results.length
                    ? ` of ${String(matches.length).padStart(2, "0")}`
                    : ""}
                </p>
                <div className="search-toolbar-actions">
                  <label className="catalogue-select">
                    <span className="sr-only">Sort results</span>
                    <select value={sort} onChange={(event) => setSort(event.target.value)}>
                      <option value="featured">Best match</option>
                      <option value="name">Name</option>
                      <option value="price-asc">Price · low</option>
                      <option value="price-desc">Price · high</option>
                      <option value="rating">Rating</option>
                    </select>
                  </label>
                  <Link href="/shop" className="text-link">
                    Browse catalogue
                    <ArrowIcon />
                  </Link>
                </div>
              </div>

              {categoryOptions.length > 1 ? (
                <div className="search-suggest search-filters" role="group" aria-label="Filter by category">
                  <button
                    type="button"
                    className={category === "all" ? "is-active" : ""}
                    onClick={() => setCategory("all")}
                  >
                    All · {matches.length}
                  </button>
                  {categoryOptions.map((item) => (
                    <button
                      key={item.slug}
                      type="button"
                      className={category === item.slug ? "is-active" : ""}
                      onClick={() => setCategory(item.slug)}
                    >
                      {item.name} · {item.count}
                    </button>
                  ))}
                </div>
              ) : null}

              {results.length === 0 ? (
                <div className="cart-panel cart-empty search-empty">
                  <span className="cart-empty-icon" aria-hidden="true">
                    <SearchIcon />
                  </span>
                  <p className="label text-faint">No results</p>
                  <h2 className="empty-state-title">Nothing matched “{query}”</h2>
                  <p className="copy mt-3">
                    Check the spelling, try a broader term, or jump to a listed category.
                  </p>
                  <div className="search-suggest search-empty-suggest">
                    {SUGGESTIONS.slice(0, 4).map((term) => (
                      <button key={term} type="button" onClick={() => applySuggestion(term)}>
                        {term}
                      </button>
                    ))}
                  </div>
                  <div className="about-hero-actions">
                    <button type="button" className="btn btn-hero" onClick={clear}>
                      Clear search
                    </button>
                    <Link href="/shop" className="btn btn-hero-ghost">
                      Browse catalogue
                    </Link>
                  </div>
                </div>
              ) : (
                <ProductGrid items={results} />
              )}
            </>
          )}
        </div>
      </section>
    </article>
  );
}
