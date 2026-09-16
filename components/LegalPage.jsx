import SiteShell from "@/components/SiteShell";
import PageHero from "@/components/PageHero";

export default function LegalPage({ kicker, title, body, crumbs, sections }) {
  return (
    <SiteShell>
      <PageHero kicker={kicker} title={title} body={body} crumbs={crumbs} />
      <section className="page-section">
        <div className="page-wrap legal-content">
          {sections.map((section) => (
            <article key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </article>
          ))}
          <p className="label text-faint mt-10">
            Research use only. Not for human consumption. UI content for frontend review.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
