import Link from 'next/link'
import { Globe, Users, Shield } from 'lucide-react'

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="text-secondary mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-primary mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

export default function AboutSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary">About Our Travel Agency</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            We&apos;re passionate about creating unforgettable travel experiences that inspire and delight our clients.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Globe className="h-10 w-10" />}
            title="Global Expertise"
            description="With years of experience and a network spanning the globe, we offer insider knowledge and exclusive access to the world's most captivating destinations."
          />
          <FeatureCard
            icon={<Users className="h-10 w-10" />}
            title="Personalized Service"
            description="We take the time to understand your unique preferences and travel style to craft bespoke itineraries that exceed your expectations."
          />
          <FeatureCard
            icon={<Shield className="h-10 w-10" />}
            title="Peace of Mind"
            description="Travel with confidence knowing that our dedicated support team is available 24/7 to ensure your journey is smooth and worry-free."
          />
        </div>
        <div className="mt-12 text-center">
          <Link href="/about" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-secondary hover:bg-primary transition duration-150 ease-in-out">
            Learn More About Us
          </Link>
        </div>
      </div>
    </section>
  )
}
