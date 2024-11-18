'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {  Umbrella, Utensils, Wifi, Dumbbell, Search, Globe } from 'lucide-react'
import Header from '../components/Header'
import { Footer } from '../components/Footer'
import { Category, Trip } from '../types'
import { fetchTripsByType } from '@/util/trip'
import { fetchAllCategories } from '@/util/category'



export default function AllInclusiveResortsPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [trips, setTrips] = useState<Trip[]>([])
  const [selectedType, setSelectedType] = useState('All')
  const [filteredTrips, setFilteredTrips] = useState<Trip[]>([])
  useEffect(() => {
    const loadData = async () => {
      const fetchedCategories: Category[] = await fetchAllCategories()
      const fetchedTrips: Trip[] = await fetchTripsByType('allInclusive')
      const groupTrips = fetchedTrips
      console.log(groupTrips)
      console.log(fetchedCategories || "No categories found")
      setCategories(fetchedCategories)
      setTrips(groupTrips)
      setFilteredTrips(groupTrips)
    }
    loadData()
  }, [])

  useEffect(() => {
  
    if(selectedType === 'All') {
      setFilteredTrips(trips)
    } else {
      setFilteredTrips(trips.filter((trip: Trip) => trip.category.name == selectedType))
    }
  }, [trips, selectedType])

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

        {/* Destination Filter */}
        <section className="py-12 bg-[#75D8D1]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-[#23395D] mb-8 text-center">Choose Your Paradise</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <TypeButton 
                type="All" 
                icon={<Search className="h-6 w-6" />}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
              />
              {categories.map((type: Category) => (
                <TypeButton 
                  key={type.name}
                  type={type.name}
                  icon={<Globe className="h-6 w-6" />}
                  selectedType={selectedType}
                  setSelectedType={setSelectedType}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4  sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-[#23395D] mb-12 text-center">Featured All-Inclusive Resorts</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredTrips.map((trip: Trip) => (
                <TripCard key={trip._id} trip={trip} />
              ))}
            </div>
          </div>
        </section>
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
function TripCard({ trip }: { trip: Trip }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-[#75D8D1]">
      <div className="relative h-48 sm:h-64">
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
          <span className="text-2xl font-bold text-[#E8791D]">{trip.price}</span>
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
          : 'bg-white text-[#23395D] hover:bg-[#23395D] hover:text-white'
      }`}
    >
      {icon}
      <span className="ml-2">{type || "All"}</span>
    </button>
  )
}
