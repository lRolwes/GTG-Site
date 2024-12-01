import Hero from './components/home/Hero'
import Header from './components/Header'
import AboutSection from './components/home/AboutSection'
import { Footer } from './components/Footer'
import CurrentDeals from './components/home/CurrentDeals'
import PopularDestinations from './components/home/PopularDestinations'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GTG Vacations | Your Dream Vacation Starts Here',
  description: 'Plan your perfect getaway with GTG Vacations. We offer expertly curated travel experiences, from all-inclusive resorts to luxury cruises and group adventures.',
  openGraph: {
    title: 'GTG Vacations | Your Dream Vacation Starts Here',
    description: 'Plan your perfect getaway with GTG Vacations. We offer expertly curated travel experiences, from all-inclusive resorts to luxury cruises and group adventures.',
    images: [
      {
        url: '/og-image.png', // Make sure this image exists in your public folder
        width: 1200,
        height: 630,
        alt: 'GTG Vacations - Luxury Travel Experiences',
      }
    ],
    type: 'website',
    siteName: 'GTG Vacations',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GTG Vacations | Your Dream Vacation Starts Here',
    description: 'Plan your perfect getaway with GTG Vacations. We offer expertly curated travel experiences, from all-inclusive resorts to luxury cruises and group adventures.',
    images: ['/og-image.jpg'], // Make sure this image exists in your public folder
  }
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#CBBEA4]">
      <Header />
      <main className="flex-grow mt-12">
        <Hero />
        <AboutSection />
        <CurrentDeals />
        <PopularDestinations />
      </main>
      <Footer />
    </div>
  )
}