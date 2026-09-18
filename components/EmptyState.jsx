import Link from "next/link";

export default function EmptyState({
  kicker = "Nothing here",
  title,
  body,
  href = "/shop",
  action = "Browse shop",
  children,
}) {
  return (
    <div className="empty-state">
      {kicker ? <p className="label text-faint">{kicker}</p> : null}
      {title ? <h2 className="empty-state-title">{title}</h2> : null}
      {body ? <p className="copy mt-3">{body}</p> : null}
      {children}
      {href ? (
        <Link href={href} className="btn btn-hero mt-6">
          {action}
        </Link>
      ) : null}
    </div>
  );
}
