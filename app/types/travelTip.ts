export interface TravelTip {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  paragraphs: { title: string; content: string }[];
  mainImage: string;
  category: 'food' | 'packing' | 'flight' | 'photography' | 'beach' | 'budget' | 'health' | 'culture';
} 