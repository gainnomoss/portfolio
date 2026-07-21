import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import type { Project } from "@/lib/types";
import { Tag } from "@/components/ui/tag";

export function ProjectCard({ project }: { project: Project }) {
  const content = (
    <div
      className={clsx(
        "group flex h-full flex-col overflow-hidden rounded-lg bg-canvas-subtle transition-transform duration-base",
        !project.comingSoon && "hover:-translate-y-1"
      )}
    >
      <div className="relative shrink-0 overflow-hidden px-6 py-4">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          {project.thumbnail ? (
            <Image
              src={project.thumbnail}
              alt=""
              width={800}
              height={600}
              className={clsx(
                "h-full w-full transition-transform duration-slow group-hover:scale-[1.02]",
                project.thumbnailFit === "contain" ? "object-contain" : "object-cover"
              )}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-canvas-subtle">
              <span className="font-mono text-label text-muted">Coming soon</span>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 px-6 pb-6 pt-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-title-lg text-ink">{project.title}</h3>
          <p className="text-body-sm text-muted">{project.company}</p>
        </div>
        <p className="text-body-sm text-body">{project.subtitle}</p>
        {project.protected ? (
          <div className="mt-auto flex flex-wrap gap-2">
            <Tag locked>Password protected</Tag>
          </div>
        ) : null}
      </div>
    </div>
  );

  if (project.comingSoon) {
    return (
      <div aria-disabled="true" className="h-full">
        {content}
      </div>
    );
  }

  return (
    <Link
      href={`/work/${project.slug}`}
      className="block h-full rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
    >
      {content}
    </Link>
  );
}
