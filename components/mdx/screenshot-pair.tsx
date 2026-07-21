import type { CSSProperties, ReactNode } from "react";
import clsx from "clsx";
import { FramedScreenshot } from "@/components/ui/framed-screenshot";
import { FramedVideo } from "@/components/ui/framed-video";
import { imageDimensions } from "@/lib/image-dimensions";

type PairItem = {
  src: string;
  alt: string;
  caption?: ReactNode | null;
  /** Alternate image rendered below the md breakpoint in place of `src`. */
  mobileSrc?: string;
  /** Renders as a looping video instead of an image. */
  type?: "image" | "video";
  /** Required for video items (not tracked in imageDimensions); optional override for images. */
  width?: number;
  height?: number;
};

/** Must match the gap-8 used between and inside columns. */
const GAP_REM = 2;

function aspectOf(item: PairItem) {
  if (item.width && item.height) return item.width / item.height;
  const { width, height } = imageDimensions[item.src] ?? { width: 1600, height: 1000 };
  return width / height;
}

export function ScreenshotPair({
  items,
  maxHeight,
}: {
  /** A flat entry is a single image; an array entry renders as a stacked column. */
  items: (PairItem | PairItem[])[];
  /**
   * Caps each image's rendered height (in vh) across all breakpoints. Images
   * scale down proportionally and stay centred in their column.
   */
  maxHeight?: number;
}) {
  const constrained = maxHeight !== undefined;
  const columns = items.map((entry) => (Array.isArray(entry) ? entry : [entry]));

  // Solve column widths so all columns end at the same height. A column's
  // height is width * sum(h/w) plus the fixed gaps between its stacked
  // images, so each width resolves to a calc() of the form `p% + q rem`.
  const sums = columns.map((col) => col.reduce((s, item) => s + 1 / aspectOf(item), 0));
  const innerGaps = columns.map((col) => col.length - 1);
  const t = sums.reduce((acc, s) => acc + 1 / s, 0);
  const b = (innerGaps.reduce((acc, n, j) => acc + n / sums[j], 0) - (columns.length - 1)) / t;

  return (
    <div
      className="mx-auto my-16 max-w-breakout"
      style={constrained ? ({ "--pair-max-h": `${maxHeight}vh` } as CSSProperties) : undefined}
    >
      <div className="flex flex-col gap-8 md:flex-row">
        {columns.map((col, j) => {
          const pct = 100 / (t * sums[j]);
          const rem = ((b - innerGaps[j]) / sums[j]) * GAP_REM;
          return (
            <div
              key={col[0].src}
              className={clsx(
                "flex min-w-0 flex-col gap-8 md:w-[var(--col-w)] md:flex-none",
                constrained && "items-center",
              )}
              style={{ "--col-w": `calc(${pct.toFixed(4)}% + ${rem.toFixed(4)}rem)` } as CSSProperties}
            >
              {col.map((item) => {
                const captionContent = item.caption === undefined ? item.alt : item.caption;
                const imageClassName = constrained ? "max-h-[var(--pair-max-h)] w-auto max-w-full" : undefined;
                return (
                  <figure key={item.src} className={clsx("min-w-0", constrained && "w-fit")}>
                    {item.type === "video" ? (
                      <FramedVideo
                        src={item.src}
                        width={item.width}
                        height={item.height}
                        className={constrained ? "w-fit" : undefined}
                      />
                    ) : item.mobileSrc ? (
                      <>
                        <FramedScreenshot
                          src={item.mobileSrc}
                          alt={item.alt}
                          className={clsx("md:hidden", constrained && "w-fit")}
                          imageClassName={imageClassName}
                        />
                        <FramedScreenshot
                          src={item.src}
                          alt={item.alt}
                          className={clsx("hidden md:block", constrained && "w-fit")}
                          imageClassName={imageClassName}
                        />
                      </>
                    ) : (
                      <FramedScreenshot
                        src={item.src}
                        alt={item.alt}
                        className={constrained ? "w-fit" : undefined}
                        imageClassName={imageClassName}
                      />
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
