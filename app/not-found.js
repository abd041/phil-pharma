import Link from "next/link";
import SiteShell from "@/components/SiteShell";

export default function NotFound() {
  return (
    <SiteShell>
      <section className="page-section" style={{ paddingTop: "8rem" }}>
        <div className="page-wrap auth-panel text-center" style={{ marginInline: "auto" }}>
          <p className="label text-faint">404</p>
          <h1 className="display mt-4 max-w-xl text-[clamp(2rem,8vw,3.4rem)]" style={{ marginInline: "auto" }}>
            This page doesn&apos;t exist.
          </h1>
          <p className="copy mt-4 max-w-md" style={{ marginInline: "auto" }}>
            The page may have moved, or the link is incorrect.
          </p>
          <Link href="/" className="btn btn-hero mt-8">
            Back to home
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
