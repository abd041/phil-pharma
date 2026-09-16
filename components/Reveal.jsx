"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { getScrollDir } from "@/lib/motion";

export default function Reveal({ children, className = "", delay = 0, variant = "rise" }) {
  const ref = useRef(null);
  const phaseRef = useRef("pending");
  const [phase, setPhase] = useState("pending");
  const [dir, setDir] = useState("down");

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      phaseRef.current = "in";
      setPhase("in");
      return undefined;
    }

    let enterFrame = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const viewH = entry.rootBounds?.height ?? window.innerHeight;
        const rect = entry.boundingClientRect;
        const fullyAway = rect.bottom <= 0 || rect.top >= viewH;

        if (fullyAway || !entry.isIntersecting) {
          if (enterFrame) {
            window.cancelAnimationFrame(enterFrame);
            enterFrame = 0;
          }
          if (phaseRef.current !== "pending") {
            phaseRef.current = "pending";
            setPhase("pending");
          }
          return;
        }

        setDir(getScrollDir() === "up" ? "up" : "down");

        if (phaseRef.current === "in") return;

        phaseRef.current = "in";
        enterFrame = window.requestAnimationFrame(() => {
          setPhase("in");
          enterFrame = 0;
        });
      },
      { threshold: [0, 0.02, 0.12] }
    );

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.88 && rect.bottom > window.innerHeight * 0.12) {
      phaseRef.current = "in";
      setDir("down");
      setPhase("in");
    }

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (enterFrame) window.cancelAnimationFrame(enterFrame);
    };
  }, []);

  const revealClass = phase === "in" ? "reveal-in" : "reveal-pending";

  return (
    <div
      ref={ref}
      className={`${className} reveal-${variant} reveal-dir-${dir} ${revealClass}`.trim()}
      style={{ "--reveal-delay": `${delay}s` }}
    >
      {children}
    </div>
  );
}
