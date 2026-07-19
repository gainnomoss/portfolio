export function OutcomeList({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto my-8 flex w-full max-w-reading flex-col gap-4">{children}</div>;
}

export function OutcomeItem({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4">
      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent text-body-sm font-bold text-on-accent">
        {number}
      </span>
      <p className="text-body-md font-bold text-body">{children}</p>
    </div>
  );
}
