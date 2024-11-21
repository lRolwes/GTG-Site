'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, Globe } from 'lucide-react'
import { Category, Trip } from '../types'

interface CruisesContentProps {
  initialTrips: Trip[]
  initialCategories: Category[]
}

export default function CruisesContent({ 
  initialTrips,
  initialCategories 
}: CruisesContentProps) {
  const [selectedType, setSelectedType] = useState('All')
  const [filteredTrips, setFilteredTrips] = useState<Trip[]>(initialTrips)

  useEffect(() => {
    if(selectedType === 'All') {
      setFilteredTrips(initialTrips)
    } else {
      setFilteredTrips(initialTrips.filter((trip: Trip) => trip.category.name === selectedType))
    }
  }, [selectedType, initialTrips])

  return (
    <>
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
            {initialCategories.map((type: Category) => (
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#23395D] mb-12 text-center">Featured Cruises</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredTrips.map((trip: Trip) => (
              <TripCard key={trip._id} trip={trip} />
            ))}
          </div>
        </div>
      </section>
    </>
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
      <span className="ml-2">{type}</span>
    </button>
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