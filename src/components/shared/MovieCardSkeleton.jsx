"use client";

const MovieCardSkeleton = () => {
  return (
    <div className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-surface/60 shadow-[0_18px_60px_rgba(0,0,0,0.22)] backdrop-blur-sm select-none">
      <div className="relative xxl:min-h-110.25 xl:h-105 lg:h-100 md:h-90 h-70 w-full overflow-hidden rounded-[28px] bg-white/5 skeleton-shimmer">
        {/* Top Badge Skeleton */}
        <div className="absolute top-4 right-4 z-10 flex h-6 w-12 rounded-full bg-white/10" />

        {/* Content Overlay Skeleton */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-5 space-y-3 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
          {/* Release Year & Age Tag */}
          <div className="flex items-center justify-between">
            <div className="h-3 w-12 rounded bg-white/15" />
            <div className="h-4 w-10 rounded-full bg-white/10" />
          </div>

          {/* Title Lines */}
          <div className="space-y-1.5 pt-1">
            <div className="h-4 w-3/4 rounded bg-white/20" />
            <div className="h-4 w-1/2 rounded bg-white/15" />
          </div>

          {/* Rating & Genre */}
          <div className="flex items-center justify-between pt-1">
            <div className="h-3 w-14 rounded bg-amber-400/20" />
            <div className="h-3 w-16 rounded bg-white/15" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCardSkeleton;
