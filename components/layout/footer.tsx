const links = [
  { href: "mailto:keer.zhang@hotmail.com", label: "Email" },
  { href: "https://www.linkedin.com/in/keerzhang/", label: "LinkedIn" },
  { href: "/resume.pdf", label: "Résumé" },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-content flex-col gap-6 px-6 py-16 sm:flex-row sm:items-center sm:justify-between">
        <ul className="flex flex-wrap gap-6">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="text-body-sm text-body transition-colors duration-fast hover:text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="font-mono text-mono-detail text-muted">
          Designed and built by Ke Er Zhang · Next.js, Tailwind CSS · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
