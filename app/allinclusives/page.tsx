import Image from 'next/image'
import Link from 'next/link'
import { Umbrella, Utensils, Wifi, Dumbbell } from 'lucide-react'
import Header from '../components/Header'
import { Footer } from '../components/Footer'
import { fetchAllCategories } from '@/util/category'
import { fetchTripsByType } from '@/util/trip'
import AllInclusivesContent from '../components/AllInclusivesContent'

export const metadata = {
  title: 'All-Inclusive Luxury Getaways | Gtg Vacations',
  description: 'Looking for the best all-inclusive vacation packages from Saint Louis? GTG Vacations offers tailored all-inclusive travel experiences with flights, hotels, meals, and activities. Book your dream getaway today!',
}

export default async function AllInclusivesPage() {
  const [categories, trips] = await Promise.all([
    fetchAllCategories(),
    fetchTripsByType('allInclusive')
  ])

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] mt-12">
          <Image
            src="/all-inclusive-hero.jpg"
            alt="Luxurious all-inclusive resort"
            layout="fill"
            objectFit="cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              All-Inclusive Luxury Getaways
            </h1>
            <p className="text-xl sm:text-2xl text-white max-w-2xl mx-auto">
              Indulge in worry-free vacations at our handpicked all-inclusive resorts
            </p>
          </div>
        </div>

        <AllInclusivesContent 
          initialTrips={trips} 
          initialCategories={categories}
        />

        {/* Why Choose Our All-Inclusive Resorts */}
        <section className="py-16 bg-[#23395D] text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Our All-Inclusive Resorts</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <FeatureCard
                icon={<Utensils className="h-10 w-10" />}
                title="Gourmet Dining"
                description="Enjoy unlimited access to world-class restaurants and bars."
              />
              <FeatureCard
                icon={<Umbrella className="h-10 w-10" />}
                title="Stunning Beaches"
                description="Relax on pristine beaches with crystal-clear waters."
              />
              <FeatureCard
                icon={<Wifi className="h-10 w-10" />}
                title="Modern Amenities"
                description="Stay connected with high-speed Wi-Fi and state-of-the-art facilities."
              />
              <FeatureCard
                icon={<Dumbbell className="h-10 w-10" />}
                title="Activities & Entertainment"
                description="Enjoy a wide range of activities and nightly entertainment."
              />
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-[#75D8D1]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-[#23395D] mb-6">Ready for Your All-Inclusive Escape?</h2>
            <p className="text-xl text-[#23395D] mb-8 max-w-2xl mx-auto">
              Let us help you find the perfect all-inclusive resort for your dream vacation. Our travel experts are ready to create your ideal getaway.
            </p>
            <Link 
              href="/contact"
              className="inline-block bg-[#23395D] text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-[#E8791D] transition duration-300"
            >
              Plan Your Getaway
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
