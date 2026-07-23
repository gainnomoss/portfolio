import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAbout } from "@/lib/content";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { Button } from "@/components/ui/button";
import { HalftonePortrait } from "@/components/ui/halftone-portrait";

export const metadata: Metadata = {
  title: "About",
  description: "Product Designer based in Singapore, with a background in architecture.",
};

export default function AboutPage() {
  const about = getAbout();

  return (
    <div className="mx-auto max-w-content px-6 py-16 sm:py-24">
      <div className="grid grid-cols-1 gap-12 sm:grid-cols-[1fr_320px] sm:items-start">
        <div>
          <h1 className="text-display-lg text-ink">About</h1>
          <div className="mt-8 max-w-reading">
            <MDXRemote source={about.content} components={mdxComponents} />
          </div>
          <div className="mt-12 flex flex-wrap gap-4">
            <Button href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              Download resume
            </Button>
            <Button href="/contact" variant="secondary">
              Get in touch
            </Button>
          </div>
        </div>
        {about.photo ? (
          <HalftonePortrait src={about.photo} alt="Ke Er Zhang" naturalWidth={400} naturalHeight={514} />
        ) : null}
      </div>
    </div>
  );
}
