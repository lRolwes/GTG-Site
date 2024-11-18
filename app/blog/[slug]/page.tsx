import { fetchBlogPostBySlug } from '@/util/blog'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { Calendar, User } from 'lucide-react'
import Header from '@/app/components/Header'
import { Footer } from '@/app/components/Footer'
import { Subscribe } from '@/app/components/Subscribe'

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
            <div className="max-w-3xl mx-auto prose prose-lg text-[#23395D]">
              <PortableText value={blogPost.body} />
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        
        <Subscribe title="Enjoy Our Travel Stories?" headline="Subscribe to our newsletter for more travel inspiration, tips, and exclusive content." />
      </main>
      <Footer />
    </div>
  )
} 