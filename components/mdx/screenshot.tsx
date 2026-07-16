import type { ReactNode } from "react";
import { FramedScreenshot } from "@/components/ui/framed-screenshot";

export function Screenshot({
  src,
  alt,
  caption,
  captionLead,
  priority,
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
}) {
  const captionContent = caption === undefined ? alt : caption;

  return (
    <figure className="mx-auto mb-4 mt-12 max-w-breakout">
      <FramedScreenshot src={src} alt={alt} priority={priority} />
      {captionContent ? (
        <figcaption
          className={
            captionLead
              ? "mx-auto mt-3 max-w-reading text-body-sm text-body"
              : "mx-auto mt-3 max-w-reading text-body-sm text-muted"
          }
        >
          {captionLead ? <strong className="font-bold">{captionLead} </strong> : null}
          {captionContent}
        </figcaption>
      ) : null}
    </figure>
  );
}
