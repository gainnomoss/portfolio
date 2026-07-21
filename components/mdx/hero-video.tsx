import { FramedVideo } from "@/components/ui/framed-video";
import { QrCode } from "@/components/ui/qr-code";

export function HeroVideo({
  src,
  width,
  height,
  qrUrl,
  qrLabel = "Try it out live",
  qrNote = "Best experienced on mobile",
}: {
  src: string;
  /** Required to render at the video's native aspect ratio when it isn't 16:9. */
  width?: number;
  height?: number;
  /** When set, renders a QR code linking to `qrUrl` alongside the video. */
  qrUrl?: string;
  qrLabel?: string;
  qrNote?: string;
}) {
  if (!qrUrl) {
    return (
      <div className="mx-auto mt-5 w-full max-w-breakout">
        <FramedVideo src={src} width={width} height={height} />
      </div>
    );
  }

  return (
    <div
      className="mx-auto mt-5 flex w-full max-w-breakout flex-col items-center gap-8 rounded-lg p-8 md:flex-row md:justify-center md:gap-20 md:p-12"
      style={{ backgroundColor: "color-mix(in srgb, var(--accent) 5%, var(--canvas-subtle))" }}
    >
      <FramedVideo src={src} width={width} height={height} className="w-full max-w-[280px]" />
      <a
        href={qrUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${qrLabel} — ${qrNote}`}
        className="group flex shrink-0 flex-col items-center gap-3 rounded-md text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
      >
        <QrCode value={qrUrl} size={148} className="transition-transform duration-fast group-hover:scale-[1.03]" />
        <span className="flex flex-col text-body-sm">
          <span className="text-accent underline decoration-1 underline-offset-2 transition-colors duration-fast group-hover:text-accent-active">
            {qrLabel}
          </span>
          <span className="text-muted">{qrNote}</span>
        </span>
      </a>
    </div>
  );
}
