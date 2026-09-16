import { Children, cloneElement, isValidElement } from "react";

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isFinePointer() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

let scrollY = 0;
let scrollDir = "down";

export function getScrollDir() {
  return scrollDir;
}

export function bindScrollDir() {
  if (typeof window === "undefined") return () => {};

  scrollY = window.scrollY;
  scrollDir = "down";

  const onScroll = () => {
    const next = window.scrollY;
    scrollDir = next >= scrollY ? "down" : "up";
    scrollY = next;
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}

function wordSpans(text, start, accent) {
  const words = String(text).split(/(\s+)/);
  let index = start;
  const nodes = words.map((chunk, i) => {
    if (!chunk || /^\s+$/.test(chunk)) {
      return <span key={`s-${start}-${i}`}>{chunk}</span>;
    }
    const current = index;
    index += 1;
    return (
      <span
        key={`w-${start}-${i}`}
        className={accent ? "split-word split-word-accent" : "split-word"}
        style={{ "--i": current }}
      >
        <span>{chunk}</span>
      </span>
    );
  });
  return { nodes, next: index };
}

export function splitChildren(children, start = 0, options = {}) {
  let index = start;
  const nodes = Children.map(children, (child, key) => {
    if (child == null || child === false) return child;

    if (typeof child === "string" || typeof child === "number") {
      const result = wordSpans(String(child), index, false);
      index = result.next;
      return result.nodes;
    }

    if (isValidElement(child)) {
      const childClass = typeof child.props.className === "string" ? child.props.className : "";
      const accent =
        options.accentAllSpans && child.type === "span"
          ? true
          : /accent/.test(childClass);
      const content = child.props.children;

      if (typeof content === "string" || typeof content === "number") {
        const result = wordSpans(String(content), index, accent);
        index = result.next;
        return cloneElement(child, { key: child.key ?? `line-${key}` }, result.nodes);
      }

      const nested = splitChildren(content, index, options);
      index = nested.next;
      return cloneElement(child, { key: child.key ?? `line-${key}` }, nested.nodes);
    }

    return child;
  });

  return { nodes, next: index };
}
