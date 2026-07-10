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
      <div className="aspect-[4/3] w-full overflow-hidden border-b border-border">
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt=""
            width={800}
            height={600}
            className="h-full w-full object-cover transition-transform duration-slow group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-canvas-subtle">
            <span className="font-mono text-label text-muted">Coming soon</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div>
          <h3 className="text-title-lg text-ink">{project.title}</h3>
          <p className="mt-1 text-body-sm text-muted">{project.company}</p>
        </div>
        <p className="text-body-sm text-body">{project.summary}</p>
        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {project.protected ? <Tag locked>Password protected</Tag> : null}
          {project.tags.slice(0, 3).map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
    </div>
  );

  if (project.comingSoon) {
    return <div aria-disabled="true">{content}</div>;
  }

  return (
    <Link
      href={`/work/${project.slug}`}
      className="block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
    >
      {content}
    </Link>
  );
}
