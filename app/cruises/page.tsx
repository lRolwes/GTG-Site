import Image from 'next/image'
import Link from 'next/link'
import { Anchor, Utensils, Waves } from 'lucide-react'
import Header from '../components/Header'
import { Footer } from '../components/Footer'
import { fetchAllCategories } from '@/util/category'
import { fetchTripsByType } from '@/util/trip'
import CruisesContent from '../components/CruisesContent'
export const metadata = {
  title: "Cruises | GTG Vacations",
    description: "Set sail on the adventure of a lifetime with GTG Vacations! Explore top cruise destinations with exclusive packages, featuring stunning itineraries and unbeatable deals. Book your cruise today!"
    
}
export default async function CruisesPage() {
  const [categories, trips] = await Promise.all([
    fetchAllCategories(),
    fetchTripsByType('cruise')
  ])

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] mt-12">
          <Image
            src="/cruises-hero.jpg"
            alt="Luxury cruise ship"
            layout="fill"
            objectFit="cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              Explore the World by Sea
            </h1>
            <p className="text-xl sm:text-2xl text-white max-w-2xl mx-auto">
              Embark on unforgettable journeys with our curated selection of luxury cruises
            </p>
          </div>
        </div>

        <CruisesContent 
          initialTrips={trips} 
          initialCategories={categories}
        />

        {/* Why Choose Our Cruises */}
        <section className="py-16 bg-[#23395D] text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Our Cruises</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<Anchor className="h-10 w-10" />}
                title="Luxury Accommodations"
                description="Experience the epitome of comfort with our top-tier cabins and suites."
              />
              <FeatureCard
                icon={<Utensils className="h-10 w-10" />}
                title="World-Class Dining"
                description="Indulge in culinary delights prepared by renowned chefs from around the globe."
              />
              <FeatureCard
                icon={<Waves className="h-10 w-10" />}
                title="Exciting Excursions"
                description="Explore breathtaking destinations with our carefully curated shore excursions."
              />
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-[#75D8D1]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-[#23395D] mb-6">Ready to Set Sail?</h2>
            <p className="text-xl text-[#23395D] mb-8 max-w-2xl mx-auto">
              Let us help you find the perfect cruise for your next adventure. Our travel experts are ready to assist you in planning an unforgettable voyage.
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

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-[#75D8D1] rounded-lg shadow-lg p-6 text-center">
      <div className="text-[#23395D] flex justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-[#23395D] mb-2">{title}</h3>
      <p className="text-[#23395D]">{description}</p>
    </div>
  )
}