import { FramedScreenshot } from "@/components/ui/framed-screenshot";

export function Screenshot({
  src,
  alt,
  priority,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <figure className="my-10">
      <FramedScreenshot src={src} alt={alt} priority={priority} />
      {alt ? (
        <figcaption className="mt-3 text-body-sm text-muted">{alt}</figcaption>
      ) : null}
    </figure>
  );
}
