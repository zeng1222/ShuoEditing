export interface Category {
  _id: string;
  name: string;
  slug: string;
}

export interface Work {
  _id: string;
  slug: string;
  title: string;
  client?: string;
  year: number;
  category: Category;
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
  experience?: { year: string; description: string }[];
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
  location?: string;
  instagram?: string;
  vimeo?: string;
}
