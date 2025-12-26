export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-gray-200 rounded-lg ${className}`}>
      <div className="h-full w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
    </div>
  );
}

export function SkeletonText({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`}>
      <div className="h-full w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
    </div>
  );
}

export function SkeletonArticleCard() {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="h-40 bg-gray-200 rounded-lg" />
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />
    </div>
  );
}

export function SkeletonQuickAction() {
  return (
    <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gray-100 animate-pulse">
      <div className="w-8 h-8 rounded-full bg-gray-200" />
      <div className="h-4 bg-gray-200 rounded w-20" />
    </div>
  );
}
