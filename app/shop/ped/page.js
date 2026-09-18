import CategoryPageView from "@/components/CategoryPageView";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "PED",
  description: "Oils, orals, and ready-to-use pens from the PED catalogue.",
  path: "/shop/ped",
});

export default function PedShopPage() {
  return <CategoryPageView slug="ped" />;
}
