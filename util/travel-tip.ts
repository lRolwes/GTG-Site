import { client } from './sanity-client';

export async function fetchTravelTipBySlug(slug: string) {
  return await client.fetch(
    `*[_type == "travelTip" && slug.current == "${slug}"][0]{
      _id,
      title,
      slug,
      description,
      "mainImage": mainImage.asset->url,
      paragraphs,
      category
    }`
  );
}

export async function fetchTravelTipsByCategory(category: string) {
  return await client.fetch(
    `*[_type == "travelTip" && category == "${category}"]{
      _id,
      title,
      slug,
      description,
      "mainImage": mainImage.asset->url,
      category
    }`
  );
}

export async function fetchAllTravelTips() {
  return await client.fetch(
    `*[_type == "travelTip"]{
      _id,
      title,
      slug,
      description,
      "mainImage": mainImage.asset->url,
      category
    }`
  );
} 