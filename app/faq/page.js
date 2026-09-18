import SiteShell from "@/components/SiteShell";
import FaqView from "@/components/FaqView";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "FAQ",
  description: "Common questions about research use, documentation, shipping, and Phil's Pharma accounts.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <SiteShell>
      <FaqView />
    </SiteShell>
  );
}
