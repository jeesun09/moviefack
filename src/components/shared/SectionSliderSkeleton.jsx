"use client";

import MovieCardSkeleton from "./MovieCardSkeleton";

const SectionSliderSkeleton = ({ count = 5 }) => {
  return (
    <section className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <div className="h-7 w-56 rounded-lg bg-white/10 skeleton-shimmer" />
          <div className="h-4 w-72 max-w-full rounded-md bg-white/5 skeleton-shimmer" />
        </div>

        <div className="flex items-center gap-3">
          <div className="h-3 w-24 rounded bg-white/5 hidden sm:block" />
          <div className="flex gap-2">
            <div className="h-10 w-10 rounded-full border border-white/10 bg-white/5" />
            <div className="h-10 w-10 rounded-full border border-white/10 bg-white/5" />
          </div>
        </div>
      </div>

      {/* Cards Row Grid Skeleton */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: count }).map((_, idx) => (
          <MovieCardSkeleton key={`slider-skel-${idx}`} />
        ))}
      </div>
    </section>
  );
};

export default SectionSliderSkeleton;
