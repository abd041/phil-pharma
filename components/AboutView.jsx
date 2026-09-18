import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SplitTitle from "@/components/SplitTitle";
import {
  ArrowIcon,
  CartIcon,
  FlaskIcon,
  ListIcon,
  LockIcon,
  PackageIcon,
  PinIcon,
  ShieldIcon,
  TruckIcon,
} from "@/components/Icons";
import { constants, processSteps, SHIPPING_LABEL, shopCategories, standards } from "@/lib/data";

const principleIcons = [ShieldIcon, FlaskIcon, PackageIcon];
const constantIcons = [FlaskIcon, TruckIcon, ListIcon, LockIcon];
const processIcons = [ListIcon, CartIcon, PinIcon];

const stats = [
  { value: "£8", label: "Tracked 24hr" },
  { value: "None", label: "Minimum order" },
  { value: "On request", label: "Batch documents" },
  { value: "Research", label: "Use only" },
];

export default function AboutView() {
  return (
    <article className="about-page">
      <header className="about-hero">
        <div className="page-wrap">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>About</span>
          </nav>

          <Reveal variant="stagger" className="about-hero-copy">
            <p className="standard-kicker">
              <span className="standard-kicker-line" aria-hidden="true" />
              The house
            </p>
            <SplitTitle className="display rest-title about-hero-title">
              Research supply, <span>stated clearly.</span>
            </SplitTitle>
            <p className="copy rest-lead about-hero-lead">
              Phil&apos;s Pharma is built for laboratory and research customers who already know what
              they are ordering. Strength, format, and stock sit on the product — before checkout, not
              after.
            </p>
            <div className="about-hero-actions">
              <Link href="/shop" className="btn btn-hero">
                Browse catalogue
                <ArrowIcon />
              </Link>
              <Link href="/contact" className="btn btn-hero-ghost">
                Contact the team
              </Link>
            </div>
          </Reveal>

          <ul className="about-stats">
            {stats.map((item) => (
              <li key={item.label}>
                <p>{item.value}</p>
                <p>{item.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </header>

      <section className="about-section">
        <div className="page-wrap about-split">
          <Reveal variant="scale" className="about-media">
            <Image
              src="/images/story-essentials-v3.png"
              alt="Phil's Pharma research vial with laboratory glassware"
              width={900}
              height={900}
              sizes="(max-width: 1024px) 88vw, 38vw"
            />
          </Reveal>
          <Reveal variant="from-right" className="about-split-copy">
            <p className="standard-kicker">
              <span className="standard-kicker-line" aria-hidden="true" />
              Who we serve
            </p>
            <SplitTitle className="display rest-title">
              Know the compound. <span>We handle the rest.</span>
            </SplitTitle>
            <p className="copy rest-lead">
              We do not sell a story. We list what is on the client menus — vials, pens, nasals, oils,
              medications, and accessories — with the options visible up front.
            </p>
            <p className="copy rest-lead">
              Every product is supplied for research and informational use only. Nothing here is
              medical advice, and nothing is intended for human consumption.
            </p>
            <Link href="/shop/peptides" className="text-link">
              Start with peptides
              <ArrowIcon />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="about-section">
        <div className="page-wrap">
          <Reveal variant="stagger" className="about-section-head">
            <p className="standard-kicker">
              <span className="standard-kicker-line" aria-hidden="true" />
              How we work
            </p>
            <SplitTitle className="display rest-title">
              Details should never be <span>an afterthought.</span>
            </SplitTitle>
          </Reveal>
          <div className="about-principles">
            {standards.map((item, index) => {
              const Icon = principleIcons[index] || ShieldIcon;
              return (
                <Reveal key={item.id} delay={index * 0.08} variant="scale">
                  <article className="about-principle">
                    <span className="about-principle-icon">
                      <Icon />
                    </span>
                    <p className="label text-faint">{item.id}</p>
                    <h2>{item.title}</h2>
                    <p>{item.body}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="about-section about-section-band">
        <div className="page-wrap">
          <Reveal variant="stagger" className="about-section-head">
            <p className="standard-kicker">
              <span className="standard-kicker-line" aria-hidden="true" />
              Operating standard
            </p>
            <SplitTitle className="display rest-title">
              Quiet process. <span>Visible facts.</span>
            </SplitTitle>
          </Reveal>
          <ul className="about-constants">
            {constants.map((item, index) => {
              const Icon = constantIcons[index] || ShieldIcon;
              return (
                <li key={item.id}>
                  <span className="about-constant-icon">
                    <Icon />
                  </span>
                  <p>{item.title}</p>
                  <p>{item.body}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="about-section">
        <div className="page-wrap about-flow">
          <Reveal variant="stagger" className="about-flow-copy">
            <p className="standard-kicker">
              <span className="standard-kicker-line" aria-hidden="true" />
              From order to door
            </p>
            <SplitTitle className="display rest-title">
              A supply path <span>without the fog.</span>
            </SplitTitle>
            <p className="copy rest-lead">
              Select from a clear catalogue, add what you need, and receive {SHIPPING_LABEL} with
              plain outer packaging. Documentation stays on a dedicated channel when you request it.
            </p>
          </Reveal>
          <ol className="about-process">
            {processSteps.map((step, index) => {
              const Icon = processIcons[index] || ListIcon;
              return (
                <li key={step.id}>
                  <span className="about-process-icon">
                    <Icon />
                  </span>
                  <p className="label text-faint">{step.id}</p>
                  <h2>{step.title}</h2>
                  <p>{step.body}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="about-section">
        <div className="page-wrap">
          <Reveal variant="stagger" className="about-section-head">
            <p className="standard-kicker">
              <span className="standard-kicker-line" aria-hidden="true" />
              Catalogue
            </p>
            <SplitTitle className="display rest-title">
              Shop by the same menus <span>we list from.</span>
            </SplitTitle>
          </Reveal>
          <div className="about-categories">
            {shopCategories.map((category, index) => (
              <Reveal key={category.slug} delay={index * 0.06} variant="scale">
                <Link href={category.href} className="about-category">
                  <p className="label text-faint">{String(index + 1).padStart(2, "0")}</p>
                  <h2>{category.name}</h2>
                  <p>{category.blurb}</p>
                  <span className="text-link">
                    View {category.name.toLowerCase()}
                    <ArrowIcon />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="page-wrap">
          <aside className="about-notice">
            <p className="label text-faint">Research notice</p>
            <p>
              Products are sold for laboratory and research purposes only. They are not medicines,
              not dietary supplements, and not for human or veterinary use. Always follow your
              institution&apos;s handling protocols.
            </p>
            <div className="about-notice-links">
              <Link href="/shipping">Shipping</Link>
              <Link href="/returns">Returns</Link>
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="about-close">
        <div className="page-wrap about-close-inner">
          <Reveal variant="stagger">
            <p className="standard-kicker">
              <span className="standard-kicker-line" aria-hidden="true" />
              Ready when you are
            </p>
            <SplitTitle className="display rest-title">Order with the details in view.</SplitTitle>
            <p className="copy rest-lead">
              Explore the catalogue, or ask the team about a listed product, batch documents, or
              dispatch.
            </p>
            <div className="about-hero-actions">
              <Link href="/shop" className="btn btn-hero">
                View all products
                <ArrowIcon />
              </Link>
              <Link href="/contact" className="btn btn-hero-ghost">
                Contact us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
