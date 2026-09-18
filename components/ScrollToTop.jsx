"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

export function scrollWindowToTop() {
  const html = document.documentElement;
  const previous = html.style.scrollBehavior;
  html.style.scrollBehavior = "auto";
  window.scrollTo(0, 0);
  html.scrollTop = 0;
  document.body.scrollTop = 0;
  html.style.scrollBehavior = previous;
}

export default function ScrollToTop() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const html = document.documentElement;
    html.classList.add("nav-lock");
    scrollWindowToTop();

    const timers = [0, 40, 120, 280].map((ms) => window.setTimeout(scrollWindowToTop, ms));
    const unlock = window.setTimeout(() => {
      html.classList.remove("nav-lock");
    }, 360);

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
      window.clearTimeout(unlock);
      html.classList.remove("nav-lock");
    };
  }, [pathname]);

  return null;
}
