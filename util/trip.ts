import { client } from './sanity-client';

export async function fetchTripBySlug(slug: string) {
  const trip = await client.fetch(
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
  return trip;
}

export async function fetchTripsByType(type: string) {
  console.log(type);
  const trips = await client.fetch( 
    `*[_type == "trip" && tripType == "${type}"]{
      _id,
      title,
      slug,
      "mainImage": mainImage.asset->url,
      description,
      tripType,
      price,
      startDate,
      endDate,
      category->,
      destination->
    }`
  );
  console.log(trips);
  return trips;
} 

export async function fetchAllTrips() {
  return await client.fetch(`*[_type == "trip"]{
      _id,
      title,
      slug,
      "mainImage": mainImage.asset->url,
      description,
      tripType,
    }`);
}