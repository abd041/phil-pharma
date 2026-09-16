import CategoryPageView from "@/components/CategoryPageView";

export const metadata = {
  title: "Medications — Phil's Pharma",
  description: "Lab-focused compounds listed with clear product detail.",
};

export default function MedicationsPage() {
  return <CategoryPageView slug="medications" />;
}
