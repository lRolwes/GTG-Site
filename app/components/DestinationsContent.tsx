'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Search, Globe } from 'lucide-react'
import Header from '../components/Header'
import { Footer } from '../components/Footer'
import { fetchAllCategories } from '@/util/category'
import { fetchAllDestinations } from '@/util/destination'
import { Category, Destination} from '../types'
import { useEffect, useState } from 'react'

export function DestinationsContent() {
  const [categories, setCategories] = useState<Category[]>([])
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([])

  useEffect(() => {
    const loadData = async () => {
      const fetchedCategories: Category[] = await fetchAllCategories()
      const fetchedDestinations: Destination[] = await fetchAllDestinations()
      console.log(fetchedCategories || "No categories found")
      setCategories(fetchedCategories)
      setDestinations(fetchedDestinations)
      setFilteredDestinations(fetchedDestinations)
    }
    loadData()
  }, [])

  useEffect(() => {
    if(selectedCategory === 'All') {
      setFilteredDestinations(destinations)
    } else {
      setFilteredDestinations(destinations.filter((destination: Destination) => destination.category?.name == selectedCategory))
    }
  }, [destinations, selectedCategory])

  return (
    <div className="bg-[#CBBEA4] min-h-screen">
      <Header />
      {/* Hero Section */}
      <div className="relative h-[40vh] sm:h-[50vh] lg:h-[60vh] mt-12">
        <Image
          src="/destinations-hero.jpg"
          alt="Various travel destinations"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white text-center">
            Explore Our Destinations
          </h1>
        </div>
      </div>

      {/* Trip Type Filter */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#23395D] mb-8 text-center">Choose Your Adventure</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <TypeButton 
              type="All" 
              icon={<Search className="h-6 w-6" />}
              selectedType={selectedCategory}
              setSelectedType={setSelectedCategory}
            />
            {categories.map((type: Category) => (
              <TypeButton 
                key={type.name}
                type={type.name}
                icon={<Globe className="h-6 w-6" />}
                selectedType={selectedCategory}
                setSelectedType={setSelectedCategory}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredDestinations.map((destination: Destination) => {
              const destinationSlug = destination.slug?.current || destination.name.toLowerCase().replace(/\s+/g, '-');
              return (
                <DestinationCard 
                  key={destination._id}
                  name={destination.name}
                  category={destination.category?.name || ''}
                  image={destination.heroImage}
                  slug={destinationSlug}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#E8791D]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Choose your dream destination and let us take care of the rest. Your perfect vacation is just a click away!
          </p>
          <Link 
            href="/contact" 
            className="inline-block bg-white text-[#E8791D] font-bold py-3 px-8 rounded-full text-lg hover:bg-[#75D8D1] hover:text-white transition duration-300"
          >
            Plan Your Trip Now
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  )
}

function DestinationCard({ 
  name, 
  category, 
  image,
  slug 
}: { 
  name: string; 
  category: string; 
  image: string;
  slug: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-48 sm:h-64">
        <Image
          src={image}
          alt={`${name}, ${category}`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-[#E8791D]">{name}</h3>
        <p className="text-gray-600">{category}</p>
        <Link 
          href={`/destinations/${slug}`}
          className="mt-4 inline-block bg-[#F9C74F] text-[#E8791D] font-medium py-2 px-4 rounded hover:bg-[#75D8D1] hover:text-white transition duration-300"
        >
          Explore
        </Link>
      </div>
    </div>
  )
}

function TypeButton({ 
  type, 
  icon, 
  selectedType, 
  setSelectedType 
}: { 
  type: string; 
  icon: React.ReactNode; 
  selectedType: string; 
  setSelectedType: (type: string) => void;
}) {
  const isSelected = type === selectedType

  return (
    <button
      onClick={() => setSelectedType(type)}
      className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition duration-300 ${
        isSelected 
          ? 'bg-[#23395D] text-white' 
          : 'bg-white text-[#23395D] hover:bg-[#75D8D1] hover:text-white'
      }`}
    >
      {icon}
      <span className="ml-2">{type || "All"}</span>
    </button>
  )
 }