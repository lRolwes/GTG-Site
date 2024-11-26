import { client } from './sanity-client';

export async function fetchCategoryBySlug(slug: string) {
  return await client.fetch(
    `*[_type == "category" && slug.current == "${slug}"][0]{
      _id,
      name,
      slug,
      description
    }`
  );
}

export async function fetchAllCategories() {
  return await client.fetch(
    `*[_type == "category"]{
      _id,
      name,
      slug,
      description
    }`
  );
} 