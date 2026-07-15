import type { MDXComponents } from "mdx/types";
import { SectionHeading } from "@/components/ui/section-heading";
import { Meta } from "@/components/mdx/meta";
import { Screenshot } from "@/components/mdx/screenshot";
import { Callout } from "@/components/mdx/callout";
import { PrincipleCards, PrincipleCard } from "@/components/mdx/principle-cards";
import { OutcomeList, OutcomeItem } from "@/components/mdx/outcome-list";
import { HeroVideo } from "@/components/mdx/hero-video";

export const mdxComponents: MDXComponents = {
  h2: ({ children }) => (
    <SectionHeading className="mx-auto mb-6 mt-16 max-w-reading first:mt-0">
      {children}
    </SectionHeading>
  ),
  h3: ({ children }) => (
    <h3 className="mx-auto mb-4 mt-10 max-w-reading text-display-sm text-body">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="mx-auto mb-5 max-w-reading text-body-md text-body">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mx-auto mb-5 ml-5 max-w-reading list-disc space-y-2 text-body-md text-body">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mx-auto mb-5 ml-5 max-w-reading list-decimal space-y-2 text-body-md text-body">
      {children}
    </ol>
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
    <blockquote className="mx-auto my-8 max-w-reading border-l-2 border-accent py-1 pl-6 text-body-lg text-ink [&>p]:mb-0">
      {children}
    </blockquote>
  ),
  Meta,
  Screenshot,
  Callout,
  PrincipleCards,
  PrincipleCard,
  OutcomeList,
  OutcomeItem,
  HeroVideo,
};
