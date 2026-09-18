export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="product-cards" aria-hidden="true">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="product-card skeleton-card">
          <div className="skeleton-block skeleton-media" />
          <div className="product-card-body">
            <div className="skeleton-line" />
            <div className="skeleton-line skeleton-line-sm" />
            <div className="skeleton-line skeleton-line-xs" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <section className="page-section product-detail" aria-hidden="true">
      <div className="page-wrap product-detail-grid">
        <div className="product-detail-media skeleton-block" />
        <div className="product-detail-copy">
          <div className="skeleton-line skeleton-line-xs" />
          <div className="skeleton-line skeleton-title" />
          <div className="skeleton-line" />
          <div className="skeleton-line skeleton-line-sm" />
          <div className="skeleton-line skeleton-line-sm" />
        </div>
      </div>
    </section>
  );
}

export function PageSkeleton() {
  return (
    <section className="page-section" aria-busy="true" aria-live="polite">
      <div className="page-wrap">
        <p className="sr-only">Loading</p>
        <div className="skeleton-line skeleton-title" />
        <div className="skeleton-line skeleton-line-sm mt-4" />
        <ProductGridSkeleton />
      </div>
    </section>
  );
}
