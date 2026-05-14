export interface Category {
  _id: string;
  name: string;
  slug: string;
}

export type WorkFormat = "vertical" | "horizontal";

export interface Work {
  _id: string;
  slug: string;
  title: string;
  client?: string;
  year: number;
  category: Category;
  format: WorkFormat;
  youtubeId: string;
  coverImage?: string;
  excerpt?: string;
  description?: string;
  role?: string;
  credits?: { label: string; name: string }[];
  featured?: boolean;
  featuredOrder?: number;
}

export interface Homepage {
  tagline: string;
  intro?: string;
  showreelYoutubeId: string;
  showreelCaption?: string;
}

export interface About {
  headshot?: string;
  bio: string;
  yearsExperience: number;
  projectsCount: number;
  editsCount: number;
  services: { platform: string; format: string }[];
  brands?: { name: string; logo?: string }[];
}

export interface Service {
  _id: string;
  name: string;
  tagline?: string;
  priceFrom: number;
  priceUnit?: string;
  includes: string[];
  deliveryTime: string;
  order: number;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface SiteSettings {
  siteName: string;
  email: string;
  lineId?: string;
  location?: string;
  instagram?: string;
  vimeo?: string;
  contactTitle?: string;
  contactIntro?: string;
  contactResponseTime?: string;
}
