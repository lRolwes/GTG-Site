import { fetchAllBlogPosts, fetchBlogPostBySlug } from '@/util/blog'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { Calendar, User } from 'lucide-react'
import Header from '@/app/components/Header'
import { Footer } from '@/app/components/Footer'
import { BlogPost } from '@/app/types'
import type { Metadata } from 'next'

//generate static params
export async function generateStaticParams() {
  const blogPosts = await fetchAllBlogPosts()
  return blogPosts.map((post: BlogPost) => ({
    slug: post.slug.current
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const blogPost = await fetchBlogPostBySlug(params.slug)
  
  if (!blogPost) {
    return {
      title: 'Blog Post Not Found',
    }
  }

  return {
    title: blogPost.title,
    description: blogPost.excerpt || "Read our latest travel blog posts for travel tips, destination guides, and travel inspiration.",
    openGraph: {
      title: blogPost.title,
      description: blogPost.excerpt || "Read our latest travel blog posts for travel tips, destination guides, and travel inspiration.",
      images: [
        {
          url: blogPost.mainImage,
          width: 1200,
          height: 630,
          alt: blogPost.title,
        }
      ],
      type: 'article',
      publishedTime: blogPost.publishedAt,
      authors: [blogPost.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: blogPost.title,
      description: blogPost.excerpt || "Read our latest travel blog posts for travel tips, destination guides, and travel inspiration.",
      images: [blogPost.mainImage],
    }
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const blogPost = await fetchBlogPostBySlug(params.slug)

  if (!blogPost) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh]">
          <Image
            src={blogPost.mainImage}
            alt={blogPost.title}
            layout="fill"
            objectFit="cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <div className="flex items-center gap-4 text-white mb-4">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{new Date(blogPost.publishedAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                <span>{blogPost.author}</span>
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              {blogPost.title}
            </h1>
          </div>
        </div>

        {/* Content Section */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto prose prose-lg text-gray-700">
              <PortableText value={blogPost.body} />
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-[#75D8D1]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-[#23395D] mb-6">Enjoy Our Travel Stories?</h2>
              <p className="text-xl text-[#23395D] mb-8">
                Subscribe to our newsletter for more travel inspiration, tips, and exclusive content.
              </p>
              <form className="flex flex-col sm:flex-row justify-center gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#23395D]"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#23395D] text-white rounded-full font-semibold hover:bg-[#E8791D] transition duration-300"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
} 