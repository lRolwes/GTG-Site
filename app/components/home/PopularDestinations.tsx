import Image from 'next/image'
import Link from 'next/link'
import { fetchHomepage } from '@/util/homepage'
import { Destination } from '@/app/types'

function DestinationCard({ destination }: { destination: Destination }) {
  const destinationSlug = destination.slug?.current || destination.name.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="relative h-40 sm:h-48 md:h-64 rounded-lg overflow-hidden group">
      <Image src={destination.heroImage} alt={destination.name} layout="fill" objectFit="cover" />
      <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition duration-300" />
      <div className="absolute inset-0 flex items-center justify-center">
        <Link 
          href={`/destinations/${destinationSlug}`}
          className="text-lg sm:text-xl md:text-2xl font-bold text-white hover:underline"
        >
          {destination.name}
        </Link>
      </div>
    </div>
  )
}

export default async function PopularDestinations() {
  const homepage = await fetchHomepage()
  const { featuredDestinations } = homepage

  return (
    <section className="py-8 sm:py-12 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Popular Destinations</h2>
        <div className="mt-6 grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {featuredDestinations.map((destination: Destination) => (
            <DestinationCard key={destination._id} destination={destination} />
          ))}
        </div>
      </div>
    </section>
  )
}