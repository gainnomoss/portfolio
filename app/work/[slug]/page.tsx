import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllProjects, getProjectBySlug } from "@/lib/content";
import { isProjectUnlocked, unlockProjectAction } from "@/lib/auth";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { PasswordGate } from "@/components/ui/password-gate";
import { Tag } from "@/components/ui/tag";

export function generateStaticParams() {
  return getAllProjects()
    .filter((project) => !project.comingSoon)
    .map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.subtitle,
    robots:
      project.protected || project.comingSoon ? { index: false, follow: false } : undefined,
    openGraph: {
      title: project.title,
      description: project.subtitle,
      images: project.thumbnail ? [project.thumbnail] : undefined,
    },
  };
}

export default async function CaseStudyPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { slug } = await params;
  const { error } = await searchParams;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  if (project.comingSoon) {
    return (
      <div className="mx-auto max-w-content px-6 py-32 text-center">
        <p className="font-mono text-label text-muted">Coming soon</p>
        <h1 className="mt-4 text-display-lg text-ink">{project.title}</h1>
        {project.subtitle && (
          <p className="mx-auto mt-3 max-w-reading text-body-lg text-body">
            {project.subtitle}
          </p>
        )}
        <p className="mx-auto mt-4 max-w-reading text-body-md text-body">
          This case study is being written up. Check back soon.
        </p>
      </div>
    );
  }

  if (project.protected && !(await isProjectUnlocked())) {
    return (
      <PasswordGate
        action={unlockProjectAction.bind(null, slug)}
        error={error === "1"}
        title={`"${project.title}" is password protected`}
      />
    );
  }

  return (
    <article>
      <header className="border-b border-border bg-canvas-subtle">
        <div className="mx-auto max-w-content px-6 py-16 sm:py-24">
          <p className="font-mono text-label text-muted">{project.company}</p>
          <h1 className="mt-4 max-w-reading text-display-lg text-ink">{project.title}</h1>
          {project.subtitle && (
            <p className="mt-3 max-w-reading text-body-lg text-body">{project.subtitle}</p>
          )}
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-content px-6 py-16 sm:py-24">
        <MDXRemote
          source={project.content}
          components={mdxComponents}
          options={{ blockJS: false }}
        />
      </div>
    </article>
  );
}
