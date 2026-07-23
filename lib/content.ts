import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Project, ProjectFrontmatter } from "@/lib/types";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");
const ABOUT_PATH = path.join(process.cwd(), "content", "about.mdx");

function readProject(slug: string): Project {
  const raw = fs.readFileSync(path.join(PROJECTS_DIR, `${slug}.mdx`), "utf8");
  const { data, content } = matter(raw);
  const fm = data as ProjectFrontmatter;

  return {
    slug,
    title: fm.title,
    subtitle: fm.subtitle,
    company: fm.company,
    type: fm.type,
    tags: fm.tags ?? [],
    thumbnail: fm.thumbnail ?? null,
    thumbnailFit: fm.thumbnailFit ?? "cover",
    thumbnailAnimation: fm.thumbnailAnimation ?? null,
    thumbnailAnimationLoop: fm.thumbnailAnimationLoop ?? true,
    thumbnailFloat: fm.thumbnailFloat ?? false,
    thumbnailShadow: fm.thumbnailShadow ?? true,
    protected: fm.protected ?? false,
    comingSoon: fm.comingSoon ?? false,
    order: fm.order ?? 999,
    content,
  };
}

export function getAllProjects(): Project[] {
  const slugs = fs
    .readdirSync(PROJECTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));

  return slugs.map(readProject).sort((a, b) => a.order - b.order);
}

export function getProjectBySlug(slug: string): Project | null {
  const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return readProject(slug);
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((project) => !project.comingSoon);
}

export function getAbout(): { photo: string; photoDark: string; content: string } {
  const raw = fs.readFileSync(ABOUT_PATH, "utf8");
  const { data, content } = matter(raw);
  return {
    photo: (data.photo as string) ?? "",
    photoDark: (data.photoDark as string) ?? "",
    content,
  };
}
