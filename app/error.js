"use client";

import Link from "next/link";
import SiteShell from "@/components/SiteShell";

export default function Error({ reset }) {
  return (
    <SiteShell>
      <section className="page-section" style={{ paddingTop: "8rem" }}>
        <div className="page-wrap auth-panel">
          <p className="label text-faint">Something went wrong</p>
          <h1 className="display mt-4" style={{ fontSize: "clamp(2rem, 7vw, 3.2rem)" }}>
            This page could not load.
          </h1>
          <p className="copy mt-4">
            A frontend error stopped this view. Try again, or return to the catalogue.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button type="button" className="btn btn-hero" onClick={() => reset()}>
              Try again
            </button>
            <Link href="/shop" className="btn btn-hero-ghost">
              Browse shop
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
