"use client";

import { useState, useEffect } from "react";
import MovieCard from "@/components/shared/MovieCard";
import MovieCardSkeleton from "@/components/shared/MovieCardSkeleton";
import { getFeaturedActionMovies, getFeaturedMovies } from "@/util/api";
import { Film, Sparkles, Filter } from "lucide-react";

const MOVIE_GENRES = [
  { id: "all", name: "All Movies", genreId: null },
  { id: "action", name: "Action", genreId: 28 },
  { id: "adventure", name: "Adventure", genreId: 12 },
  { id: "scifi", name: "Sci-Fi", genreId: 878 },
  { id: "horror", name: "Horror", genreId: 27 },
  { id: "comedy", name: "Comedy", genreId: 35 },
  { id: "animation", name: "Animation", genreId: 16 },
  { id: "crime", name: "Crime", genreId: 80 },
];

const MoviesPageComponent = () => {
  const [activeGenre, setActiveGenre] = useState("all");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const selected = MOVIE_GENRES.find((g) => g.id === activeGenre);
        let data = [];
        if (!selected || selected.id === "all") {
          data = await getFeaturedMovies();
        } else {
          data = await getFeaturedActionMovies(selected.genreId);
        }
        if (isMounted) setMovies(data || []);
      } catch (err) {
        console.error("Error loading movies page:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchMovies();
    return () => {
      isMounted = false;
    };
  }, [activeGenre]);

  return (
    <div className="min-h-screen w-full bg-background lg:pt-50 pt-25 pb-20 text-text px-4 sm:px-8 lg:px-12">
      {/* Page Header */}
      <div className="mx-auto max-w-[1600px] space-y-4 text-center md:text-left">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 backdrop-blur-md">
          <Film className="h-4 w-4 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-widest text-white">
            Cinema Experience
          </span>
        </div>
        <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl text-white tracking-tight">
          Explore All Movies
        </h1>
        <p className="max-w-2xl text-sm sm:text-base text-white/60">
          Discover blockbusters, critically acclaimed dramas, futuristic sci-fi, and timeless classics streaming in HD.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="mx-auto max-w-[1600px] pt-8 pb-10">
        <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none">
          <Filter className="h-4 w-4 text-white/40 shrink-0 mr-1 hidden sm:block" />
          {MOVIE_GENRES.map((genre) => (
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

      {/* Movie Grid */}
      <div className="mx-auto max-w-[1600px]">
        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-6">
            {Array.from({ length: 10 }).map((_, idx) => (
              <MovieCardSkeleton key={`movie-skel-${idx}`} />
            ))}
          </div>
        ) : movies.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-white/60">
            No movies found in this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default MoviesPageComponent;
