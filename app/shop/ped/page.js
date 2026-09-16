import CategoryPageView from "@/components/CategoryPageView";

export const metadata = {
  title: "PED — Phil's Pharma",
  description: "Oils, orals, and ready-to-use pens from the PED catalogue.",
};

export default function PedShopPage() {
  return <CategoryPageView slug="ped" />;
}
