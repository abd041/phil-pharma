import Link from "next/link";
import Reveal from "./Reveal";
import SplitTitle from "./SplitTitle";

export default function PageHero({
  kicker = "Phil's Pharma",
  title,
  body,
  crumbs = [],
}) {
  return (
    <div className="page-hero">
      <div className="page-wrap">
        {crumbs.length > 0 ? (
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            {crumbs.map((crumb) => (
              <span key={crumb.href || crumb.label}>
                <span aria-hidden="true">/</span>
                {crumb.href ? <Link href={crumb.href}>{crumb.label}</Link> : <span>{crumb.label}</span>}
              </span>
            ))}
          </nav>
        ) : null}

        <Reveal variant="stagger" className="page-hero-copy">
          <p className="standard-kicker">
            <span className="standard-kicker-line" aria-hidden="true" />
            {kicker}
          </p>
          <SplitTitle className="display rest-title page-hero-title">{title}</SplitTitle>
          {body ? <p className="copy rest-lead page-hero-body">{body}</p> : null}
        </Reveal>
      </div>
    </div>
  );
}
