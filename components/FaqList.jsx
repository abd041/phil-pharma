"use client";

import { useMemo, useState } from "react";
import { faqGroups } from "@/lib/data";
import { MinusIcon, PlusIcon } from "@/components/Icons";

export default function FaqList() {
  const [topic, setTopic] = useState("all");
  const [openId, setOpenId] = useState(faqGroups[0]?.items[0]?.id || "");

  const groups = useMemo(
    () => (topic === "all" ? faqGroups : faqGroups.filter((group) => group.id === topic)),
    [topic]
  );

  const selectTopic = (id) => {
    setTopic(id);
    const nextGroup = id === "all" ? faqGroups[0] : faqGroups.find((group) => group.id === id);
    setOpenId(nextGroup?.items[0]?.id || "");
  };

  return (
    <div className="faq-board">
      <div className="faq-topics" role="group" aria-label="FAQ topics">
        <button
          type="button"
          aria-pressed={topic === "all"}
          className={topic === "all" ? "is-active" : ""}
          onClick={() => selectTopic("all")}
        >
          All
        </button>
        {faqGroups.map((group) => (
          <button
            key={group.id}
            type="button"
            aria-pressed={topic === group.id}
            className={topic === group.id ? "is-active" : ""}
            onClick={() => selectTopic(group.id)}
          >
            {group.title}
          </button>
        ))}
      </div>

      {groups.map((group) => (
        <section key={group.id} className="faq-group" aria-labelledby={`faq-group-${group.id}`}>
          <h2 id={`faq-group-${group.id}`} className="label text-faint">
            {group.title}
          </h2>
          <div className="faq-list">
            {group.items.map((item) => {
              const active = openId === item.id;
              const panelId = `faq-panel-${item.id}`;
              const triggerId = `faq-trigger-${item.id}`;
              return (
                <article key={item.id} className={`faq-item ${active ? "is-open" : ""}`}>
                  <h3>
                    <button
                      type="button"
                      id={triggerId}
                      className="faq-trigger"
                      aria-expanded={active}
                      aria-controls={panelId}
                      onClick={() => setOpenId(active ? "" : item.id)}
                    >
                      <span>{item.q}</span>
                      <span className="faq-toggle" aria-hidden="true">
                        {active ? <MinusIcon /> : <PlusIcon />}
                      </span>
                    </button>
                  </h3>
                  <div id={panelId} role="region" aria-labelledby={triggerId} hidden={!active}>
                    <p className="copy faq-answer">{item.a}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
