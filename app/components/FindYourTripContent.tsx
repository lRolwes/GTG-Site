'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {  Search, Globe } from 'lucide-react'
import Header from '../components/Header'
import { Footer } from '../components/Footer'
import { fetchAllTrips } from '@/util/trip'
import { Category, Trip } from '../types'
import { fetchAllCategories } from '@/util/category'

export default function FindYourTripContent() {
  const [categories, setCategories] = useState<Category[]>([])
  const [trips, setTrips] = useState<Trip[]>([])
  const [selectedType, setSelectedType] = useState('All')
  const [filteredTrips, setFilteredTrips] = useState<Trip[]>([])

  useEffect(() => {
    const loadData = async () => {
      const fetchedCategories: Category[] = await fetchAllCategories()
      const fetchedTrips: Trip[] = await fetchAllTrips()
      const groupTrips = fetchedTrips
      console.log(groupTrips)
      console.log(fetchedCategories || "No categories found")
      setCategories(fetchedCategories)
      setTrips(groupTrips)
      //setFilteredTrips(groupTrips)
    }
    loadData()
  }, [])

  useEffect(() => {
    if(selectedType === 'All') {
      setFilteredTrips(trips)
    } else {
      setFilteredTrips(trips.filter((trip: Trip) => trip.category.name === selectedType))
    }
  }, [trips, selectedType])

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
              Find Your Trip
            </h1>
            <p className="text-xl sm:text-2xl text-white max-w-2xl mx-auto">
              Find your dream trip with our curated selection cruises, resorts, and other excursions!
            </p>
          </div>
        </div>

        {/* Trip Type Filter */}
        <section className="py-12 bg-[#75D8D1]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-[#23395D] mb-8 text-center">Choose Your Adventure</h2>
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

      

        {/* Featured Trips */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4  sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-[#23395D] mb-12 text-center">Featured Trips</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredTrips.map((trip: Trip) => (
                <TripCard key={trip._id} trip={trip} />
              ))}
            </div>
          </div>
        </section>

      

        {/* Call to Action */}
        <section className="py-16 ">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-[#23395D] mb-6">Ready to Getaway?</h2>
            <p className="text-xl text-[#23395D] mb-8 max-w-2xl mx-auto">
              Let us help you find the perfect trip for your next adventure. Our travel experts are ready to assist you in planning an unforgettable adventure.
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