import Image from 'next/image'
import Link from 'next/link'
import { DollarSign, Users, Calendar, CheckCircle } from 'lucide-react'
import Header from '../components/Header'
import { Footer } from '../components/Footer'

export const metadata = {
  title: "Affordable Vacation Packages | GTG Vacations Pricing",
  description: "Discover the value of free travel planning with GTG Vacations! Our services are completely free, and we are compensated through commissions by the travel providers we book for you."
}
export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-[40vh] sm:h-[50vh] lg:h-[60vh] mt-12">
          <Image
            src="/pricing-hero.jpg"
            alt="Luxurious travel experience"
            layout="fill"
            objectFit="cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white text-center">
              Discover the Value of Free Travel Planning
            </h1>
          </div>
        </div>

        {/* Main Content */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-6">
                Free Travel Planning with GTG Vacations!
              </h2>
              <p className="text-xl text-gray-700">
                At GTG Vacations, we believe that exceptional travel experiences shouldn&apos;t come with a hefty price tag. That&apos;s why our travel planning services are absolutely free!
              </p>
            </div>

            {/* Why Choose GTG Vacations */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
              <FeatureCard
                icon={<DollarSign className="h-10 w-10" />}
                title="No Fees, Just Expertise"
                description="Our services come at no cost to you! We are compensated through commissions by the travel providers we book for you."
              />
              <FeatureCard
                icon={<Users className="h-10 w-10" />}
                title="Customized Planning"
                description="Our knowledgeable travel agents work with you to tailor trips that fit your unique preferences and budget, from $500 to $20,000 or more."
              />
              <FeatureCard
                icon={<Calendar className="h-10 w-10" />}
                title="Personalized Experience"
                description="We take the time to understand your interests, budget, and desired experiences to create a custom itinerary that suits you perfectly."
              />
            </div>

            {/* How It Works */}
            <div className="bg-secondary rounded-lg shadow-lg p-8 mb-16">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">How It Works</h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <ProcessStep number={1} title="Consultation">
                  Contact us to discuss your travel goals and budget. Our experts will listen to your needs and preferences.
                </ProcessStep>
                <ProcessStep number={2} title="Planning">
                  We&apos;ll research and curate options that align with your budget, providing you with various choices that suit your style and desires.
                </ProcessStep>
                <ProcessStep number={3} title="Booking">
                  Once you&apos;ve selected your ideal trip, we handle all the bookings and arrangements, ensuring a seamless experience from start to finish.
                </ProcessStep>
                <ProcessStep number={4} title="Support">
                  Even after booking, our team is here for you! From changes to your itinerary to answering any questions, we provide ongoing support throughout your journey.
                </ProcessStep>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-primary mb-4">Get Started Today!</h3>
              <p className="text-xl text-gray-700 mb-8">
                Ready to embark on your next adventure? Contact GTG Vacations today for a free consultation! Our travel experts are excited to help you create the perfect getaway within your budget.
              </p>
              <Link 
                href="/contact"
                className="inline-block bg-primary text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-secondary transition duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-12 sm:py-16 lg:py-20 bg-secondary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">What Our Clients Say</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <TestimonialCard
                quote="GTG Vacations planned the perfect honeymoon for us. Their attention to detail and personalized service made our trip unforgettable!"
                author="Sarah & John"
                location="Newlyweds from New York"
              />
              <TestimonialCard
                quote="I was amazed by the value GTG Vacations provided. They found us great deals and created an itinerary that exceeded our expectations, all for free!"
                author="Michael T."
                location="Family Traveler from Chicago"
              />
              <TestimonialCard
                quote="As a solo traveler, I appreciated GTG Vacations&apos; expertise in crafting a safe and exciting adventure. Their support throughout the trip was invaluable."
                author="Emily L."
                location="Solo Explorer from San Francisco"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-secondary rounded-lg shadow-lg p-6 text-center">
      <div className="text-white flex justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-100">{description}</p>
    </div>
  )
}

function ProcessStep({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">
        {number}
      </div>
      <h4 className="text-lg font-semibold text-white mb-2">{title}</h4>
      <p className="text-gray-100">{children}</p>
    </div>
  )
}

function TestimonialCard({ quote, author, location }: { quote: string; author: string; location: string }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="text-primary mb-4">
        <CheckCircle className="h-8 w-8" />
      </div>
      <p className="text-gray-700 mb-4 italic">&quot;{quote}&quot;</p>
      <div>
        <p className="font-semibold text-primary">{author}</p>
        <p className="text-sm text-gray-600">{location}</p>
      </div>
    </div>
  )
}
