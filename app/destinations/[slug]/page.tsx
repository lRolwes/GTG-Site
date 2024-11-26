import Image from 'next/image'
import Link from 'next/link'
import { Josefin_Sans } from 'next/font/google'
import Header from '@/app/components/Header'
import { Footer } from '@/app/components/Footer'
import { Trip } from '@/app/types/trip'
import { Attraction, Destination } from '@/app/types/destination'
import {  fetchAllDestinations, fetchDestinationBySlug } from '@/util/destination'
import { Palmtree, Umbrella, Music, UtensilsCrossed, MapPin } from 'lucide-react'


const josefinSans = Josefin_Sans({ subsets: ['latin'] })

export async function generateStaticParams() {
  const destinations = await fetchAllDestinations()
  //console.log('Generating paths for:', destinations.map((d: Destination) => ({
  //  slug: d.slug.current,
  //  fullPath: `/destinations/${d.slug.current}`
  //})))
  
  return destinations.map((destination: Destination) => ({
    slug: destination.slug.current.toString()
  }))
}
export async function generateMetadata({ params }: { params: { slug: string } }) {
  //console.log('Generating metadata for slug:', params.slug)
  const destination = await fetchDestinationBySlug(params.slug)
  return {
    title: destination.name,
    description: destination.aboutDescription[0]? destination.aboutDescription[0] : ""
  }
}
export default async function DestinationPage({ params }: { params: { slug: string } }) {
  const destination = await fetchDestinationBySlug(params.slug);
  console.log(destination);
  
  // else {
  //   return <div>{destination.heroTitle}</div>
  // }

  return (
    <div className={`bg-[#CBBEA4] min-h-screen ${josefinSans.className}`}>
      <Header />
      {/* Hero Section */}
      <div className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] mt-12">
        <Image
          src={destination.heroImage}
          alt={`Beautiful view of ${destination.name}`}
          layout="fill"
          objectFit="cover"
          className="fixed"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white text-center">
            {destination.heroTitle}
          </h1>
        </div>
      </div>

      {/* About Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#E8791D] mb-6">{destination.aboutTitle}</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              {destination.aboutDescription? destination.aboutDescription.map((paragraph: string, index: number) => (
                <p key={index} className="text-lg text-gray-700 mb-4">
                  {paragraph}
                </p>
              )) : <></>}
            </div>
            {destination.aboutImage && <div className="relative h-64 sm:h-80 md:h-96">
              <Image
                src={destination.aboutImage}
                alt={`Scenic view of ${destination.name}`}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>}
          </div>
        </div>
      </section>

      {/* Attractions Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#75D8D1]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-10 text-center">Top Attractions</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {destination.attractions && destination.attractions.map((attraction: Attraction, index: number) => (
              <AttractionCard
                key={index}
                title={attraction.title || ''}
                description={attraction.description || ''}
                type={"beach"}
              />
              
            ))}
          </div>
        </div>
      </section>

      {/* Related Trips Section */}
      {destination.trips && destination.trips.length > 0 && (
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#23395D] mb-10 text-center">
              Available Trips to {destination.name}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {destination.trips.map((trip: Trip) => (
                <TripCard key={trip._id} trip={trip} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#E8791D]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">{destination.ctaTitle}</h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            {destination.ctaDescription}
          </p>
          <Link 
            href={destination.ctaButtonLink}
            className="inline-block bg-[#F9C74F] text-[#E8791D] font-bold py-3 px-8 rounded-full text-lg hover:bg-[#75D8D1] hover:text-white transition duration-300"
          >
            {destination.ctaButtonText}
          </Link>
        </div>
      </section>
      <Footer />

     
    </div>
  )
}



function AttractionCard({ title, description, type }: Attraction) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-4">
        <div className="text-[#E8791D] mr-3">
          {type=="food"? <UtensilsCrossed/> : type=="destination" ? <MapPin/> : type=="beach" ? <Umbrella/> : type=="nature" ? <Palmtree/> : type=="music" ? <Music/> : <></>}
        </div>
        <h3 className="text-xl font-semibold text-[#E8791D]">{title}</h3>
      </div>
      <p className="text-gray-700">{description}</p>
    </div>
  )
}

function TripCard({ trip }: { trip: Trip }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-[#75D8D1]">
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
          <span className="text-2xl font-bold text-[#E8791D]">${trip.price}</span>
          <Link 
            href={`/trip/${trip.slug.current}`}
            className="inline-block bg-[#75D8D1] text-[#23395D] font-medium py-2 px-4 rounded hover:bg-[#23395D] hover:text-white transition duration-300"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  )
}
