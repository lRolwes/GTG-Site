import {  fetchAllTrips, fetchTripBySlug } from '@/util/trip'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { Calendar, MapPin, DollarSign, Tag } from 'lucide-react'
import Header from '@/app/components/Header'
import { Footer } from '@/app/components/Footer'
import Link from 'next/link'
import { Trip } from '@/app/types'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const trip = await fetchTripBySlug(params.slug)
  
  if (!trip) {
    return {
      title: 'Trip Not Found',
    }
  }

  return {
    title: `${trip.title} | GTG Vacations`,
    description: trip.description,
    openGraph: {
      title: trip.title,
      description: trip.description,
      images: [
        {
          url: trip.mainImage,
          width: 1200,
          height: 630,
          alt: trip.title,
        }
      ],
      type: 'website',
      siteName: 'GTG Vacations',
    },
    twitter: {
      card: 'summary_large_image',
      title: trip.title,
      description: trip.description,
      images: [trip.mainImage],
    }
  }
}

export async function generateStaticParams() {
  const trips = await fetchAllTrips()
  return trips.map((trip: Trip) => ({
    slug: trip.slug.current.toString()
  }))
}

export default async function TripPage({ params }: { params: { slug: string } }) {
  const trip = await fetchTripBySlug(params.slug)

 
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] mt-12">
          <Image
            src={trip.mainImage}
            alt={trip.title}
            layout="fill"
            objectFit="cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              {trip.title}
            </h1>
            <p className="text-xl text-white max-w-2xl">
              {trip.description}
            </p>
          </div>
        </div>

        {/* Trip Details */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Calendar className="h-6 w-6 text-[#23395D]" />
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-semibold text-[#23395D]">
                    {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <MapPin className="h-6 w-6 text-[#23395D]" />
                <div>
                  <p className="text-sm text-gray-600">Destination</p>
                  <p className="font-semibold text-[#23395D]">{trip.destination.name}</p>
                </div>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Tag className="h-6 w-6 text-[#23395D]" />
                <div>
                  <p className="text-sm text-gray-600">Category</p>
                  <p className="font-semibold text-[#23395D]">{trip.category.name}</p>
                </div>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <DollarSign className="h-6 w-6 text-[#23395D]" />
                <div>
                  <p className="text-sm text-gray-600">Price</p>
                  <p className="font-semibold text-[#23395D]">${trip.price}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trip Description */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto prose prose-lg text-[#23395D] bg-white">
              <PortableText value={trip.longDescription} />
            </div>
          </div>
        </section>

        {/* Image Gallery */}
        {trip.images && trip.images.length > 0 && (
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-[#23395D] mb-8 text-center">Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trip.images.map((image: string, index: number) => (
                  <div key={index} className="relative h-64 rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`${trip.title} gallery image ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Call to Action */}
        <section className="py-16 bg-[#75D8D1]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-[#23395D] mb-6">Ready to Book This Trip?</h2>
            <p className="text-xl text-[#23395D] mb-8 max-w-2xl mx-auto">
              Contact us to secure your spot on this amazing journey. Our travel experts are ready to help you plan your perfect vacation.
            </p>
            <Link 
              href="/contact"
              className="inline-block bg-[#23395D] text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-[#E8791D] transition duration-300"
            >
              Book Now
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
} 