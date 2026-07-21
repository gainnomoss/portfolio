import type { Metadata } from "next";
import { getAllProjects } from "@/lib/content";
import { ProjectCard } from "@/components/ui/project-card";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected product design case studies by Ke Er Zhang.",
};

export default function WorkPage() {
  const projects = getAllProjects();

  return (
    <div className="mx-auto max-w-content px-6 py-16 sm:py-24">
      <h1 className="text-display-lg text-ink">Work</h1>
      <p className="mt-4 max-w-reading text-body-lg text-body">
        Selected product design case studies
      </p>

      <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2">
        {projects.map((project, index) => (
          <Reveal key={project.slug} delay={index * 0.05}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
