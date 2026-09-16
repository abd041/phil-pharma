"use client";

import { useState } from "react";
import SiteShell from "@/components/SiteShell";
import PageHero from "@/components/PageHero";
import { faqs } from "@/lib/data";
import { PlusIcon, MinusIcon } from "@/components/Icons";

export default function FaqPage() {
  const [open, setOpen] = useState(0);

  return (
    <SiteShell>
      <PageHero
        kicker="Support"
        title="FAQ"
        body="Common questions about research use, documentation, shipping, and account UI."
        crumbs={[{ label: "FAQ" }]}
      />

      <section className="page-section">
        <div className="page-wrap faq-list">
          {faqs.map((item, index) => {
            const active = open === index;
            return (
              <div key={item.q} className="faq-item">
                <button
                  type="button"
                  className="faq-trigger"
                  aria-expanded={active}
                  onClick={() => setOpen(active ? -1 : index)}
                >
                  <span>{item.q}</span>
                  {active ? <MinusIcon /> : <PlusIcon />}
                </button>
                {active ? <p className="copy faq-answer">{item.a}</p> : null}
              </div>
            );
          })}
        </div>
      </section>
    </SiteShell>
  );
}
