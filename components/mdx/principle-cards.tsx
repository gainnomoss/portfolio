const icons = {
  bookmark: "/icons/bookmark.svg",
  "magnifying-glass": "/icons/magnifying-glass.svg",
  "note-pencil": "/icons/note-pencil.svg",
} as const;

export function PrincipleCards({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto mb-4 mt-12 grid w-full max-w-breakout grid-cols-1 gap-6 sm:grid-cols-3">
      {children}
    </div>
  );
}

export function PrincipleCard({
  icon,
  title,
  description,
}: {
  icon: keyof typeof icons;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col justify-between gap-6 rounded-lg border border-accent-weak bg-canvas p-5 shadow-[0px_1px_1px_rgba(0,0,0,0.1),0px_1px_0.5px_rgba(0,0,0,0.06)]">
      <div className="flex size-10 items-center justify-center rounded-full bg-accent/20 text-accent">
        <img src={icons[icon]} alt="" width={24} height={24} className="size-6" />
      </div>
      <div className="flex flex-col gap-2 text-body-md text-body">
        <p className="font-bold">{title}</p>
        <p>{description}</p>
      </div>
    </div>
  );
}
