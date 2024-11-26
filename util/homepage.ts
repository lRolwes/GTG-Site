import { client } from './sanity-client';

export async function fetchHomepage() {
  return await client.fetch(
    `*[_type == "homepage"][0]{
      _id,
      "featuredTrips": featuredTrips[]->{
        _id,
        title,
        slug,
        "mainImage": mainImage.asset->url,
        description,
        price,
        tripType
      },
      "featuredDestinations": featuredDestinations[]->{
        _id,
        name,
        slug,
        "heroImage": heroImage.asset->url,
        heroTitle
      }
    }`
  );
} 