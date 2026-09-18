import CategoryPageView from "@/components/CategoryPageView";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Medications",
  description: "Lab-focused compounds listed with clear product detail.",
  path: "/shop/medications",
});

export default function MedicationsPage() {
  return <CategoryPageView slug="medications" />;
}
