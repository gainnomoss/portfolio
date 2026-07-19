import Image from "next/image";
import clsx from "clsx";
import { imageDimensions } from "@/lib/image-dimensions";
import { Lightbox } from "@/components/ui/lightbox";

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
    <Lightbox src={src} alt={alt} width={width} height={height} className={className}>
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
    </Lightbox>
  );
}
