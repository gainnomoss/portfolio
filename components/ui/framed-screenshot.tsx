import Image from "next/image";
import clsx from "clsx";

export function FramedScreenshot({
  src,
  alt,
  priority,
  className,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={clsx("overflow-hidden rounded-md bg-canvas", className)}>
      <Image
        src={src}
        alt={alt}
        width={1600}
        height={1000}
        priority={priority}
        quality={95}
        className="h-auto w-full"
        sizes="(min-width: 1248px) 1200px, 100vw"
      />
    </div>
  );
}
