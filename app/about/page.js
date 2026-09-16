import SiteShell from "@/components/SiteShell";
import PageHero from "@/components/PageHero";
import { standards, constants } from "@/lib/data";
import Reveal from "@/components/Reveal";
import Link from "next/link";

export const metadata = {
  title: "About Us — Phil's Pharma",
  description: "Phil's Pharma supplies research peptides and lab essentials with clear product detail.",
};

export default function AboutPage() {
  return (
    <SiteShell>
      <PageHero
        kicker="About"
        title="Built for clear research supply"
        body="Phil's Pharma exists to make research purchasing straightforward — stated product detail, discreet dispatch, and documentation when you need it."
        crumbs={[{ label: "About" }]}
      />

      <section className="page-section">
        <div className="page-wrap prose-panel">
          <Reveal variant="stagger">
            <p className="copy">
              We focus on laboratory and research customers who already know what they are ordering.
              Strength, format, and stock status appear at product level before checkout — not after.
            </p>
            <p className="copy mt-4">
              Every vial, kit, and accessory is supplied for research use only and is not intended for
              human consumption. Plain packaging and tracked delivery options keep the process quiet and
              practical.
            </p>
          </Reveal>

          <div className="about-points">
            {standards.map((item) => (
              <article key={item.id} className="account-card">
                <p className="label text-faint">{item.id}</p>
                <h2 className="mt-3 text-lg">{item.title}</h2>
                <p className="copy mt-2">{item.body}</p>
              </article>
            ))}
          </div>

          <div className="about-points mt-6">
            {constants.map((item) => (
              <article key={item.id} className="account-card">
                <p className="label text-faint">{item.id}</p>
                <h2 className="mt-3 text-lg">{item.title}</h2>
                <p className="copy mt-2">{item.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/shop" className="btn btn-hero">
              Browse catalogue
            </Link>
            <Link href="/contact" className="btn btn-hero-ghost">
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
