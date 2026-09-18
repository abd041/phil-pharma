import Image from "next/image";
import { ArrowIcon } from "./Icons";
import Reveal from "./Reveal";
import SplitTitle from "./SplitTitle";

const kitLines = [
  { id: "01", label: "Research peptides", detail: "Specified strength and format" },
  { id: "02", label: "Precision pens", detail: "Measured laboratory preparation" },
  { id: "03", label: "Protective cases", detail: "Pens, vials, and documentation" },
];

export default function Story() {
  return (
    <>
      <section id="essentials" className="split-band split-band-stack">
        <div className="split-band-grid">
          <Reveal variant="scale" className="split-band-frame">
            <div className="split-band-media">
              <Image
                src="/images/story-essentials-v3.png"
                alt="Phil's Pharma Growth Hormone 10 IU with laboratory glassware"
                fill
                sizes="(max-width: 1024px) 70vw, 26rem"
                className="object-contain object-center"
              />
            </div>
          </Reveal>
          <Reveal variant="from-right" className="split-band-copy">
            <p className="standard-kicker">
              <span className="standard-kicker-line" aria-hidden="true" />
              Transparent supply
            </p>
            <SplitTitle className="display rest-title">
              Know what you <span>are ordering.</span>
            </SplitTitle>
            <p className="copy rest-lead">
              From product details to research documentation, we make it simple to verify exactly what
              you&apos;re receiving.
            </p>
            <a href="/shop" className="text-link">
              View product details
              <ArrowIcon />
            </a>
          </Reveal>
        </div>
      </section>

      <section id="kit" className="split-band split-band-kit">
        <div className="split-band-kit-grid">
          <Reveal variant="stagger" className="split-band-kit-copy">
            <p className="standard-kicker">
              <span className="standard-kicker-line" aria-hidden="true" />
              Complete your setup
            </p>
            <SplitTitle className="display rest-title">
              Build a more <span>complete order.</span>
            </SplitTitle>
            <p className="copy rest-lead">
              From research peptides to research documentation and accessories, everything you need in
              one place.
            </p>
            <ul className="kit-lines">
              {kitLines.map((line) => (
                <li key={line.id}>
                  <span>{line.id}</span>
                  <div>
                    <p>{line.label}</p>
                    <p>{line.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
            <a href="/shop/ped" className="text-link">
              View product details
              <ArrowIcon />
            </a>
          </Reveal>
          <Reveal delay={0.1} variant="clip" className="split-band-kit-media">
            <Image
              src="/images/story-kit-vial.jpg"
              alt="Phil's Pharma Growth Hormone 10 IU research vial"
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="kit-photo"
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
