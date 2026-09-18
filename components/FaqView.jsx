import Link from "next/link";
import Reveal from "@/components/Reveal";
import SplitTitle from "@/components/SplitTitle";
import FaqList from "@/components/FaqList";
import { ArrowIcon, LockIcon, TruckIcon } from "@/components/Icons";
import { SHIPPING_LABEL } from "@/lib/data";

const stats = [
  { value: "None", label: "Minimum order" },
  { value: "£8", label: "Tracked 24hr" },
  { value: "14 days", label: "Unopened returns" },
  { value: "Research", label: "Use only" },
];

export default function FaqView() {
  return (
    <article className="faq-page">
      <header className="about-hero">
        <div className="page-wrap">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>FAQ</span>
          </nav>

          <Reveal variant="stagger" className="about-hero-copy">
            <p className="standard-kicker">
              <span className="standard-kicker-line" aria-hidden="true" />
              Support
            </p>
            <SplitTitle className="display rest-title about-hero-title">
              Answers before you <span>order.</span>
            </SplitTitle>
            <p className="copy rest-lead about-hero-lead">
              Shipping, catalogue options, research use, and documents — stated the same way they
              appear on the product pages.
            </p>
            <div className="about-hero-actions">
              <Link href="/contact" className="btn btn-hero">
                Contact the team
                <ArrowIcon />
              </Link>
              <Link href="/shop" className="btn btn-hero-ghost">
                Browse catalogue
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
        <div className="page-wrap faq-layout">
          <FaqList />

          <aside className="cart-summary faq-aside">
            <p className="label text-faint">Still looking?</p>
            <p className="cart-summary-kicker">Ask the team</p>
            <p className="copy faq-aside-copy">
              Product detail, batch documents, and dispatch questions go through Contact. Include
              the product name if you have it.
            </p>
            <Link href="/contact" className="btn btn-hero w-full">
              Contact us
              <ArrowIcon />
            </Link>
            <Link href="/shipping" className="btn btn-hero-ghost w-full">
              Shipping information
            </Link>
            <ul className="cart-trust">
              <li>
                <TruckIcon className="h-4 w-4" />
                {SHIPPING_LABEL} · No minimum order
              </li>
              <li>
                <LockIcon className="h-4 w-4" />
                Research use only · not for human consumption
              </li>
            </ul>
          </aside>
        </div>
      </section>
    </article>
  );
}
