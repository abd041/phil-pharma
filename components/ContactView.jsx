import Link from "next/link";
import Reveal from "@/components/Reveal";
import SplitTitle from "@/components/SplitTitle";
import ContactForm from "@/components/ContactForm";
import { ArrowIcon, FlaskIcon, LockIcon, PinIcon, TruckIcon } from "@/components/Icons";
import { SHIPPING_LABEL } from "@/lib/data";

const stats = [
  { value: "Mon–Fri", label: "09:00–17:00 UK" },
  { value: "Email", label: "support@philspharma.com" },
  { value: "Docs", label: "On request" },
  { value: "Research", label: "Use only" },
];

const helpItems = [
  { icon: FlaskIcon, title: "Product detail", body: "Strength, format, and listed variants." },
  { icon: LockIcon, title: "Batch documents", body: "COA and records on a dedicated channel." },
  { icon: TruckIcon, title: "Dispatch", body: `${SHIPPING_LABEL} and plain packaging.` },
];

export default function ContactView() {
  return (
    <article className="contact-page">
      <header className="about-hero">
        <div className="page-wrap">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Contact</span>
          </nav>

          <Reveal variant="stagger" className="about-hero-copy">
            <p className="standard-kicker">
              <span className="standard-kicker-line" aria-hidden="true" />
              Support
            </p>
            <SplitTitle className="display rest-title about-hero-title">
              Write with the details <span>in view.</span>
            </SplitTitle>
            <p className="copy rest-lead about-hero-lead">
              Product information, batch documents, and dispatch questions. Research use only — we
              do not provide medical advice.
            </p>
            <div className="about-hero-actions">
              <a href="mailto:support@philspharma.com" className="btn btn-hero">
                Email support
                <ArrowIcon />
              </a>
              <Link href="/faq" className="btn btn-hero-ghost">
                Read the FAQ
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
        <div className="page-wrap contact-layout">
          <ContactForm />

          <aside className="cart-summary faq-aside">
            <p className="label text-faint">Direct</p>
            <a className="cart-summary-kicker contact-mail" href="mailto:support@philspharma.com">
              support@philspharma.com
            </a>
            <p className="copy faq-aside-copy">
              We respond on listed products, documentation channels, and shipping. Include the
              product name when you have it.
            </p>
            <p className="label text-faint">Hours</p>
            <p className="contact-hours">
              <PinIcon className="h-4 w-4" />
              Mon–Fri · 09:00–17:00 UK
            </p>
            <ul className="contact-help">
              {helpItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.title}>
                    <span>
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p>{item.title}</p>
                      <p>{item.body}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
            <Link href="/faq" className="btn btn-hero w-full">
              Browse FAQ
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
