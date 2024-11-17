import Link from 'next/link'
import { Josefin_Sans } from 'next/font/google'

const josefinSans = Josefin_Sans({ subsets: ['latin'] })

export default function Hero() {
  return (
    <div 
      className={`relative h-[50vh] sm:h-[60vh] md:h-[100vh] ${josefinSans.className} bg-fixed bg-cover bg-center`}
      style={{ backgroundImage: 'url("/Hero.png")' }}
    >
      <div className="absolute inset-0 bg-primary opacity-30" /> {/* Sunset orange overlay */}
      <div className="relative h-full flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
          Discover the warmth of a GTG Vacation experience
        </h1>
        <p className="mt-4 sm:mt-6 max-w-3xl text-lg sm:text-xl text-white">
          Embark on unforgettable journeys to exotic destinations around the world. Let us guide you to your perfect getaway.
        </p>
        <div className="mt-6 sm:mt-10">
          <Link
            href="/findyourtrip"
            className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#75D8D1] hover:scale-105 transition-transform duration-150 ease-in-out"
          >
            Find Your Trip
          </Link>
        </div>
      </div>
    </div>
  )
}
