import { Category } from './category';
import { Trip } from './trip';

export interface Attraction {
  title: string;
  description: string;
  type: 'beach' | 'music' | 'destination' | 'nature' | 'food';
}

export interface Destination {
  _id: string;
  slug: { current: string };
  name: string;
  heroImage: string;
  heroTitle: string;
  aboutTitle: string;
  aboutDescription: string[];
  aboutImage: string;
  attractions: Attraction[];
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonText: string;
  ctaButtonLink: string;
  category: Category;
  trips: Trip[];
}
