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
  caption?: string;
  captionLead?: string;
  priority?: boolean;
}) {
  const captionText = caption ?? alt;

  return (
    <figure className="mx-auto mb-4 mt-12 max-w-breakout">
      <FramedScreenshot src={src} alt={alt} priority={priority} />
      {captionText ? (
        <figcaption
          className={
            captionLead
              ? "mx-auto mt-3 max-w-reading text-body-sm text-body"
              : "mx-auto mt-3 max-w-reading text-body-sm text-muted"
          }
        >
          {captionLead ? <strong className="font-bold">{captionLead} </strong> : null}
          {captionText}
        </figcaption>
      ) : null}
    </figure>
  );
}
