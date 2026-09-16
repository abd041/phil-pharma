"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import PageHero from "@/components/PageHero";
import ProductGrid from "@/components/ProductGrid";
import { searchProducts } from "@/lib/data";
import { SearchIcon } from "@/components/Icons";

export default function SearchPage() {
  const [query, setQuery] = useState("peptide");
  const results = useMemo(() => searchProducts(query), [query]);

  return (
    <SiteShell>
      <PageHero
        kicker="Search"
        title="Search results"
        body="Find research peptides, medications, oils, and accessories by name or category."
        crumbs={[{ label: "Search" }]}
      />

      <section className="page-section">
        <div className="page-wrap">
          <form
            className="search-form"
            onSubmit={(event) => event.preventDefault()}
            role="search"
          >
            <label className="sr-only" htmlFor="site-search">
              Search products
            </label>
            <div className="search-field">
              <SearchIcon />
              <input
                id="site-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search peptides, oils, pens…"
              />
            </div>
            <button type="submit" className="btn btn-hero">
              Search
            </button>
          </form>

          <div className="catalogue-toolbar">
            <p className="label text-faint">
              {results.length ? `${String(results.length).padStart(2, "0")} results` : "No matches"}
            </p>
            <Link href="/shop" className="text-link">
              Browse catalogue
            </Link>
          </div>

          <ProductGrid items={results} />
        </div>
      </section>
    </SiteShell>
  );
}
