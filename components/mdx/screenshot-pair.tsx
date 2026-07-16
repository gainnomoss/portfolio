import type { ReactNode } from "react";
import { FramedScreenshot } from "@/components/ui/framed-screenshot";

export function ScreenshotPair({
  items,
}: {
  items: { src: string; alt: string; caption?: ReactNode | null }[];
}) {
  return (
    <div className="mx-auto my-10 max-w-breakout">
      <div className="flex flex-col gap-8 md:flex-row">
        {items.map((item) => {
          const captionContent = item.caption === undefined ? item.alt : item.caption;
          return (
            <figure key={item.src} className="flex-1">
              <FramedScreenshot src={item.src} alt={item.alt} />
              {captionContent ? (
                <figcaption className="mx-auto mt-3 max-w-reading text-body-sm text-muted">
                  {captionContent}
                </figcaption>
              ) : null}
            </figure>
          );
        })}
      </div>
    </div>
  );
}
