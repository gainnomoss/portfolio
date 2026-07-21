import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Ke Er Zhang.",
};

const links = [
  {
    label: "Email",
    value: "keer.zhang@hotmail.com",
    href: "mailto:keer.zhang@hotmail.com",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/keerzhang",
    href: "https://www.linkedin.com/in/keerzhang/",
  },
  {
    label: "Resume",
    value: "Download PDF",
    href: "/resume.pdf",
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-16 sm:py-24">
      <h1 className="text-display-lg text-ink">Let&apos;s talk</h1>
      <p className="mt-4 max-w-reading text-body-lg text-body">
        Open to product design roles working on meaningful, complex problems — especially in
        public sector, government-adjacent, or AI-native products. The fastest way to reach me
        is email.
      </p>

      <div className="mt-12 flex flex-wrap gap-4">
        <Button href="mailto:keer.zhang@hotmail.com">Email me</Button>
        <Button href="https://www.linkedin.com/in/keerzhang/" variant="secondary" target="_blank" rel="noopener noreferrer">
          Connect on LinkedIn
        </Button>
      </div>

      <dl className="mt-16 divide-y divide-border border-y border-border">
        {links.map((link) => (
          <div key={link.label} className="flex items-center justify-between py-4">
            <dt className="font-mono text-label text-muted">{link.label}</dt>
            <dd>
              <a
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="text-body-md text-ink underline decoration-1 underline-offset-2 transition-colors duration-fast hover:text-accent"
              >
                {link.value}
              </a>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
