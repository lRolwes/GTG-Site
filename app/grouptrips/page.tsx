import Image from 'next/image'
import Link from 'next/link'
import { Users, Compass, Calendar, DollarSign } from 'lucide-react'
import Header from '../components/Header'
import { Footer } from '../components/Footer'
import { fetchAllCategories } from '@/util/category'
import { fetchTripsByType } from '@/util/trip'
import GroupTripsContent from '../components/GroupTripsContent'

export const metadata = {
  title: "Group Trips | GTG Vacations",
  description: "Plan your next group trip with GTG Vacations! Whether it's a family reunion, corporate retreat, or friends getaway, we offer customized group travel packages to destinations around the world. Join like-minded travelers on expertly curated group trips around the world."
}
export default async function GroupTripsPage() {
  const [categories, trips] = await Promise.all([
    fetchAllCategories(),
    fetchTripsByType('groupTrip')
  ])

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] mt-12">
          <Image
            src="/group-trips-hero.jpg"
            alt="Group of travelers on an adventure"
            layout="fill"
            objectFit="cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              Unforgettable Group Adventures
            </h1>
            <p className="text-xl sm:text-2xl text-white max-w-2xl mx-auto">
              Join like-minded travelers on expertly curated group trips around the world
            </p>
          </div>
        </div>

        <GroupTripsContent 
          initialTrips={trips} 
          initialCategories={categories}
        />

        {/* Why Choose Our Group Trips */}
        <section className="py-16 bg-[#23395D] text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Our Group Trips</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <FeatureCard
                icon={<Users className="h-10 w-10" />}
                title="Like-Minded Travelers"
                description="Connect with fellow adventurers who share your interests."
              />
              <FeatureCard
                icon={<Compass className="h-10 w-10" />}
                title="Expert Guides"
                description="Travel with experienced guides who know the destinations inside out."
              />
              <FeatureCard
                icon={<Calendar className="h-10 w-10" />}
                title="Perfectly Planned"
                description="Enjoy stress-free travel with meticulously planned itineraries."
              />
              <FeatureCard
                icon={<DollarSign className="h-10 w-10" />}
                title="Great Value"
                description="Get more for your money with our group rates and inclusive packages."
              />
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-[#75D8D1]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-[#23395D] mb-6">Ready to Join the Adventure?</h2>
            <p className="text-xl text-[#23395D] mb-8 max-w-2xl mx-auto">
              Discover our upcoming group trips and find the perfect adventure for you. Our travel experts are ready to help you choose your ideal journey.
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
