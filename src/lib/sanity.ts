import { createClient, type SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type {
  About,
  Homepage,
  Service,
  FAQ,
  SiteSettings,
  Work,
  Category,
} from "./types";
import {
  sampleAbout,
  sampleCategories,
  sampleFAQs,
  sampleHomepage,
  sampleServices,
  sampleSite,
  sampleWorks,
} from "./sample-data";

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || "production";
const apiVersion = "2025-01-01";

export const isSanityConfigured = Boolean(projectId);

const viewerToken = import.meta.env.SANITY_VIEWER_TOKEN;

const publicClient: SanityClient | null = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: "published",
    })
  : null;

const previewClient: SanityClient | null = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      perspective: "previewDrafts",
      token: viewerToken,
      stega: {
        enabled: true,
        studioUrl: "/studio",
      },
    })
  : null;

export function getClient(preview = false): SanityClient | null {
  return preview ? previewClient : publicClient;
}

const builder = publicClient ? imageUrlBuilder(publicClient) : null;

export function urlFor(source: unknown) {
  if (!builder) return { url: () => "" };
  return builder.image(source as never);
}

export async function getHomepage(preview = false): Promise<Homepage> {
  const c = getClient(preview);
  if (!c) return sampleHomepage;
  const data = await c.fetch<Homepage | null>(
    `*[_type == "homepage"][0]{tagline, intro, showreelYoutubeId, showreelCaption}`,
  );
  return data ?? sampleHomepage;
}

export async function getAbout(preview = false): Promise<About> {
  const c = getClient(preview);
  if (!c) return sampleAbout;
  const data = await c.fetch<About | null>(
    `*[_type == "about"][0]{
      "headshot": headshot.asset->url,
      bio,
      experience,
      brands[]{name, "logo": logo.asset->url}
    }`,
  );
  return data ?? sampleAbout;
}

export async function getSiteSettings(preview = false): Promise<SiteSettings> {
  const c = getClient(preview);
  if (!c) return sampleSite;
  const data = await c.fetch<SiteSettings | null>(
    `*[_type == "siteSettings"][0]{siteName, email, location, instagram, vimeo}`,
  );
  return data ?? sampleSite;
}

export async function getCategories(preview = false): Promise<Category[]> {
  const c = getClient(preview);
  if (!c) return sampleCategories;
  const data = await c.fetch<Category[] | null>(
    `*[_type == "category"] | order(orderRank){
      _id, name, "slug": slug.current
    }`,
  );
  return data?.length ? data : sampleCategories;
}

export async function getServices(preview = false): Promise<Service[]> {
  const c = getClient(preview);
  if (!c) return sampleServices;
  const data = await c.fetch<Service[] | null>(
    `*[_type == "service"] | order(orderRank){
      _id, name, tagline, priceFrom, priceUnit, includes, deliveryTime, order
    }`,
  );
  return data?.length ? data : sampleServices;
}

export async function getFAQs(preview = false): Promise<FAQ[]> {
  const c = getClient(preview);
  if (!c) return sampleFAQs;
  const data = await c.fetch<FAQ[] | null>(
    `*[_type == "faq"] | order(orderRank){question, answer}`,
  );
  return data?.length ? data : sampleFAQs;
}

export async function getAllWorks(preview = false): Promise<Work[]> {
  const c = getClient(preview);
  if (!c) return sampleWorks;
  const data = await c.fetch<Work[] | null>(
    `*[_type == "work"] | order(orderRank){
      _id,
      "slug": slug.current,
      title, client, year, youtubeId,
      "category": category->{ _id, name, "slug": slug.current },
      "coverImage": coverImage.asset->url,
      excerpt, description, role, credits,
      featured, featuredOrder
    }`,
  );
  return data?.length ? data : sampleWorks;
}

export async function getFeaturedWorks(preview = false): Promise<Work[]> {
  const all = await getAllWorks(preview);
  return all
    .filter((w) => w.featured)
    .sort((a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99));
}

export async function getWorkBySlug(
  slug: string,
  preview = false,
): Promise<Work | null> {
  const all = await getAllWorks(preview);
  return all.find((w) => w.slug === slug) ?? null;
}
