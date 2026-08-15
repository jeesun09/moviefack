import MovieCardSkeleton from "@/components/shared/MovieCardSkeleton";

export default function SeriesLoading() {
  return (
    <div className="min-h-screen w-full bg-background lg:pt-36 pt-24 pb-28 text-text px-4 sm:px-8 lg:px-12 max-w-[1720px] mx-auto animate-pulse">
      {/* Header Skeleton */}
      <div className="space-y-4 mb-10 text-center md:text-left">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 h-7 w-40" />
        <div className="h-10 w-64 sm:w-80 rounded-2xl bg-white/10" />
        <div className="h-4 w-full max-w-lg rounded-lg bg-white/5" />
      </div>

      {/* Filter bar Skeleton */}
      <div className="h-14 w-full rounded-2xl bg-white/5 border border-white/10 mb-8" />
      <div className="flex gap-2 overflow-hidden mb-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={`sk-lang-${i}`} className="h-8 w-28 rounded-full bg-white/5 shrink-0" />
        ))}
      </div>
      <div className="flex gap-2 overflow-hidden mb-10">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={`sk-genre-${i}`} className="h-8 w-24 rounded-full bg-white/5 shrink-0" />
        ))}
      </div>

      {/* Grid Cards Skeleton */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 xxl:grid-cols-6 sm:gap-6">
        {Array.from({ length: 18 }).map((_, idx) => (
          <MovieCardSkeleton key={`page-series-skel-${idx}`} />
        ))}
      </div>
    </div>
  );
}
