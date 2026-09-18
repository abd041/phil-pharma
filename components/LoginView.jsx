import Link from "next/link";
import Reveal from "@/components/Reveal";
import SplitTitle from "@/components/SplitTitle";
import LoginForm from "@/components/LoginForm";
import { ArrowIcon, LockIcon, PackageIcon, ShieldIcon } from "@/components/Icons";

const stats = [
  { value: "Orders", label: "Mock history in this browser" },
  { value: "Wishlist", label: "Saved research products" },
  { value: "Checkout", label: "Faster next time" },
  { value: "Research", label: "Use only" },
];

const perks = [
  { icon: PackageIcon, title: "Order history", body: "Review mock checkouts placed in this browser." },
  { icon: ShieldIcon, title: "Saved details", body: "Preview addresses and account fields before live auth." },
  { icon: LockIcon, title: "Research only", body: "The catalogue stays laboratory-use. No medical advice." },
];

export default function LoginView() {
  return (
    <article className="login-page">
      <header className="about-hero">
        <div className="page-wrap">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Login</span>
          </nav>

          <Reveal variant="stagger" className="about-hero-copy">
            <p className="standard-kicker">
              <span className="standard-kicker-line" aria-hidden="true" />
              Account
            </p>
            <SplitTitle className="display rest-title about-hero-title">
              Welcome back to <span>the house.</span>
            </SplitTitle>
            <p className="copy rest-lead about-hero-lead">
              Sign in to preview orders, wishlist, and account details. This is an account UI — live
              authentication ships later.
            </p>
            <div className="about-hero-actions">
              <Link href="/register" className="btn btn-hero-ghost">
                Create account
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
          <LoginForm />

          <aside className="cart-summary faq-aside">
            <p className="label text-faint">Why sign in</p>
            <p className="cart-summary-kicker">Keep the bag close</p>
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
            <Link href="/register" className="btn btn-hero w-full">
              Create account
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
