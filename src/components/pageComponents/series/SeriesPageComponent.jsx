"use client";

import { useState, useEffect } from "react";
import MovieCard from "@/components/shared/MovieCard";
import MovieCardSkeleton from "@/components/shared/MovieCardSkeleton";
import { getTvShows } from "@/util/api";
import { Radio, Filter } from "lucide-react";

const SERIES_GENRES = [
  { id: "all", name: "All Series", genreId: null },
  { id: "action", name: "Action & Adventure", genreId: 10759 },
  { id: "drama", name: "Drama Series", genreId: 18 },
  { id: "animation", name: "Anime & Animated", genreId: 16 },
  { id: "scifi", name: "Sci-Fi & Fantasy", genreId: 10765 },
  { id: "mystery", name: "Mystery & Crime", genreId: 80 },
];

const SeriesPageComponent = () => {
  const [activeGenre, setActiveGenre] = useState("all");
  const [series, setSeries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchSeries = async () => {
      setIsLoading(true);
      try {
        const selected = SERIES_GENRES.find((g) => g.id === activeGenre);
        const data = await getTvShows(selected?.genreId);
        if (isMounted) setSeries(data || []);
      } catch (err) {
        console.error("Error loading series page:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchSeries();
    return () => {
      isMounted = false;
    };
  }, [activeGenre]);

  return (
    <div className="min-h-screen w-full bg-background lg:pt-50 pt-25 pb-20 text-text px-4 sm:px-8 lg:px-12">
      {/* Page Header */}
      <div className="mx-auto max-w-[1600px] space-y-4 text-center md:text-left">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 backdrop-blur-md">
          <Radio className="h-4 w-4 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-widest text-white">
            Exclusive Originals
          </span>
        </div>
        <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl text-white tracking-tight">
          Trending TV Series
        </h1>
        <p className="max-w-2xl text-sm sm:text-base text-white/60">
          Binge-watch award-winning original series, thrilling serial dramas, and viral shows.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="mx-auto max-w-[1600px] pt-8 pb-10">
        <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none">
          <Filter className="h-4 w-4 text-white/40 shrink-0 mr-1 hidden sm:block" />
          {SERIES_GENRES.map((genre) => (
            <button
              key={genre.id}
              onClick={() => setActiveGenre(genre.id)}
              className={`shrink-0 rounded-full px-5 py-2 text-xs font-medium tracking-wide transition-all duration-300 ${activeGenre === genre.id
                  ? "bg-primary text-white shadow-[0_0_20px_rgba(255,59,48,0.4)]"
                  : "border border-white/10 bg-white/5 text-white/70 hover:border-white/25 hover:text-white"
                }`}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>

      {/* Series Grid */}
      <div className="mx-auto max-w-[1600px]">
        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-6">
            {Array.from({ length: 10 }).map((_, idx) => (
              <MovieCardSkeleton key={`series-skel-${idx}`} />
            ))}
          </div>
        ) : series.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-6">
            {series.map((item) => (
              <MovieCard key={item.id} movie={item} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-white/60">
            No series found in this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default SeriesPageComponent;
