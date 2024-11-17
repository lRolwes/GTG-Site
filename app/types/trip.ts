import { Category } from './category'
import { Destination } from './destination'

export interface Trip {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: string;
  images: string[];
  description: string;
  longDescription: string[]; // Portable Text
  tripType: 'groupTrip' | 'cruise' | 'allInclusive' | 'other';
  startDate: string;
  endDate: string;
  price: number;
  category: Category;
  destination: Destination;
} 