export interface TimelineEntry {
  label: string;
  title: string;
  description: string;
}

export interface Project {
  slug: string;
  title: string;
  company: string;
  summary: string;
  type: string;
  tags: string[];
  thumbnail: string | null;
  protected: boolean;
  comingSoon: boolean;
  order: number;
  content: string;
}

export interface ProjectFrontmatter {
  title: string;
  company: string;
  summary: string;
  type: string;
  tags: string[];
  thumbnail?: string;
  protected?: boolean;
  comingSoon?: boolean;
  order?: number;
}
