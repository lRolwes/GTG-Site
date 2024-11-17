export interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  author: string;
  mainImage: string;
  body: string[]; // Portable Text
  publishedAt: string;
} 