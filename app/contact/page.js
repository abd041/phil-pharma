import SiteShell from "@/components/SiteShell";
import ContactView from "@/components/ContactView";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact us",
  description: "Contact Phil's Pharma about product detail, documentation requests, or dispatch questions.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <SiteShell>
      <ContactView />
    </SiteShell>
  );
}
