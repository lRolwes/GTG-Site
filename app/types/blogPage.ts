import { BlogPost } from './blogPost'

export interface BlogPage {
  _id: string;
  featuredPosts: BlogPost[];
} 