import Image from "next/image";
import SplitTitle from "./SplitTitle";
import Reveal from "./Reveal";
import {
  ArrowIcon,
  ChevronDownIcon,
  FlaskIcon,
  LockIcon,
  ShieldIcon,
  TruckIcon,
} from "./Icons";

const stats = [
  { value: "99%+", label: "Purity tested" },
  { value: "Global", label: "Discreet shipping" },
  { value: "1000+", label: "Researchers" },
];

const trusts = [
  { icon: ShieldIcon, title: "Lab tested", body: "Verified Purity" },
  { icon: TruckIcon, title: "Discreet delivery", body: "Worldwide Shipping" },
  { icon: LockIcon, title: "Secure checkout", body: "Your Privacy First" },
  { icon: FlaskIcon, title: "Research only", body: "Not for Human Use" },
];

function CircleMark() {
  return (
    <svg className="hero-circle" viewBox="0 0 200 200" aria-hidden="true">
      <defs>
        <path
          id="hero-orbit"
          d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0"
        />
      </defs>
      <text className="hero-circle-text">
        <textPath href="#hero-orbit" startOffset="0%">
          SCIENCE DRIVES · A BRIGHTER TOMORROW · SCIENCE DRIVES ·
        </textPath>
      </text>
      <line x1="68" y1="100" x2="132" y2="100" stroke="#1677FF" strokeWidth="1.4" />
    </svg>
  );
}

function ProductStage() {
  return (
    <div className="hero-stage">
      <div className="hero-circle-wrap">
        <CircleMark />
      </div>

      <div className="hero-parallax">
        <div className="hero-products">
          <Image
            src="/images/hero-products.png"
            alt="Phil's Pharma Glutathione vial, research box, and precision pen"
            fill
            priority
            sizes="(max-width: 1024px) 90vw, 52vw"
            className="object-contain object-center"
          />
        </div>
      </div>

      <p className="hero-stage-caption">
        <span>Research today</span>
        <span>A brighter tomorrow</span>
      </p>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="cinematic-hero">
      <div className="hero-bg" aria-hidden="true">
        <Image
          src="/images/hero-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[68%_center]"
        />
      </div>
      <div className="hero-shimmer" aria-hidden="true">
        <span className="hero-shimmer-glow" />
        <span className="hero-shimmer-core" />
        <span className="hero-shimmer-dust" />
      </div>
      <div className="hero-light" aria-hidden="true" />

      <div className="hero-wrap cinematic-hero-inner">
        <div className="cinematic-hero-grid">
          <Reveal variant="stagger" className="cinematic-copy">
            <p className="hero-enter hero-eyebrow" style={{ animationDelay: "80ms" }}>
              <span>Premium research peptides</span>
              <span className="hero-eyebrow-line" aria-hidden="true" />
            </p>

            <SplitTitle as="h1" className="hero-title">
              <span>Pure science.</span>
              <span className="hero-title-accent">Real results.</span>
            </SplitTitle>

            <p className="hero-enter hero-body" style={{ animationDelay: "480ms" }}>
              High purity research peptides for those who know what they&apos;re ordering.
              Trusted quality. Discreet delivery. No compromise.
            </p>

            <div className="hero-enter hero-actions" style={{ animationDelay: "580ms" }}>
              <a href="/shop/peptides" className="btn btn-hero">
                Shop peptides
                <ArrowIcon />
              </a>
              <a href="/about" className="btn btn-hero-ghost">
                Learn more
              </a>
            </div>

            <dl className="hero-enter hero-stats" style={{ animationDelay: "680ms" }}>
              {stats.map((item) => (
                <div key={item.label} className="hero-stat">
                  <dt>{item.value}</dt>
                  <dd>{item.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.08} variant="scale" className="hero-stage-enter">
            <ProductStage />
          </Reveal>
        </div>

        <Reveal variant="stagger">
          <p className="hero-enter hero-scroll" style={{ animationDelay: "760ms" }}>
            <ChevronDownIcon />
            <span>Scroll to explore</span>
          </p>
        </Reveal>
      </div>

      <Reveal variant="stagger" className="hero-trust">
        <div className="hero-wrap hero-trust-grid">
          {trusts.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="hero-trust-item">
                <Icon className="h-[18px] w-[18px] text-white/55" />
                <div>
                  <p>{item.title}</p>
                  <p>{item.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
