function ChevronRightIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="shrink-0 text-muted"
    >
      <path
        d="M9 18L15 12L9 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StepFlow({
  steps,
}: {
  steps: { title: string; subtitle: string }[];
}) {
  return (
    <div className="mx-auto my-10 max-w-breakout">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-0">
        {steps.map((step, index) => (
          <div key={step.title} className="flex items-stretch lg:flex-1">
            <div className="flex flex-1 flex-col gap-4 rounded-md border border-border bg-canvas-subtle p-5">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent/10 text-body-sm font-bold text-accent">
                {index + 1}
              </span>
              <div className="flex flex-col gap-1.5">
                <p className="text-body-md font-semibold leading-tight text-ink">
                  {step.title}
                </p>
                <p className="text-body-sm leading-snug text-muted">{step.subtitle}</p>
              </div>
            </div>
            {index < steps.length - 1 ? (
              <div className="hidden shrink-0 items-center px-2 lg:flex">
                <ChevronRightIcon />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
