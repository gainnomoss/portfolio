import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      aria-label="Ke Er Zhang — Home"
      className="flex items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
    >
      <Image src="/logo.png" alt="" width={40} height={40} priority className="h-9 w-9" />
    </Link>
  );
}
