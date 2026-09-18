import Link from "next/link";

export default function AuthForm({
  title,
  body,
  children,
  footer,
  onSubmit,
}) {
  return (
    <div className="auth-panel">
      <p className="standard-kicker">
        <span className="standard-kicker-line" aria-hidden="true" />
        Account
      </p>
      <h1 className="display auth-title">{title}</h1>
      {body ? <p className="copy mt-3">{body}</p> : null}
      <form className="auth-form" onSubmit={onSubmit} noValidate>
        {children}
      </form>
      {footer ? <p className="auth-footer copy">{footer}</p> : null}
      <p className="label text-faint mt-8">
        UI mock only · <Link href="/">Back home</Link>
      </p>
    </div>
  );
}
