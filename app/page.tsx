import Hero from './components/home/Hero'
import Header from './components/Header'
import AboutSection from './components/home/AboutSection'
import { Footer } from './components/Footer'
import CurrentDeals from './components/home/CurrentDeals'
import PopularDestinations from './components/home/PopularDestinations'

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
