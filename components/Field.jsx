export default function Field({
  label,
  name,
  error,
  children,
  className = "",
  hint,
}) {
  const describedBy = [error ? `${name}-error` : null, hint ? `${name}-hint` : null]
    .filter(Boolean)
    .join(" ") || undefined;

  return (
    <label className={`field ${error ? "is-invalid" : ""} ${className}`.trim()}>
      <span className="field-label-row">
        <span>{label}</span>
        {hint ? (
          <span id={`${name}-hint`} className="field-hint">
            {hint}
          </span>
        ) : null}
      </span>
      {typeof children === "function" ? children({ describedBy, invalid: Boolean(error) }) : children}
      {error ? (
        <span id={`${name}-error`} className="field-error" role="alert">
          {error}
        </span>
      ) : null}
    </label>
  );
}
