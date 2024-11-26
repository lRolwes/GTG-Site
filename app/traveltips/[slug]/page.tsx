import { fetchAllTravelTips, fetchTravelTipBySlug } from '@/util/travel-tip'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Utensils, Luggage, Plane, Camera, Sun, CreditCard, Heart, Globe } from 'lucide-react'
import Header from '@/app/components/Header'
import { Footer } from '@/app/components/Footer'
import { TravelTip } from '@/app/types/travelTip'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const travelTip = await fetchTravelTipBySlug(params.slug)
  console.log('Generating metadata for slug:', params.slug)
  console.log(travelTip)
  return {
    title: travelTip.title,
    description: "Read our latest travel tips for travel tips, destination guides, and travel inspiration."
  }
}
export async function generateStaticParams() {
  const travelTips = await fetchAllTravelTips()
  console.log('Generating paths for:', travelTips.map((t: TravelTip) => ({
   slug: t.slug.current.toString()
  })))
  
  return travelTips.map((travelTip: TravelTip) => ({
    slug: travelTip.slug.current.toString()
  }))
}

// Map categories to icons and colors
const categoryConfig = {
  food: { icon: Utensils, label: 'Food & Dining' },
  packing: { icon: Luggage, label: 'Packing Tips' },
  flight: { icon: Plane, label: 'Air Travel' },
  photography: { icon: Camera, label: 'Photography' },
  beach: { icon: Sun, label: 'Beach Tips' },
  budget: { icon: CreditCard, label: 'Budget Travel' },
  health: { icon: Heart, label: 'Health & Safety' },
  culture: { icon: Globe, label: 'Cultural Tips' },
} as const

export default async function TravelTipPage({ params }: { params: { slug: string } }) {
  const travelTip = await fetchTravelTipBySlug(params.slug)

  if (!travelTip) {
    notFound()
  }
  const CategoryIcon = categoryConfig[travelTip.category as keyof typeof categoryConfig].icon
  const categoryLabel = categoryConfig[travelTip.category as keyof typeof categoryConfig].label

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-[40vh] sm:h-[50vh] lg:h-[60vh] mt-12">
          <Image
            src={travelTip.mainImage}
            alt={travelTip.title}
            layout="fill"
            objectFit="cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <div className="flex items-center gap-2 mb-4">
              <CategoryIcon className="h-8 w-8 text-white" />
              <span className="text-white text-xl">{categoryLabel}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              {travelTip.title}
            </h1>
            <p className="text-xl text-white max-w-2xl">
              {travelTip.description}
            </p>
          </div>
        </div>

        {/* Content Section */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto prose prose-lg text-gray-700">
              {travelTip.paragraphs.map((paragraph: { title: string; content: string }, index: number) => (
                <div className="mb-8" key={index}>
                  <h1 className="text-2xl font-bold mb-4">{paragraph.title}</h1>
                  <p>{paragraph.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-[#75D8D1]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-[#23395D] mb-6">Want More Travel Tips?</h2>
              <p className="text-xl text-[#23395D] mb-8">
                Subscribe to our newsletter for regular updates on travel tips, destination guides, and exclusive offers.
              </p>
              <form className="flex flex-col sm:flex-row justify-center gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#23395D]"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#23395D] text-white rounded-full font-semibold hover:bg-[#E8791D] transition duration-300"
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