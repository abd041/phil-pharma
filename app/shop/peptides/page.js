import CategoryPageView from "@/components/CategoryPageView";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Peptides",
  description: "Research-grade peptides with stated strength and format.",
  path: "/shop/peptides",
});

export default function PeptidesPage() {
  return <CategoryPageView slug="peptides" />;
}
