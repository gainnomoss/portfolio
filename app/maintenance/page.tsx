import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Down for maintenance",
  description: "This site is temporarily down for maintenance. Check back shortly.",
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col items-center justify-center px-6 py-24 text-center">
      <p className="font-mono text-label text-muted">Maintenance</p>
      <h1 className="mt-4 text-display-lg text-ink">Down for maintenance</h1>
      <p className="mt-4 text-body-md text-body">
        The site is getting a quick tune-up. Please check back shortly.
      </p>
      <p className="mt-8 font-mono text-mono-detail text-muted">Thanks for your patience.</p>
    </div>
  );
}
