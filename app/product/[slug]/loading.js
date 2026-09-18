import SiteShell from "@/components/SiteShell";
import { ProductDetailSkeleton } from "@/components/Skeleton";

export default function ProductLoading() {
  return (
    <SiteShell>
      <ProductDetailSkeleton />
    </SiteShell>
  );
}
