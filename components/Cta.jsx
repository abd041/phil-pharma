import Image from "next/image";
import { ArrowIcon } from "./Icons";
import Reveal from "./Reveal";
import SplitTitle from "./SplitTitle";

export default function Cta() {
  return (
    <section id="verify" className="close-stage" data-inview>
      <div className="close-stage-bg" aria-hidden="true">
        <Image
          src="/images/hero-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[center_80%]"
        />
      </div>
      <div className="close-stage-glow" aria-hidden="true" />

      <div className="page-wrap close-stage-inner">
        <Reveal variant="stagger">
          <p className="standard-kicker">
            <span className="standard-kicker-line" aria-hidden="true" />
            Ready when you are
          </p>
        </Reveal>

        <Reveal variant="stagger" className="close-stage-grid">
          <SplitTitle className="display rest-title">Order with the details in view.</SplitTitle>
          <div>
            <p className="copy rest-lead">
              Explore research peptides, preparation kits, and practical lab accessories from one
              discreet source.
            </p>
            <div className="close-stage-actions">
              <a href="#catalogue" className="btn btn-hero">
                View all products
                <ArrowIcon />
              </a>
              <a href="#support" className="btn btn-hero-ghost">
                Contact our team
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="page-wrap site-close-bar close-stage-footer">
        <a href="/" className="site-close-logo" aria-label="Phil's Pharma home">
          <span>
            <Image
              src="/images/logo.jpeg"
              alt="Phil's Pharma"
              fill
              sizes="178px"
              className="logo-mark object-cover object-center"
            />
          </span>
        </a>
        <p className="site-close-mark">Science × Quality × Progress</p>
        <p className="site-close-end">
          <span>Research today</span>
          <span>A brighter tomorrow</span>
        </p>
      </div>
    </section>
  );
}
