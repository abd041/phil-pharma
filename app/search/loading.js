import SiteShell from "@/components/SiteShell";
import { PageSkeleton } from "@/components/Skeleton";

export default function SearchLoading() {
  return (
    <SiteShell>
      <PageSkeleton />
    </SiteShell>
  );
}
