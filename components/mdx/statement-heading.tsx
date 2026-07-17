export function StatementHeading({
  label,
  number,
  title,
}: {
  label: string;
  number: number;
  title: string;
}) {
  return (
    <div className="mx-auto mt-10 mb-4 flex max-w-reading flex-col gap-2 border-b border-border pb-1 first:mt-0">
      <p className="text-body-sm text-accent-weak">{label}</p>
      <div className="flex items-center gap-2">
        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-weak/10 text-body-sm font-bold text-accent-weak">
          {number}
        </span>
        <p className="text-body-md font-medium text-ink">{title}</p>
      </div>
    </div>
  );
}
