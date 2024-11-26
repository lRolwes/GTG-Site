import { Trip } from './trip'
import { Destination } from './destination'

export interface Homepage {
  _id: string;
  featuredTrips: Trip[];
  featuredDestinations: Destination[];
} 