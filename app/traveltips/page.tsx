import Image from 'next/image'
import Link from 'next/link'
import { Utensils, Luggage, Plane, Camera, Sun, CreditCard, Heart, Globe } from 'lucide-react'
import Header from '../components/Header'
import { Footer } from '../components/Footer'
import { fetchAllTravelTips } from '@/util/travel-tip'
import { TravelTip } from '../types'

export const metadata = {
  title: "Travel Tips & Advice | GTG Vacations",
  description: "Whether you&apos;re a seasoned globetrotter or planning your first adventure, our travel tips will help you make the most of your journeys."
}
// Map categories to icons
const categoryIcons = {
  food: Utensils,
  packing: Luggage,
  flight: Plane,
  photography: Camera,
  beach: Sun,
  budget: CreditCard,
  health: Heart,
  culture: Globe,
} as const

export default async function TravelTipsPage() {
  const travelTips = await fetchAllTravelTips()

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-[40vh] sm:h-[50vh] lg:h-[60vh]">
          <Image
            src="/travel-tips-hero.jpg"
            alt="Travel essentials and map"
            layout="fill"
            objectFit="cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white text-center">
              Travel Tips & Advice
            </h1>
          </div>
        </div>

        {/* Intro Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-accent mb-6">Enhance Your Travel Experience</h2>
              <p className="text-xl text-gray-700">
                Whether you&apos;re a seasoned globetrotter or planning your first adventure, our travel tips will help you make the most of your journeys. Explore our curated advice to travel smarter, safer, and more enjoyably.
              </p>
            </div>
          </div>
        </section>

        {/* Travel Tips Grid */}
        <section className="py-12 sm:py-16 lg:py-20 bg-secondary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {travelTips.map((tip: TravelTip) => {
                const IconComponent = categoryIcons[tip.category]
                return (
                  <TipCard 
                    key={tip._id}
                    title={tip.title}
                    description={tip.description}
                    icon={<IconComponent className="h-8 w-8" />}
                    link={`/traveltips/${tip.slug.current}`}
                  />
                )
              })}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-12 sm:py-16 lg:py-20 bg-primary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Stay Updated with Travel Tips</h2>
              <p className="text-xl text-white mb-8">
                Subscribe to our newsletter for the latest travel tips, destination guides, and exclusive offers.
              </p>
              <form className="flex flex-col sm:flex-row justify-center gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-accent text-white rounded-full font-semibold hover:bg-secondary transition duration-300"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function TipCard({ 
  title, 
  description, 
  icon, 
  link 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
  link: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="text-accent mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-accent mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <Link 
          href={link}
          className="inline-block bg-accent text-white font-medium py-2 px-4 rounded hover:bg-secondary transition duration-300"
        >
          Read More
        </Link>
      </div>
    </div>
  )
}
