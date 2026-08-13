"use client";

const BannerSkeleton = () => {
  return (
    <section className="movie-hero relative h-dvh w-full overflow-hidden bg-background">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10" />

      <div className="hero-shell relative z-20 mx-auto flex h-full w-full flex-col px-5 pb-5 pt-24 sm:px-10 sm:pb-10 lg:px-20 lg:pt-16 lg:pb-16 justify-end">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end w-full">
          {/* Main Hero Content Skeleton */}
          <div className="lg:col-span-7 space-y-5">
            {/* Today Tag Skeleton */}
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary/60 animate-ping" />
              <div className="h-4 w-20 rounded bg-white/10 skeleton-shimmer" />
            </div>

            {/* Title Skeleton */}
            <div className="space-y-3 pt-2">
              <div className="h-4 w-12 rounded bg-white/10" />
              <div className="h-12 w-3/4 sm:w-2/3 rounded-2xl bg-white/15 skeleton-shimmer" />
              <div className="h-10 w-1/2 rounded-2xl bg-white/10 skeleton-shimmer" />
            </div>

            {/* Stars Rating Skeleton */}
            <div className="flex items-center gap-1.5 pt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={`star-skel-${i}`} className="h-4 w-4 rounded-full bg-amber-400/30" />
              ))}
            </div>

            {/* Meta Tags Skeleton */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <div className="h-6 w-24 rounded-full bg-white/10" />
              <div className="h-6 w-16 rounded-full bg-white/10" />
              <div className="h-6 w-20 rounded-full bg-white/10" />
              <div className="h-6 w-16 rounded-full bg-white/10" />
            </div>

            {/* Description Lines Skeleton */}
            <div className="space-y-2 max-w-xl pt-2">
              <div className="h-4 w-full rounded bg-white/10 skeleton-shimmer" />
              <div className="h-4 w-5/6 rounded bg-white/10 skeleton-shimmer" />
              <div className="h-4 w-2/3 rounded bg-white/5 skeleton-shimmer" />
            </div>

            {/* Action Buttons Skeleton */}
            <div className="flex items-center gap-4 pt-4">
              <div className="h-12 w-36 rounded-full bg-primary/30 skeleton-shimmer" />
              <div className="h-12 w-32 rounded-full bg-white/10 border border-white/10" />
            </div>
          </div>

          {/* Side Thumbnail Swiper Skeleton */}
          <div className="hidden lg:flex lg:col-span-5 items-end justify-end gap-3 pb-2">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={`thumb-skel-${idx}`}
                className="h-36 w-32 rounded-2xl border border-white/10 bg-white/5 p-3 flex flex-col justify-between skeleton-shimmer"
              >
                <div className="h-6 w-8 rounded bg-white/20" />
                <div className="h-4 w-3/4 rounded bg-white/20" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSkeleton;
