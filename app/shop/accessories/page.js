import CategoryPageView from "@/components/CategoryPageView";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Accessories",
  description: "Batteries, syringe packs, and accessories.",
  path: "/shop/accessories",
});

export default function AccessoriesShopPage() {
  return <CategoryPageView slug="accessories" />;
}
