import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/content";

export default function robots(): MetadataRoute.Robots {
  const disallow = getAllProjects()
    .filter((project) => project.protected || project.comingSoon)
    .map((project) => `/work/${project.slug}`);

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow,
    },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/sitemap.xml`,
  };
}
