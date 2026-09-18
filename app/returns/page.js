import LegalPage from "@/components/LegalPage";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Returns / Refund Policy",
  description: "How return requests are reviewed for unopened research products.",
  path: "/returns",
});

export default function ReturnsPage() {
  return (
    <LegalPage
      kicker="Support"
      title="Returns & refunds"
      body="How return requests are reviewed for unopened research products."
      crumbs={[{ label: "Returns" }]}
      sections={[
        {
          heading: "Eligibility",
          paragraphs: [
            "Unopened research products may be considered for return within 14 days of delivery, subject to inspection and local regulations.",
            "Opened vials, compromised cold-chain items, and custom documentation packages are generally excluded.",
          ],
        },
        {
          heading: "Process",
          paragraphs: [
            "Contact support with your order reference. Approved returns receive a prepaid label where applicable. Refunds are issued to the original payment method once received.",
          ],
        },
        {
          heading: "UI note",
          paragraphs: [
            "Refund processing is not live in this frontend phase. The policy text establishes the customer-facing rules for the full product.",
          ],
        },
      ]}
    />
  );
}
