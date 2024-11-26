import Image from 'next/image'
import Link from 'next/link'
import { fetchHomepage } from '@/util/homepage'
import { Trip } from '@/app/types'

function DealCard({ trip }: { trip: Trip }) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="relative h-48">
        <Image src={trip.mainImage} alt={trip.title} layout="fill" objectFit="cover" />
      </div>
      <div className="p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-primary">{trip.title}</h3>
        <p className="mt-2 text-sm text-gray-600">{trip.description}</p>
        <p className="mt-4 text-2xl font-bold text-accent">${trip.price}</p>
        <Link 
          href={`/trip/${trip.slug.current}`} 
          className="mt-4 inline-flex items-center px-3 sm:px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary transition duration-150 ease-in-out"
        >
          Book Now
        </Link>
      </div>
    </div>
  )
}

export default async function CurrentDeals() {
  const homepage = await fetchHomepage()
  const { featuredTrips } = homepage

  return (
    <section className="py-8 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-primary">Current Deals</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTrips.map((trip: Trip) => (
            <DealCard key={trip._id} trip={trip} />
          ))}
        </div>
      </div>
    </section>
  )
}