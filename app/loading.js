import SiteShell from "@/components/SiteShell";
import { PageSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <SiteShell>
      <PageSkeleton />
    </SiteShell>
  );
}
