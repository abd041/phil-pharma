import Link from "next/link";
import { shopCategories } from "@/lib/data";

export default function CategoryTabs({ active = "all" }) {
  const tabs = [{ slug: "all", name: "All products", href: "/shop" }, ...shopCategories];

  return (
    <div className="category-tabs" role="tablist" aria-label="Product categories">
      {tabs.map((tab) => {
        const current = tab.slug === active;
        return (
          <Link
            key={tab.slug}
            href={tab.href}
            role="tab"
            aria-selected={current}
            className={`category-tab ${current ? "is-active" : ""}`}
          >
            {tab.name}
          </Link>
        );
      })}
    </div>
  );
}
