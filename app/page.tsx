import Image from "next/image";
import { getFeaturedProjects, getAbout } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { HeroCopy } from "@/components/ui/hero-copy";
import { InteractiveDots } from "@/components/ui/interactive-dots";
import { ProjectCard } from "@/components/ui/project-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export default function Home() {
  const featured = getFeaturedProjects();
  const about = getAbout();

  return (
    <div>
      <section className="relative overflow-hidden">
        <InteractiveDots />
        <div className="relative z-[2] mx-auto max-w-content px-6 py-16 sm:py-24 lg:py-32">
          <div className="max-w-[640px]">
            <HeroCopy avatarSrc="/avatar.png" />
          </div>
        </div>
      </section>

      <section className="border-t border-border py-16 sm:py-24">
        <div className="mx-auto max-w-content px-6">
          <SectionHeading>Selected Work</SectionHeading>
          <div className="mt-10 flex flex-col gap-8">
            {featured.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.05}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border py-16 sm:py-24">
        <div className="mx-auto grid max-w-content grid-cols-1 gap-12 px-6 sm:grid-cols-[240px_1fr] sm:items-start">
          <SectionHeading>About</SectionHeading>
          <div>
            <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
              {about.photo ? (
                <>
                  <Image
                    src={about.photo}
                    alt="Ke Er Zhang"
                    width={160}
                    height={163}
                    className="h-40 w-40 shrink-0 rounded-lg object-cover dark:hidden"
                  />
                  {about.photoDark ? (
                    <Image
                      src={about.photoDark}
                      alt="Ke Er Zhang"
                      width={160}
                      height={163}
                      className="hidden h-40 w-40 shrink-0 rounded-lg object-cover dark:block"
                    />
                  ) : null}
                </>
              ) : null}
              <div>
                <p className="max-w-reading text-body-lg text-body">
                  Whether I&apos;m designing AI-powered tools for investigators or building
                  personal projects from scratch, I&apos;m motivated by understanding users,
                  solving meaningful problems, and crafting experiences that feel intuitive and
                  reliable.
                </p>
                <p className="mt-4 max-w-reading text-body-lg text-body">
                  Outside of design, you&apos;ll usually find me at aerial classes, hiking,
                  reading, or working on my next side project.
                </p>
                <Button href="/about" variant="secondary" className="mt-6">
                  More about me
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-16 sm:py-24">
        <div className="mx-auto max-w-content px-6 text-center">
          <SectionHeading>Let&apos;s work together.</SectionHeading>
          <p className="mx-auto mt-4 max-w-reading text-body-lg text-body">
            Open to Product Designer opportunities — I enjoy untangling complex problems and
            designing intuitive experiences.
          </p>
          <Button href="/contact" className="mt-8">
            Get in touch
          </Button>
        </div>
      </section>
    </div>
  );
}
