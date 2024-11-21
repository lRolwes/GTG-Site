import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, ChevronRight } from 'lucide-react'
import Header from '../components/Header'
import { Footer } from '../components/Footer'
import { fetchBlogPage, fetchAllBlogPosts } from '@/util/blog'
import { BlogPost } from '../types'
import { Subscribe } from '../components/Subscribe'
export function generateMetadata() {
  return {
    title: "Travel Blog | GTG Vacations Tips, Inspiration, and Insights",
    description:
      "Stay up-to-date with the latest travel trends, destination highlights, and insider tips from GTG Vacations. Our blog covers a variety of topics, from expert travel advice to inspirational stories that will spark your wanderlust. Explore unique destinations, hidden gems, and travel hacks that will make your next vacation unforgettable.",
  };
}
export default async function BlogPage() {
  const blogPage = await fetchBlogPage();
  const allPosts = await fetchAllBlogPosts();
  // Featured posts are from the blogPage data
  //const featuredPosts: BlogPost[] = blogPage.featuredPosts
  
  // Recent posts are all posts that aren't featured
  // const recentPosts = allPosts.filter(
  //   (post: BlogPost) => !featuredPosts.find((fp: BlogPost) => fp._id === post._id)
  // )

  return (
    <div className="flex flex-col min-h-screen bg-background mt-12">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-[40vh] sm:h-[50vh] lg:h-[60vh]">
          <Image
            src="/blog-hero.jpg"
            alt="Travel blog hero image"
            layout="fill"
            objectFit="cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white text-center">
              Travel Blog
            </h1>
          </div>
        </div>

        {/* Featured Posts */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-8">Featured Posts</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              
              {blogPage.featuredPosts.map((post: BlogPost) => (
                <FeaturedPostCard key={post._id} post={post} />
              ))}
            </div>
          </div>
        </section>

        {/* Recent Posts */}
        <section className="py-12 sm:py-16 lg:py-20 bg-secondary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">Recent Posts</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {allPosts.map((post: BlogPost) => (
                <RecentPostCard key={post._id} post={post} />
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        
        <Subscribe title="Subscribe to Our Newsletter" headline="Get the latest travel tips, destination guides, and exclusive offers delivered straight to your inbox." />
      </main>
      <Footer />
    </div>
  )
}

function FeaturedPostCard({ post }: { post: BlogPost }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-48 sm:h-64">
        <Image
          src={post.mainImage}
          alt={post.title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
          <User className="h-4 w-4 ml-4 mr-2" />
          <span>{post.author}</span>
        </div>
        <h3 className="text-xl font-semibold text-primary mb-2">{post.title}</h3>
        <Link 
          href={`/blog/${post.slug.current}`}
          className="inline-flex items-center text-primary font-medium hover:text-secondary transition duration-300"
        >
          Read More
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </div>
  )
}

function RecentPostCard({ post }: { post: BlogPost }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-40">
        <Image
          src={post.mainImage}
          alt={post.title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4">
        <div className="text-sm text-gray-600 mb-2">
          {new Date(post.publishedAt).toLocaleDateString()}
        </div>
        <h3 className="text-lg font-semibold text-primary mb-2">{post.title}</h3>
        <Link 
          href={`/blog/${post.slug.current}`}
          className="inline-flex items-center text-primary font-medium hover:text-secondary transition duration-300"
        >
          Read More
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </div>
  )
}
