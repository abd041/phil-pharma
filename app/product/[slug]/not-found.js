import Link from "next/link";
import SiteShell from "@/components/SiteShell";

export default function ProductNotFound() {
  return (
    <SiteShell>
      <section className="page-section" style={{ paddingTop: "8rem" }}>
        <div className="page-wrap auth-panel">
          <p className="label text-faint">Product</p>
          <h1 className="display mt-4" style={{ fontSize: "clamp(2rem, 7vw, 3.2rem)" }}>
            This product could not be found.
          </h1>
          <p className="copy mt-4">
            It may have been removed from the catalogue, or the link is out of date.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/shop" className="btn btn-hero">
              Browse catalogue
            </Link>
            <Link href="/search" className="btn btn-hero-ghost">
              Search products
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
