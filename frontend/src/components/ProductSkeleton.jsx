// components/ProductSkeleton.jsx
export default function ProductSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-2 gap-10">
      {/* Image Skeleton */}
      <div>
        <div className="rounded-2xl bg-gray-200 h-600px animate-pulse"></div>
        <div className="grid grid-cols-4 gap-4 mt-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="rounded-xl bg-gray-200 h-24 animate-pulse"></div>
          ))}
        </div>
      </div>

      {/* Info Skeleton */}
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
          <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
          <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
        </div>

        <div className="space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
          <div className="flex gap-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
          <div className="grid grid-cols-5 gap-3">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-12 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>

        <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}