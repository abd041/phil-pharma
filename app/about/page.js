import SiteShell from "@/components/SiteShell";
import AboutView from "@/components/AboutView";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "Phil's Pharma supplies research peptides and lab essentials with clear product detail, discreet tracked dispatch, and documentation on request.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <SiteShell>
      <AboutView />
    </SiteShell>
  );
}
