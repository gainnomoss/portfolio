export function NumberedList({
  items,
}: {
  items: { term: string; description: string }[];
}) {
  return (
    <div className="mx-auto my-8 flex max-w-reading flex-col gap-4">
      {items.map((item, index) => (
        <div key={item.term} className="flex items-center gap-4">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent text-body-sm font-bold text-on-accent">
            {index + 1}
          </span>
          <p className="text-body-md text-body">
            <strong className="font-bold text-ink">{item.term}</strong> {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}
