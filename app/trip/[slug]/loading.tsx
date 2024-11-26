export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="animate-pulse">
        {/* Hero Section Skeleton */}
        <div className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] bg-gray-200" />

        {/* Trip Details Skeleton */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-16 bg-gray-200 rounded" />
              ))}
            </div>
          </div>
        </section>

        {/* Description Skeleton */}
        <section className="py-12 bg-[#F8F9FA]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-4 bg-gray-200 rounded" />
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Skeleton */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-64 bg-gray-200 rounded-lg" />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 