export interface TimelineEntry {
  label: string;
  title: string;
  description: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  company: string;
  type: string;
  tags: string[];
  thumbnail: string | null;
  thumbnailFit: "cover" | "contain";
  thumbnailBg: "peach" | null;
  thumbnailAnimation: string | null;
  thumbnailAnimationLoop: boolean;
  thumbnailFloat: boolean;
  protected: boolean;
  comingSoon: boolean;
  order: number;
  content: string;
}

export interface ProjectFrontmatter {
  title: string;
  subtitle: string;
  company: string;
  type: string;
  tags: string[];
  thumbnail?: string;
  thumbnailFit?: "cover" | "contain";
  thumbnailBg?: "peach";
  thumbnailAnimation?: string;
  thumbnailAnimationLoop?: boolean;
  thumbnailFloat?: boolean;
  protected?: boolean;
  comingSoon?: boolean;
  order?: number;
}
