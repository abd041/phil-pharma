import LegalPage from "@/components/LegalPage";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Terms & Conditions",
  description: "Terms governing use of the Phil's Pharma website and research catalogue.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      kicker="Legal"
      title="Terms & conditions"
      body="Terms governing use of the Phil's Pharma website and research catalogue."
      crumbs={[{ label: "Terms" }]}
      sections={[
        {
          heading: "Research use only",
          paragraphs: [
            "All products are supplied strictly for laboratory and research purposes. They are not for human consumption, veterinary use, or household application.",
            "By placing an order you confirm you are purchasing as a research customer and will handle materials accordingly.",
          ],
        },
        {
          heading: "Accounts & orders",
          paragraphs: [
            "Account access, pricing, and stock information may change. Orders are subject to acceptance and availability.",
          ],
        },
        {
          heading: "Liability",
          paragraphs: [
            "Phil's Pharma is not liable for misuse of research materials. Customers are responsible for compliant handling, storage, and local regulations.",
          ],
        },
        {
          heading: "Frontend phase",
          paragraphs: [
            "Checkout, login, and account flows on this build are UI previews. Binding transactions begin when backend systems are connected.",
          ],
        },
      ]}
    />
  );
}
