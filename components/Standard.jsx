import { standards } from "@/lib/data";
import {
  ArrowIcon,
  FlaskIcon,
  PackageIcon,
  ShieldIcon,
  StarIcon,
  StarOutlineIcon,
} from "./Icons";
import Reveal from "./Reveal";
import SplitTitle from "./SplitTitle";

const pointIcons = [ShieldIcon, FlaskIcon, PackageIcon];

const performanceLinks = [
  { id: "01", label: "Purity First", href: "/shop/peptides" },
  { id: "02", label: "Lab Essentials", href: "/shop/accessories" },
  { id: "03", label: "Research Backed", href: "/about" },
];

function HexMark() {
  return (
    <div className="standard-hex" aria-hidden="true">
      <svg className="standard-hex-grid" viewBox="0 0 192 166" fill="none">
        <g stroke="#1677FF" strokeWidth="1.15">
          <polygon points="70.0,8.0 96.0,23.0 96.0,53.0 70.0,68.0 44.0,53.0 44.0,23.0" opacity="0.28" />
          <polygon points="122.0,8.0 147.9,23.0 147.9,53.0 122.0,68.0 96.0,53.0 96.0,23.0" opacity="0.55" />
          <polygon points="44.0,53.0 70.0,68.0 70.0,98.0 44.0,113.0 18.0,98.0 18.0,68.0" opacity="0.22" />
          <polygon points="96.0,53.0 122.0,68.0 122.0,98.0 96.0,113.0 70.0,98.0 70.0,68.0" opacity="0.7" />
          <polygon points="147.9,53.0 173.9,68.0 173.9,98.0 147.9,113.0 122.0,98.0 122.0,68.0" opacity="0.4" />
          <polygon points="70.0,98.0 96.0,113.0 96.0,143.0 70.0,158.0 44.0,143.0 44.0,113.0" opacity="0.32" />
          <polygon points="122.0,98.0 147.9,113.0 147.9,143.0 122.0,158.0 96.0,143.0 96.0,113.0" opacity="0.5" />
        </g>
      </svg>
      <p className="standard-hex-copy">
        <span>Science drives</span>
        <span>a brighter</span>
        <span>tomorrow</span>
      </p>
    </div>
  );
}

export default function Standard() {
  return (
    <section id="about" className="standard-section" data-inview>
      <div className="page-wrap">
        <div className="standard-grid">
          <Reveal variant="stagger">
            <p className="standard-kicker">
              <span className="standard-kicker-line" aria-hidden="true" />
              Why choose us
            </p>

            <SplitTitle className="display standard-title">
              Details should never be <span className="title-accent">an afterthought.</span>
            </SplitTitle>

            <ul className="standard-points">
              {standards.map((item, index) => {
                const Icon = pointIcons[index];
                return (
                  <li key={item.id} className="standard-point">
                    <span className="standard-point-icon">
                      <Icon />
                    </span>
                    <div>
                      <p>{item.title}</p>
                      <p>{item.body}</p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="standard-rating">
              <p className="standard-score">
                4.8<span>/5</span>
              </p>
              <div className="standard-rating-meta">
                <span className="standard-stars" aria-hidden="true">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarOutlineIcon />
                </span>
                <p>
                  Based on <span>4,835</span> reviews
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="standard-performance">
            <p className="standard-kicker standard-kicker-blue">
              <span className="standard-kicker-line" aria-hidden="true" />
              Built for
            </p>

            <SplitTitle as="h3" className="display standard-performance-title">
              Performance
            </SplitTitle>

            <div className="standard-links">
              {performanceLinks.map((item) => (
                <a key={item.id} href={item.href} className="standard-link">
                  <span>
                    <span>{item.id}</span>
                    {item.label}
                  </span>
                  <ArrowIcon />
                </a>
              ))}
            </div>

            <HexMark />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
