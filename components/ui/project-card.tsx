"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import type { Project } from "@/lib/types";
import { Tag } from "@/components/ui/tag";
import { ProjectThumbnail } from "@/components/ui/project-thumbnail";

export function ProjectCard({ project }: { project: Project }) {
  const [isHovered, setIsHovered] = useState(false);

  const content = (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={clsx(
        "group flex flex-col overflow-hidden rounded-lg bg-canvas-subtle transition-transform duration-base ease-standard md:flex-row md:items-center",
        !project.comingSoon && "hover:-translate-y-1.5"
      )}
    >
      <div className="relative shrink-0 overflow-hidden px-6 py-4 md:w-1/2">
        <div
          className={clsx(
            "relative flex aspect-[4/3] w-full items-center justify-center",
            !project.thumbnailAnimation && !project.thumbnailFloat && "overflow-hidden rounded-md",
            project.thumbnailBg === "peach" && "bg-thumbnail-peach"
          )}
        >
          {project.thumbnail ? (
            <ProjectThumbnail
              src={project.thumbnail}
              fit={project.thumbnailFit}
              animationSrc={project.thumbnailAnimation}
              animationLoop={project.thumbnailAnimationLoop}
              floating={project.thumbnailFloat}
              isHovered={isHovered}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-canvas-subtle">
              <span className="font-mono text-label text-muted">Coming soon</span>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-3 px-6 pb-6 pt-4 md:w-1/2">
        {project.protected ? (
          <Tag locked className="self-start">
            Password protected
          </Tag>
        ) : null}
        <div className="flex flex-col gap-1">
          <h3 className="text-title-lg text-ink">{project.title}</h3>
          <p className="text-body-sm text-muted">{project.company}</p>
        </div>
        <p className="text-body-sm text-body">{project.subtitle}</p>
        {project.tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        ) : null}
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
