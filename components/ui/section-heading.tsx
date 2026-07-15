import clsx from "clsx";

export function SectionHeading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2 className={clsx("text-display-md text-body", className)}>
      {children}
    </h2>
  );
}
