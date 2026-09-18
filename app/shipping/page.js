import LegalPage from "@/components/LegalPage";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Shipping Information",
  description: "How Phil's Pharma research orders are packed and dispatched.",
  path: "/shipping",
});

export default function ShippingPage() {
  return (
    <LegalPage
      kicker="Support"
      title="Shipping information"
      body="How research orders leave the warehouse and what to expect on delivery."
      crumbs={[{ label: "Shipping" }]}
      sections={[
        {
          heading: "Dispatch",
          paragraphs: [
            "Orders are prepared for discreet dispatch in plain outer packaging. Tracked delivery options are offered at checkout once payment systems are connected.",
            "Cut-off times and regional lead times will display dynamically in a later release. This page describes the intended customer experience.",
          ],
        },
        {
          heading: "Packaging",
          paragraphs: [
            "Outer cartons carry no product branding. Inner contents remain labelled for laboratory identification.",
          ],
        },
        {
          heading: "International",
          paragraphs: [
            "Worldwide shipping may be available depending on destination restrictions. Customers are responsible for knowing local research-import rules.",
          ],
        },
      ]}
    />
  );
}
