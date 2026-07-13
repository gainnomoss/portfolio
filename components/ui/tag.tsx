import clsx from "clsx";

export function Tag({
  children,
  locked,
  className,
}: {
  children: React.ReactNode;
  locked?: boolean;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-3 py-1 font-mono text-label",
        locked ? "gap-2 bg-danger-subtle text-danger" : "gap-1.5 bg-canvas-subtle text-muted",
        className
      )}
    >
      {locked ? (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
          <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      ) : null}
      {children}
    </span>
  );
}
