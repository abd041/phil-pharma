import SiteShell from "@/components/SiteShell";
import PageHero from "@/components/PageHero";
import CategoryTabs from "@/components/CategoryTabs";
import CatalogueBrowser from "@/components/CatalogueBrowser";
import { products, shopCategories } from "@/lib/data";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Shop — Phil's Pharma",
  description: "Browse research peptides, medications, THC formats, and oils from Phil's Pharma.",
};

export default function ShopPage() {
  return (
    <SiteShell>
      <PageHero
        kicker="Catalogue"
        title="All products"
        body="A clear research catalogue organised by category — peptides, medications, THC formats, and oils."
        crumbs={[{ label: "Shop" }]}
      />

      <section className="page-section">
        <div className="page-wrap">
          <CategoryTabs active="all" />

          <Reveal className="category-cards">
            {shopCategories.map((cat) => (
              <Link key={cat.slug} href={cat.href} className="category-card">
                <p className="label text-faint">{cat.name}</p>
                <p>{cat.blurb}</p>
                <span className="text-link">Shop {cat.name.toLowerCase()}</span>
              </Link>
            ))}
          </Reveal>

          <CatalogueBrowser items={products} />
        </div>
      </section>
    </SiteShell>
  );
}
