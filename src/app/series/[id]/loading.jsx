export default function SeriesDetailLoading() {
  return (
    <div className="min-h-screen w-full bg-background animate-pulse">
      {/* Hero Backdrop Skeleton */}
      <div className="relative h-[65vh] min-h-[480px] w-full bg-white/5">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-10 left-4 right-4 sm:left-8 sm:right-8 lg:left-12 lg:right-12 max-w-[1600px] mx-auto space-y-4">
          <div className="flex gap-2">
            <div className="h-6 w-20 rounded-full bg-white/10" />
            <div className="h-6 w-24 rounded-full bg-white/10" />
          </div>
          <div className="h-12 w-3/4 max-w-xl rounded-2xl bg-white/15" />
          <div className="h-4 w-1/2 max-w-md rounded-lg bg-white/10" />
          <div className="flex gap-3 pt-3">
            <div className="h-12 w-36 rounded-full bg-primary/40" />
            <div className="h-12 w-36 rounded-full bg-white/10" />
          </div>
        </div>
      </div>

      {/* Episodes & Seasons Skeleton */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-12 space-y-8">
        <div className="flex items-center justify-between">
          <div className="h-8 w-44 rounded-xl bg-white/10" />
          <div className="h-10 w-36 rounded-xl bg-white/10" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={`ep-skel-${i}`} className="space-y-3">
              <div className="aspect-video w-full rounded-2xl bg-white/5" />
              <div className="h-4 w-3/4 rounded bg-white/10" />
              <div className="h-3 w-1/2 rounded bg-white/5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
