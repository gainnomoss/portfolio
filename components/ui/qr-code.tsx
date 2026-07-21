import clsx from "clsx";
import QRCode from "qrcode";

export async function QrCode({
  value,
  size = 148,
  className,
}: {
  value: string;
  size?: number;
  className?: string;
}) {
  const svg = await QRCode.toString(value, {
    type: "svg",
    margin: 2,
    color: { dark: "#14151a", light: "#ffffff" },
  });

  return (
    <div
      className={clsx(
        "shrink-0 overflow-hidden rounded-md border border-border bg-white [&>svg]:block [&>svg]:h-full [&>svg]:w-full",
        className,
      )}
      style={{ width: size, height: size }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
