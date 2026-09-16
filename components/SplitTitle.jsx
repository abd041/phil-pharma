import { splitChildren } from "@/lib/motion";

export default function SplitTitle({ as: Tag = "h2", className = "", children }) {
  const accentAllSpans = /\b(rest-title|standard-title)\b/.test(className);
  const { nodes } = splitChildren(children, 0, { accentAllSpans });
  return <Tag className={`split-title ${className}`.trim()}>{nodes}</Tag>;
}
