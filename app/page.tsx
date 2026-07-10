import Image from "next/image";
import { getFeaturedProjects, getAbout } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { HeroVisual } from "@/components/ui/hero-visual";
import { ProjectCard } from "@/components/ui/project-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

const skills = [
  "Product Design",
  "UX Research",
  "Interaction Design",
  "Service Design",
  "Usability Testing",
  "Heuristic Analysis",
];

export default function Home() {
  const featured = getFeaturedProjects(2);
  const about = getAbout();

  return (
    <div>
      <section className="mx-auto grid max-w-content grid-cols-1 items-center gap-12 px-6 py-16 sm:py-24 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-body-sm text-muted">Hi, I&apos;m Ke Er</p>
          <h1 className="mt-3 text-display-xl text-ink">I design clarity into complex flows.</h1>
          <p className="mt-6 max-w-reading text-body-lg text-body">
            Product Designer based in Singapore, focused on end-to-end journeys, accessibility,
            and shipping AI-assisted tools for government and enterprise.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/work">See my work</Button>
            <Button href="/contact" variant="secondary">
              Get in touch
            </Button>
          </div>
        </div>
        <HeroVisual />
      </section>

      <section className="border-t border-border py-16 sm:py-24">
        <div className="mx-auto max-w-content px-6">
          <div className="flex items-end justify-between gap-4">
            <SectionHeading>Selected work</SectionHeading>
            <Button href="/work" variant="secondary" className="hidden sm:inline-flex">
              View all
            </Button>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {featured.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.05}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
          <Button href="/work" variant="secondary" className="mt-8 sm:hidden">
            View all work
          </Button>
        </div>
      </section>

      <section className="border-t border-border py-16 sm:py-24">
        <div className="mx-auto grid max-w-content grid-cols-1 gap-12 px-6 sm:grid-cols-[240px_1fr] sm:items-start">
          <SectionHeading>About</SectionHeading>
          <div>
            <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
              {about.photo ? (
                <Image
                  src={about.photo}
                  alt="Ke Er Zhang"
                  width={160}
                  height={163}
                  className="h-40 w-40 shrink-0 rounded-lg object-cover"
                />
              ) : null}
              <div>
                <p className="max-w-reading text-body-lg text-body">
                  Product Designer based in Singapore with a background in architecture — I bring
                  systems thinking and spatial logic to digital products, from mapping end-to-end
                  service journeys to designing for users who aren&apos;t tech-savvy.
                </p>
                <Button href="/about" variant="secondary" className="mt-6">
                  More about me
                </Button>
              </div>
            </div>
            <ul className="mt-10 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full bg-canvas-subtle px-3 py-1 font-mono text-label text-muted"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-16 sm:py-24">
        <div className="mx-auto max-w-content px-6 text-center">
          <h2 className="text-display-md text-ink">Let&apos;s work together.</h2>
          <p className="mx-auto mt-4 max-w-reading text-body-lg text-body">
            Open to product design roles on meaningful, complex problems — especially in public
            sector, government-adjacent, or AI-native products.
          </p>
          <Button href="/contact" className="mt-8">
            Get in touch
          </Button>
        </div>
      </section>
    </div>
  );
}
