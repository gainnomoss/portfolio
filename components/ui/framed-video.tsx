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
        "overflow-hidden rounded-md border border-border shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_24px_rgba(0,0,0,0.35)]",
        className
      )}
    >
      <video
        src={src}
        controls
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
