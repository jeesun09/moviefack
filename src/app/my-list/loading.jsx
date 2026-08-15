import MovieCardSkeleton from "@/components/shared/MovieCardSkeleton";

export default function MyListLoading() {
  return (
    <div className="min-h-screen w-full bg-background lg:pt-36 pt-24 pb-28 text-text px-4 sm:px-8 lg:px-12 max-w-[1720px] mx-auto animate-pulse">
      <div className="space-y-4 mb-10 text-center md:text-left">
        <div className="h-7 w-36 rounded-full bg-white/10" />
        <div className="h-10 w-64 rounded-2xl bg-white/15" />
        <div className="h-4 w-80 rounded-lg bg-white/5" />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 xxl:grid-cols-6 sm:gap-6">
        {Array.from({ length: 12 }).map((_, idx) => (
          <MovieCardSkeleton key={`mylist-skel-${idx}`} />
        ))}
      </div>
    </div>
  );
}
