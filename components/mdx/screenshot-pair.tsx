import type { CSSProperties, ReactNode } from "react";
import { FramedScreenshot } from "@/components/ui/framed-screenshot";
import { imageDimensions } from "@/lib/image-dimensions";

export function ScreenshotPair({
  items,
}: {
  items: { src: string; alt: string; caption?: ReactNode | null }[];
}) {
  return (
    <div className="mx-auto my-16 max-w-breakout">
      <div className="flex flex-col gap-8 md:flex-row">
        {items.map((item) => {
          const captionContent = item.caption === undefined ? item.alt : item.caption;
          const { width, height } = imageDimensions[item.src] ?? { width: 1600, height: 1000 };
          return (
            <figure
              key={item.src}
              className="min-w-0 basis-0 grow-[var(--aspect)]"
              style={{ "--aspect": width / height } as CSSProperties}
            >
              <FramedScreenshot src={item.src} alt={item.alt} />
              {captionContent ? (
                <figcaption className="mt-3 text-body-sm text-muted">
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
