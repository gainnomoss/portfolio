export function HeroVisual() {
  return (
    <div
      aria-hidden="true"
      className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-canvas-subtle sm:aspect-[16/10]"
    >
      <div className="absolute inset-0 animate-hero-drift bg-[radial-gradient(circle_at_30%_20%,var(--accent)_0%,transparent_45%),radial-gradient(circle_at_75%_65%,var(--accent)_0%,transparent_40%)] opacity-[0.14] motion-reduce:animate-none dark:opacity-[0.2]" />
      <svg className="absolute inset-0 h-full w-full opacity-[0.35] mix-blend-overlay dark:opacity-[0.5]">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  );
}
