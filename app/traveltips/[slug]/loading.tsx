export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="animate-pulse">
        {/* Hero Section Skeleton */}
        <div className="relative h-[40vh] sm:h-[50vh] lg:h-[60vh] bg-gray-200" />

        {/* Content Section Skeleton */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-4 bg-gray-200 rounded" />
              ))}
              <div className="h-32 bg-gray-200 rounded my-8" />
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-4 bg-gray-200 rounded" />
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section Skeleton */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-4">
              <div className="h-8 bg-gray-200 rounded w-2/3 mx-auto" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
              <div className="h-12 bg-gray-200 rounded w-full mx-auto mt-8" />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 