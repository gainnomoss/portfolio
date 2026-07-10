import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      aria-label="Ke Er Zhang — Home"
      className="flex flex-col text-title-md font-semibold leading-[0.95] text-accent rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
    >
      <span>Z</span>
      <span className="self-end">KE</span>
    </Link>
  );
}
