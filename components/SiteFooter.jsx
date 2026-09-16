import Link from "next/link";
import Image from "next/image";
import { footerColumns } from "@/lib/data";
import Reveal from "./Reveal";

export default function SiteFooter() {
  return (
    <footer id="support" className="site-footer">
      <div className="page-wrap site-footer-inner">
        <Reveal className="site-footer-brand">
          <Link href="/" className="site-close-logo" aria-label="Phil's Pharma home">
            <span>
              <Image
                src="/images/logo.jpeg"
                alt="Phil's Pharma"
                fill
                sizes="178px"
                className="logo-mark object-cover object-center"
              />
            </span>
          </Link>
          <p className="copy site-footer-blurb">
            Research peptides and lab essentials with clear product detail, discreet dispatch, and
            documentation on request.
          </p>
          <p className="label text-faint">Research use only · Not for human consumption</p>
        </Reveal>

        <div className="site-footer-grid">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <p className="label text-faint">{column.title}</p>
              <ul className="site-footer-links">
                {column.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="page-wrap site-close-legal">
        <p>© 2026 Phil&apos;s Pharma. Research use only. Not for human consumption.</p>
        <a href="mailto:support@philspharma.com">support@philspharma.com</a>
      </div>
    </footer>
  );
}
