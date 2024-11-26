import { client } from './sanity-client';

export async function fetchDestinationBySlug(slug: string) {
  return await client.fetch(
    `*[_type == "destination" && slug.current == "${slug}"][0]{
      _id,
      slug,
      name,
      "heroImage": heroImage.asset->url,
      heroTitle,
      aboutTitle,
      aboutDescription,
      "aboutImage": aboutImage.asset->url,
      attractions[]{
        title,
        description,
        type
      },
      ctaTitle,
      ctaDescription,
      ctaButtonText,
      ctaButtonLink,
      category->,
      "trips": trips[]->{
        _id,
        title,
        slug,
        "mainImage": mainImage.asset->url,
        description,
        price,
        tripType
      }
    }`
  );
}

export async function fetchAllDestinations() {
  return await client.fetch(
    `*[_type == "destination"]{
      _id,
      name,
      slug,
      "heroImage": heroImage.asset->url,
      heroTitle,
      category->
    }`
  );
}