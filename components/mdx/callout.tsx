export function Callout({
  label,
  number,
  title,
}: {
  label: string;
  number: string;
  title: string;
}) {
  return (
    <div className="mx-auto mt-8 flex w-full max-w-reading flex-col gap-4 border-b border-border pb-4">
      <p className="text-body-sm tracking-[0.01em] text-accent-weak">{label}</p>
      <div className="flex items-center gap-2">
        <span className="flex size-6 shrink-0 items-center justify-center text-body-sm font-bold text-accent-weak">
          {number}
        </span>
        <p className="text-body-md font-bold text-body">{title}</p>
      </div>
    </div>
  );
}
