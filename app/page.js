import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Standard from "@/components/Standard";
import Featured from "@/components/Featured";
import Constants from "@/components/Constants";
import Story from "@/components/Story";
import Process from "@/components/Process";
import Cta from "@/components/Cta";
import SiteFooter from "@/components/SiteFooter";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Phil's Pharma — Pure. Potent. Performance.",
  description:
    "Research peptides and lab essentials with straightforward product information, batch documentation on request, and discreet UK dispatch.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Standard />
        <Featured />
        <Constants />
        <Story />
        <Process />
        <Cta />
      </main>
      <SiteFooter />
    </>
  );
}
