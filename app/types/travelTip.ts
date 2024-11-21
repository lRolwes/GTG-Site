export interface TravelTip {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  body: string[]; // Portable Text
  mainImage: string;
  category: 'food' | 'packing' | 'flight' | 'photography' | 'beach' | 'budget' | 'health' | 'culture';
} 