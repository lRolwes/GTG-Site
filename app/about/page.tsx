import Image from "next/image";
import Link from "next/link";
import { Globe, Users, Shield, ThumbsUp, Award, Heart } from "lucide-react";
import Header from "../components/Header";
import { Footer } from "../components/Footer";
import { fetchAboutPage } from "@/util/about";
export function generateMetadata() {
  return {
    title: "About GTG Vacations | Your Trusted Saint Louis Travel Experts",
    description:
      "Learn more about GTG Vacations, a dedicated travel agency based in Saint Louis. With years of experience in crafting personalized vacation experiences, our team of expert travel agents is committed to helping you plan your dream getaway. From family trips to luxurious escapes, we provide tailored solutions and exceptional service every step of the way.",
  };
}
export default async function AboutPage() {
  const aboutData = await fetchAboutPage();
  return (
    <div className="flex flex-col min-h-screen bg-[#CBBEA4]">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-[40vh] sm:h-[50vh] lg:h-[60vh] mt-12">
          <Image
            src="/about-header.jpg"
            alt="Travel agency team"
            layout="fill"
            objectFit="cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white text-center">
              About Our Travel Agency
            </h1>
          </div>
        </div>

        {/* Mission Statement */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-6">
                Our Mission
              </h2>

              <p className="text-xl text-gray-700">
                At our travel agency, we&apos;re dedicated to crafting
                unforgettable journeys that inspire, delight, and broaden
                horizons. Our mission is to transform your travel dreams into
                reality, providing personalized experiences that create lasting
                memories.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-12 sm:py-16 lg:py-20 bg-[#75D8D1]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                  Our Story
                </h2>
                {aboutData?.storyParagraphs.map((paragraph, index) => (
                  <p key={index} className="text-lg text-gray-100 mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="relative h-64 sm:h-80 md:h-96">
                <Image
                  src="/team.jpg"
                  alt="Our team in action"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-10 text-center">
              Why Choose Us
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Globe className="h-10 w-10" />}
                title="Global Expertise"
                description="Our extensive network and years of experience ensure you get insider access to the world's most captivating destinations."
              />
              <FeatureCard
                icon={<Users className="h-10 w-10" />}
                title="Personalized Service"
                description="We take the time to understand your unique preferences to craft bespoke itineraries that exceed your expectations."
              />
              <FeatureCard
                icon={<Shield className="h-10 w-10" />}
                title="Peace of Mind"
                description="Travel with confidence knowing our dedicated support team is available 24/7 to ensure your journey is smooth and worry-free."
              />
              <FeatureCard
                icon={<ThumbsUp className="h-10 w-10" />}
                title="Customer Satisfaction"
                description="Our high rate of repeat clients and referrals speaks to our commitment to exceptional customer service."
              />
              <FeatureCard
                icon={<Award className="h-10 w-10" />}
                title="Industry Recognition"
                description="We're proud recipients of multiple travel industry awards, recognizing our commitment to excellence."
              />
              <FeatureCard
                icon={<Heart className="h-10 w-10" />}
                title="Passion for Travel"
                description="Our team consists of avid travelers who bring their personal insights and enthusiasm to every trip we plan."
              />
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-10 text-center">
              Meet Our Team
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {aboutData?.teamMembers.map((member) => (
                <TeamMember
                  key={member.name}
                  name={member.name}
                  role={member.role}
                  image={member.image}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-12 sm:py-16 lg:py-20 bg-[#E8791D]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Let us help you turn your travel dreams into unforgettable
              experiences. Contact us today to start planning your next
              adventure.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-[#E8791D] font-bold py-3 px-8 rounded-full text-lg hover:bg-[#75D8D1] hover:text-white transition duration-300"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-2xl p-6">
      <div className="text-secondary flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-primary mb-2 text-center">
        {title}
      </h3>
      <p className="text-gray-700 text-center">{description}</p>
    </div>
  );
}

function TeamMember({
  name,
  role,
  image,
}: {
  name: string;
  role: string;
  image: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-64">
        <Image src={image} alt={name} layout="fill" objectFit="cover" />
      </div>
      <div className="p-4 text-center">
        <h3 className="text-xl font-semibold text-[#E8791D]">{name}</h3>
        <p className="text-gray-600">{role}</p>
      </div>
    </div>
  );
}
