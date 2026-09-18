import { products, shopCategories } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

const PUBLIC_PATHS = [
  "/",
  "/shop",
  "/shop/peptides",
  "/shop/medications",
  "/shop/thc",
  "/shop/oils",
  "/shop/ped",
  "/shop/accessories",
  "/search",
  "/about",
  "/faq",
  "/contact",
  "/shipping",
  "/returns",
  "/privacy",
  "/terms",
];

export default function sitemap() {
  const lastModified = new Date();

  const pages = PUBLIC_PATHS.map((path) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: path === "/" || path.startsWith("/shop") ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/shop") ? 0.8 : 0.6,
  }));

  const categories = shopCategories.map((category) => ({
    url: `${SITE_URL}${category.href}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const productPages = products.map((product) => ({
    url: `${SITE_URL}/product/${product.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const seen = new Set();
  return [...pages, ...categories, ...productPages].filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
}
