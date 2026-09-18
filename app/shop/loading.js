import SiteShell from "@/components/SiteShell";
import { ProductGridSkeleton } from "@/components/Skeleton";

export default function ShopLoading() {
  return (
    <SiteShell>
      <section className="page-section" style={{ paddingTop: "7rem" }}>
        <div className="page-wrap">
          <p className="sr-only">Loading catalogue</p>
          <div className="skeleton-line skeleton-title" />
          <div className="skeleton-line skeleton-line-sm mt-4" />
          <ProductGridSkeleton count={8} />
        </div>
      </section>
    </SiteShell>
  );
}
