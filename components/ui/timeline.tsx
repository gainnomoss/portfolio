import type { TimelineEntry } from "@/lib/types";
import { Reveal } from "@/components/ui/reveal";

export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ol className="relative border-l border-border pl-8">
      {entries.map((entry, index) => (
        <li key={`${entry.title}-${index}`} className="relative pb-10 last:pb-0">
          <span
            className="absolute -left-[calc(2rem+4.5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-accent"
            aria-hidden="true"
          />
          <Reveal delay={index * 0.05}>
            <div className="rounded-md bg-canvas-subtle p-6">
              <p className="font-mono text-label text-muted">{entry.label}</p>
              <h3 className="mt-2 text-title-lg text-ink">{entry.title}</h3>
              <p className="mt-2 text-body-md text-body">{entry.description}</p>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
