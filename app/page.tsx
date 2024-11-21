import Image from 'next/image'
import Link from 'next/link'
import { fetchHomepage } from '@/util/homepage'
import { Trip, Destination } from './types'
import Header from './components/Header'
import { Footer } from './components/Footer'

export default async function Home() {
  const homepage = await fetchHomepage()
  const { featuredTrips, featuredDestinations } = homepage

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-[60vh] sm:h-[70vh] lg:h-[80vh]">
          <Image
            src="/hero-image.jpg"
            alt="Beautiful travel destination"
            layout="fill"
            objectFit="cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Your Dream Vacation Awaits
            </h1>
            <p className="text-xl sm:text-2xl text-white max-w-2xl mb-8">
              Discover amazing destinations and create unforgettable memories
            </p>
            <Link
              href="/destinations"
              className="bg-[#E8791D] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#23395D] transition duration-300"
            >
              Explore Destinations
            </Link>
          </div>
        </div>

        {/* Featured Trips Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-[#23395D] text-center mb-12">Featured Trips</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {featuredTrips.map((trip: Trip) => (
                <div key={trip._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={trip.mainImage}
                      alt={trip.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-[#23395D] mb-2">{trip.title}</h3>
                    <p className="text-gray-600 mb-4">{trip.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-[#E8791D]">${trip.price}</span>
                      <Link
                        href={`/trip/${trip.slug.current}`}
                        className="bg-[#75D8D1] text-[#23395D] px-4 py-2 rounded hover:bg-[#23395D] hover:text-white transition duration-300"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Destinations Section */}
        <section className="py-16 bg-[#F8F9FA]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-[#23395D] text-center mb-12">Popular Destinations</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {featuredDestinations.map((destination: Destination) => (
                <div key={destination._id} className="relative h-64 group overflow-hidden rounded-lg">
                  <Image
                    src={destination.heroImage}
                    alt={destination.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-30" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Link
                      href={`/destination/${destination.slug.current}`}
                      className="text-white text-xl font-bold text-center hover:underline"
                    >
                      {destination.name}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-[#75D8D1]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-[#23395D] mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl text-[#23395D] mb-8 max-w-2xl mx-auto">
              Let us help you plan the perfect vacation. Our travel experts are ready to create your dream getaway.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-[#23395D] text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-[#E8791D] transition duration-300"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
