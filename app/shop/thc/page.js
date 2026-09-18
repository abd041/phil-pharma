import CategoryPageView from "@/components/CategoryPageView";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "THC",
  description: "Research THC formats for controlled laboratory use.",
  path: "/shop/thc",
});

export default function ThcPage() {
  return <CategoryPageView slug="thc" />;
}
