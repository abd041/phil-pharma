import SiteShell from "@/components/SiteShell";
import ProductDetailClient from "@/components/ProductDetailClient";
import { getProductBySlug, products } from "@/lib/data";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product — Phil's Pharma" };
  return {
    title: `${product.name} — Phil's Pharma`,
    description: product.description,
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 4);

  return (
    <SiteShell>
      <ProductDetailClient product={product} related={related} />
    </SiteShell>
  );
}
