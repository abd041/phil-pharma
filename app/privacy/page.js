import LegalPage from "@/components/LegalPage";

export const metadata = {
  title: "Privacy Policy — Phil's Pharma",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      kicker="Legal"
      title="Privacy policy"
      body="How Phil's Pharma intends to handle account and order information."
      crumbs={[{ label: "Privacy" }]}
      sections={[
        {
          heading: "Data we collect",
          paragraphs: [
            "Account details, order history, shipping addresses, and support messages are collected to fulfil research supply requests.",
            "Payment details will be processed by a certified provider when payments go live. Card data is not stored in this UI mock.",
          ],
        },
        {
          heading: "Use of information",
          paragraphs: [
            "We use information to process orders, respond to documentation requests, prevent fraud, and improve the catalogue experience.",
          ],
        },
        {
          heading: "Your rights",
          paragraphs: [
            "Depending on jurisdiction, you may request access, correction, or deletion of personal data by contacting support@philspharma.com.",
          ],
        },
      ]}
    />
  );
}
