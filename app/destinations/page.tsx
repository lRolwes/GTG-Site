import { Metadata } from 'next'
import { DestinationsContent } from '../components/DestinationsContent'

export const metadata: Metadata = {
  title: 'Destinations | GTG Vacations',
  description: "Explore the world with GTG Vacations! From tropical escapes to cultural adventures, discover the best vacation experiences. Whether you're looking for beaches, cities, or unique experiences, we've got the perfect getaway for you.",
}

export default function DestinationsPage() {
  return <DestinationsContent />
}