import { client } from './sanity-client';

export async function fetchBlogPage() {
  return await client.fetch(
    `*[_type == "blogPage"][0]{
      _id,
      "featuredPosts": featuredPosts[]->{
        _id,
        title,
        slug,
        "mainImage": mainImage.asset->url,
        author,
        publishedAt,
        body
      }
    }`
  );
}

export async function fetchBlogPostBySlug(slug: string) {
  return await client.fetch(
    `*[_type == "blogPost" && slug.current == "${slug}"][0]{
      _id,
      title,
      slug,
      author,
      "mainImage": mainImage.asset->url,
      body,
      publishedAt
    }`
  );
}

export async function fetchAllBlogPosts() {
  return await client.fetch(
    `*[_type == "blogPost"] | order(publishedAt desc){
      _id,
      title,
      slug,
      "mainImage": mainImage.asset->url,
      author,
      publishedAt
    }`
  );
} 