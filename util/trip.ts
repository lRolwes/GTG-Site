import { client } from './sanity-client';

export async function fetchTripBySlug(slug: string) {
  return await client.fetch(
    `*[_type == "trip" && slug.current == "${slug}"][0]{
      _id,
      title,
      slug,
      "mainImage": mainImage.asset->url,
      "images": images[].asset->url,
      description,
      longDescription,
      tripType,
      startDate,
      endDate,
      price,
      category->,
      destination->
    }`
  );
}

export async function fetchTripsByType(type: string) {
  return await client.fetch(
    `*[_type == "trip" && tripType == "${type}"]{
      _id,
      title,
      slug,
      "mainImage": mainImage.asset->url,
      description,
      price,
      startDate,
      endDate,
      category->,
      destination->
    }`
  );
}

export async function fetchAllTrips() {
  return await client.fetch(`*[_type == "trip"]{
      _id,
      title,
      slug,
      "mainImage": mainImage.asset->url,
      description,
      category->,
      tripType,
    }`);
}