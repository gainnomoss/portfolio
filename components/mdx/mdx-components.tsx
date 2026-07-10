import type { MDXComponents } from "mdx/types";
import { SectionHeading } from "@/components/ui/section-heading";
import { Meta } from "@/components/mdx/meta";
import { Screenshot } from "@/components/mdx/screenshot";

export const mdxComponents: MDXComponents = {
  h2: ({ children }) => (
    <SectionHeading className="mb-6 mt-16 first:mt-0">{children}</SectionHeading>
  ),
  h3: ({ children }) => (
    <h3 className="mb-4 mt-10 text-title-lg text-ink">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="mb-5 text-body-md text-body">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mb-5 ml-5 list-disc space-y-2 text-body-md text-body">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-5 ml-5 list-decimal space-y-2 text-body-md text-body">{children}</ol>
  ),
  li: ({ children }) => <li className="pl-1">{children}</li>,
  strong: ({ children }) => <strong className="font-medium text-ink">{children}</strong>,
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-accent underline decoration-1 underline-offset-2 transition-colors duration-fast hover:text-accent-active"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-8 border-l-2 border-accent py-1 pl-6 text-body-lg text-ink [&>p]:mb-0">
      {children}
    </blockquote>
  ),
  Meta,
  Screenshot,
};
