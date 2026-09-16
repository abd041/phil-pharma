import SiteShell from "@/components/SiteShell";
import PageHero from "@/components/PageHero";
import CategoryTabs from "@/components/CategoryTabs";
import CatalogueBrowser from "@/components/CatalogueBrowser";
import { getProductsByCategory, shopCategories } from "@/lib/data";
import { notFound } from "next/navigation";

export default function CategoryPageView({ slug }) {
  const category = shopCategories.find((item) => item.slug === slug);
  if (!category) notFound();

  const items = getProductsByCategory(slug);

  return (
    <SiteShell>
      <PageHero
        kicker="Catalogue"
        title={category.name}
        body={category.blurb}
        crumbs={[{ href: "/shop", label: "Shop" }, { label: category.name }]}
      />
      <section className="page-section">
        <div className="page-wrap">
          <CategoryTabs active={slug} />
          <CatalogueBrowser items={items} subcategories={category.subcategories || []} />
        </div>
      </section>
    </SiteShell>
  );
}
