import SiteShell from "@/components/SiteShell";
import ProductDetailClient from "@/components/ProductDetailClient";
import ProductJsonLd from "@/components/ProductJsonLd";
import { getProductBySlug, products } from "@/lib/data";
import { getRelatedProducts } from "@/lib/merchandising";
import { pageMetadata } from "@/lib/site";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return pageMetadata({ title: "Product", path: `/product/${slug}` });
  return pageMetadata({
    title: product.name,
    description: product.description,
    path: `/product/${product.slug}`,
    image: product.image,
    type: "website",
  });
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product, products);

  return (
    <SiteShell>
      <ProductJsonLd product={product} />
      <ProductDetailClient product={product} related={related} />
    </SiteShell>
  );
}
