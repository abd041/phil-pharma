"use client";

import { useEffect } from "react";
import { bindScrollDir, isFinePointer, prefersReducedMotion } from "@/lib/motion";

export default function MotionRoot() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = prefersReducedMotion();
    const fine = isFinePointer();

    root.classList.add("motion-ready");
    if (reduced) root.classList.add("motion-reduce");
    if (!fine || reduced) root.classList.add("no-parallax");

    const setProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const value = max > 0 ? window.scrollY / max : 0;
      root.style.setProperty("--sp", String(value));
    };

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setProgress();
        frame = 0;
      });
    };

    const unbindScrollDir = bindScrollDir();

    setProgress();
    window.addEventListener("scroll", onScroll, { passive: true });

    let mouseFrame = 0;
    const onMove = (event) => {
      if (!fine || reduced) return;
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;
      if (mouseFrame) return;
      mouseFrame = window.requestAnimationFrame(() => {
        root.style.setProperty("--mx", x.toFixed(3));
        root.style.setProperty("--my", y.toFixed(3));
        mouseFrame = 0;
      });
    };

    const onLeave = () => {
      root.style.setProperty("--mx", "0");
      root.style.setProperty("--my", "0");
    };

    if (fine && !reduced) {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerleave", onLeave);
    }

    const marks = document.querySelectorAll("[data-inview]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
          } else {
            entry.target.classList.remove("is-in");
          }
        });
      },
      { threshold: [0, 0.08, 0.16], rootMargin: "0px 0px 0px 0px" }
    );
    marks.forEach((el) => observer.observe(el));

    return () => {
      unbindScrollDir();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      if (mouseFrame) window.cancelAnimationFrame(mouseFrame);
    };
  }, []);

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <div className="atmosphere" aria-hidden="true">
        <span className="atmosphere-beam" />
        <span className="atmosphere-beam atmosphere-beam-b" />
        <span className="atmosphere-grid" />
        <span className="atmosphere-streak" />
      </div>
    </>
  );
}
