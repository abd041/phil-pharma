import ProductCard from "./ProductCard";
import Reveal from "./Reveal";

export default function ProductGrid({ items }) {
  if (!items.length) {
    return (
      <div className="empty-state">
        <p className="label text-faint">No products</p>
        <p className="copy mt-3">Nothing matched this filter. Try another category or clear stock filters.</p>
      </div>
    );
  }

  return (
    <div className="product-cards">
      {items.map((product, index) => (
        <Reveal key={product.id} delay={index * 0.06} variant="scale">
          <ProductCard product={product} index={index} />
        </Reveal>
      ))}
    </div>
  );
}
