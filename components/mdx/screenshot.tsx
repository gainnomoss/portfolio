import type { CSSProperties, ReactNode } from "react";
import clsx from "clsx";
import { FramedScreenshot } from "@/components/ui/framed-screenshot";

export function Screenshot({
  src,
  alt,
  caption,
  captionLead,
  priority,
  maxHeight,
}: {
  src: string;
  alt: string;
  /**
   * Optional override for the visible figcaption text/content. Defaults to `alt`
   * (existing behaviour). Pass `caption={null}` to render `alt` for accessibility
   * only, without a visible caption.
   */
  caption?: ReactNode | null;
  captionLead?: string;
  priority?: boolean;
  /**
   * Caps the rendered image height (in px) on desktop. The image scales down
   * proportionally, the group is centred in the breakout column, and the
   * caption aligns with the image's left edge instead of the reading column.
   */
  maxHeight?: number;
}) {
  const captionContent = caption === undefined ? alt : caption;
  const constrained = maxHeight !== undefined;

  return (
    <figure
      className="mx-auto my-16 max-w-breakout"
      style={constrained ? ({ "--screenshot-max-h": `${maxHeight}px` } as CSSProperties) : undefined}
    >
      <div className={constrained ? "mx-auto lg:w-fit" : undefined}>
        <FramedScreenshot
          src={src}
          alt={alt}
          priority={priority}
          className={constrained ? "lg:w-fit" : undefined}
          imageClassName={constrained ? "lg:max-h-[var(--screenshot-max-h)] lg:w-auto" : undefined}
        />
        {captionContent ? (
          <figcaption
            className={clsx(
              "mt-3 text-body-sm",
              captionLead ? "text-body" : "text-muted",
              constrained ? "lg:w-0 lg:min-w-full" : undefined,
            )}
          >
            {captionLead ? <strong className="font-bold">{captionLead} </strong> : null}
            {captionContent}
          </figcaption>
        ) : null}
      </div>
    </figure>
  );
}
