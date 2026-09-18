import Link from "next/link";
import Reveal from "@/components/Reveal";
import SplitTitle from "@/components/SplitTitle";
import RegisterForm from "@/components/RegisterForm";
import { ArrowIcon, FlaskIcon, LockIcon, PackageIcon, ShieldIcon } from "@/components/Icons";

const stats = [
  { value: "Orders", label: "Saved in this browser" },
  { value: "Wishlist", label: "Keep listed products" },
  { value: "8 chars", label: "Minimum password" },
  { value: "Research", label: "Use only" },
];

const perks = [
  { icon: PackageIcon, title: "Order history", body: "Preview mock checkouts after you place them." },
  { icon: ShieldIcon, title: "Account details", body: "Name, email, and address fields ready for live auth." },
  { icon: FlaskIcon, title: "Research customers", body: "The catalogue stays laboratory-use. No medical advice." },
];

export default function RegisterView() {
  return (
    <article className="register-page">
      <header className="about-hero">
        <div className="page-wrap">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Register</span>
          </nav>

          <Reveal variant="stagger" className="about-hero-copy">
            <p className="standard-kicker">
              <span className="standard-kicker-line" aria-hidden="true" />
              Account
            </p>
            <SplitTitle className="display rest-title about-hero-title">
              Create your place in <span>the house.</span>
            </SplitTitle>
            <p className="copy rest-lead about-hero-lead">
              Research customers only. Open an account preview to keep orders and saved items in
              this browser — live registration ships later.
            </p>
            <div className="about-hero-actions">
              <Link href="/login" className="btn btn-hero-ghost">
                Already have an account
                <ArrowIcon />
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
        <div className="page-wrap login-layout">
          <RegisterForm />

          <aside className="cart-summary faq-aside">
            <p className="label text-faint">What you get</p>
            <p className="cart-summary-kicker">A quieter supply account</p>
            <ul className="contact-help">
              {perks.map((item) => {
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
            <Link href="/login" className="btn btn-hero w-full">
              Login instead
              <ArrowIcon />
            </Link>
            <Link href="/shop" className="btn btn-hero-ghost w-full">
              Continue browsing
            </Link>
            <ul className="cart-trust">
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
