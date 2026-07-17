import Image from "next/image";
import clsx from "clsx";
import { imageDimensions } from "@/lib/image-dimensions";

export function FramedScreenshot({
  src,
  alt,
  priority,
  className,
  imageClassName,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
}) {
  const { width, height } = imageDimensions[src] ?? { width: 1600, height: 1000 };

  return (
    <div className={clsx("overflow-hidden rounded-md bg-canvas", className)}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        quality={95}
        className={clsx("h-auto w-full", imageClassName)}
        sizes="(min-width: 1024px) 960px, 100vw"
      />
    </div>
  );
}
