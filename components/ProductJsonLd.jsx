import { absoluteUrl, SITE_NAME } from "@/lib/site";

export default function ProductJsonLd({ product }) {
  if (!product) return null;

  const offers = (product.variants || []).map((variant) => ({
    "@type": "Offer",
    name: variant.label,
    price: variant.price,
    priceCurrency: "GBP",
    availability:
      variant.stock === "Out of stock"
        ? "https://schema.org/OutOfStock"
        : "https://schema.org/InStock",
    url: absoluteUrl(`/product/${product.slug}`),
  }));

  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.longDescription || product.description,
    image: [absoluteUrl(product.image)],
    sku: product.id,
    brand: {
      "@type": "Brand",
      name: product.brand || SITE_NAME,
    },
    category: product.subcategoryLabel || product.category,
    offers: offers.length === 1 ? offers[0] : offers,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
