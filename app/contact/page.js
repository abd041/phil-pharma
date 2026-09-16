"use client";

import { useState } from "react";
import SiteShell from "@/components/SiteShell";
import PageHero from "@/components/PageHero";
import { ArrowIcon } from "@/components/Icons";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <SiteShell>
      <PageHero
        kicker="Support"
        title="Contact us"
        body="Reach the team about product detail, documentation requests, or dispatch questions."
        crumbs={[{ label: "Contact" }]}
      />

      <section className="page-section">
        <div className="page-wrap contact-layout">
          <form
            className="checkout-form"
            onSubmit={(event) => {
              event.preventDefault();
              setSent(true);
            }}
          >
            <div className="form-grid">
              <label>
                Name
                <input type="text" name="name" required defaultValue="Alex Researcher" />
              </label>
              <label>
                Email
                <input type="email" name="email" required defaultValue="researcher@lab.example" />
              </label>
              <label className="form-span-2">
                Subject
                <input type="text" name="subject" required defaultValue="Documentation request" />
              </label>
              <label className="form-span-2">
                Message
                <textarea name="message" rows={6} required defaultValue="Please advise on COA availability for Glutathione 500mg." />
              </label>
            </div>
            {sent ? <p className="form-note">Message captured in UI mock. No email was sent.</p> : null}
            <button type="submit" className="btn btn-hero">
              {sent ? "Sent" : "Send message"}
              <ArrowIcon />
            </button>
          </form>

          <aside className="account-card">
            <p className="label text-faint">Direct</p>
            <a className="mt-4 block text-lg" href="mailto:support@philspharma.com">
              support@philspharma.com
            </a>
            <p className="copy mt-4">
              Research use only. We respond on product information, batch documentation channels, and
              shipping questions.
            </p>
            <p className="label text-faint mt-8">Hours</p>
            <p className="copy mt-2">Mon–Fri · 09:00–17:00 UK</p>
          </aside>
        </div>
      </section>
    </SiteShell>
  );
}
