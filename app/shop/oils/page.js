import CategoryPageView from "@/components/CategoryPageView";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Oils",
  description:
    "Injectable oils from Morph Labs, Hulk Labs, and Crown — all 10ml as listed on the Phil's Pharma client menu.",
  path: "/shop/oils",
});

export default function OilsShopPage() {
  return <CategoryPageView slug="oils" />;
}
