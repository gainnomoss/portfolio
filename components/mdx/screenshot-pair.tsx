import type { CSSProperties, ReactNode } from "react";
import { FramedScreenshot } from "@/components/ui/framed-screenshot";
import { imageDimensions } from "@/lib/image-dimensions";

type PairItem = {
  src: string;
  alt: string;
  caption?: ReactNode | null;
  /** Alternate image rendered below the md breakpoint in place of `src`. */
  mobileSrc?: string;
};

/** Must match the gap-8 used between and inside columns. */
const GAP_REM = 2;

function aspectOf(src: string) {
  const { width, height } = imageDimensions[src] ?? { width: 1600, height: 1000 };
  return width / height;
}

export function ScreenshotPair({
  items,
}: {
  /** A flat entry is a single image; an array entry renders as a stacked column. */
  items: (PairItem | PairItem[])[];
}) {
  const columns = items.map((entry) => (Array.isArray(entry) ? entry : [entry]));

  // Solve column widths so all columns end at the same height. A column's
  // height is width * sum(h/w) plus the fixed gaps between its stacked
  // images, so each width resolves to a calc() of the form `p% + q rem`.
  const sums = columns.map((col) => col.reduce((s, item) => s + 1 / aspectOf(item.src), 0));
  const innerGaps = columns.map((col) => col.length - 1);
  const t = sums.reduce((acc, s) => acc + 1 / s, 0);
  const b = (innerGaps.reduce((acc, n, j) => acc + n / sums[j], 0) - (columns.length - 1)) / t;

  return (
    <div className="mx-auto my-16 max-w-breakout">
      <div className="flex flex-col gap-8 md:flex-row">
        {columns.map((col, j) => {
          const pct = 100 / (t * sums[j]);
          const rem = ((b - innerGaps[j]) / sums[j]) * GAP_REM;
          return (
            <div
              key={col[0].src}
              className="flex min-w-0 flex-col gap-8 md:w-[var(--col-w)] md:flex-none"
              style={{ "--col-w": `calc(${pct.toFixed(4)}% + ${rem.toFixed(4)}rem)` } as CSSProperties}
            >
              {col.map((item) => {
                const captionContent = item.caption === undefined ? item.alt : item.caption;
                return (
                  <figure key={item.src} className="min-w-0">
                    {item.mobileSrc ? (
                      <>
                        <FramedScreenshot src={item.mobileSrc} alt={item.alt} className="md:hidden" />
                        <FramedScreenshot src={item.src} alt={item.alt} className="hidden md:block" />
                      </>
                    ) : (
                      <FramedScreenshot src={item.src} alt={item.alt} />
                    )}
                    {captionContent ? (
                      <figcaption className="mt-3 text-body-sm text-muted">
                        {captionContent}
                      </figcaption>
                    ) : null}
                  </figure>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
