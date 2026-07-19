import clsx from "clsx";

export function FramedVideo({
  src,
  className,
  width = 960,
  height = 540,
}: {
  src: string;
  className?: string;
  width?: number;
  height?: number;
}) {
  return (
    <div
      className={clsx(
        "overflow-hidden rounded-md bg-canvas",
        className
      )}
    >
      <video
        src={src}
        controls
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        width={width}
        height={height}
        className="h-auto w-full"
        style={{ aspectRatio: `${width} / ${height}` }}
      />
    </div>
  );
}
