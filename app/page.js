import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Standard from "@/components/Standard";
import Featured from "@/components/Featured";
import Constants from "@/components/Constants";
import Story from "@/components/Story";
import Process from "@/components/Process";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";

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
      <Footer />
    </>
  );
}
