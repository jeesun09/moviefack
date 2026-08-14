"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import MovieCard from "@/components/shared/MovieCard";
import MovieCardSkeleton from "@/components/shared/MovieCardSkeleton";
import CustomDropdown from "@/components/common/CustomDropdown";
import {
  Film,
  Globe,
  SlidersHorizontal,
  Sparkles,
  RefreshCw,
  Layers,
  ArrowUpDown,
  Search,
} from "lucide-react";

export const MOVIE_GENRES = [
  { id: "all", name: "All Genres", genreId: "all" },
  { id: "action", name: "Action", genreId: "28" },
  { id: "adventure", name: "Adventure", genreId: "12" },
  { id: "animation", name: "Animation", genreId: "16" },
  { id: "comedy", name: "Comedy", genreId: "35" },
  { id: "crime", name: "Crime", genreId: "80" },
  { id: "documentary", name: "Documentary", genreId: "99" },
  { id: "drama", name: "Drama", genreId: "18" },
  { id: "family", name: "Family", genreId: "10751" },
  { id: "fantasy", name: "Fantasy", genreId: "14" },
  { id: "history", name: "History", genreId: "36" },
  { id: "horror", name: "Horror", genreId: "27" },
  { id: "music", name: "Music", genreId: "10402" },
  { id: "mystery", name: "Mystery", genreId: "9648" },
  { id: "romance", name: "Romance", genreId: "10749" },
  { id: "scifi", name: "Sci-Fi", genreId: "878" },
  { id: "thriller", name: "Thriller", genreId: "53" },
  { id: "war", name: "War", genreId: "10752" },
  { id: "western", name: "Western", genreId: "37" },
];

export const MOVIE_LANGUAGES = [
  { code: "all", name: "All Languages", flag: "🌐" },
  { code: "en", name: "English (Hollywood)", flag: "🇺🇸" },
  { code: "hi", name: "Hindi (Bollywood)", flag: "🇮🇳" },
  { code: "bn", name: "Bengali (বাংলা)", flag: "🇧🇩" },
  { code: "te", name: "Telugu (Tollywood)", flag: "🎭" },
  { code: "ta", name: "Tamil (Kollywood)", flag: "🌺" },
  { code: "ml", name: "Malayalam", flag: "🌴" },
  { code: "kn", name: "Kannada", flag: "☕" },
  { code: "ko", name: "Korean (K-Drama)", flag: "🇰🇷" },
  { code: "ja", name: "Japanese (Anime)", flag: "🇯🇵" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "zh", name: "Chinese", flag: "🇨🇳" },
  { code: "de", name: "German", flag: "🇩🇪" },
];

export const SORT_OPTIONS = [
  { id: "popularity.desc", name: "Most Popular" },
  { id: "vote_average.desc", name: "Top Rated" },
  { id: "primary_release_date.desc", name: "Latest Release" },
  { id: "revenue.desc", name: "Box Office" },
];

export default function MoviesPageComponent() {
  const [activeGenre, setActiveGenre] = useState("all");
  const [activeLanguage, setActiveLanguage] = useState("all");
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [searchQuery, setSearchQuery] = useState("");

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const observerTarget = useRef(null);

  // Fetch movies function
  const fetchMoviesData = useCallback(
    async (pageToFetch, isNewFilter = false) => {
      if (isNewFilter) {
        setIsInitialLoading(true);
      } else {
        setIsLoadingMore(true);
      }

      try {
        const queryParams = new URLSearchParams({
          genreId: activeGenre,
          language: activeLanguage,
          sortBy: sortBy,
          page: String(pageToFetch),
        });

        const res = await fetch(`/api/movies?${queryParams.toString()}`);
        if (!res.ok) throw new Error("Failed to fetch movies");

        const data = await res.json();
        const results = Array.isArray(data?.results) ? data.results : [];

        setMovies((prev) => (isNewFilter ? results : [...prev, ...results]));
        setTotalCount(data.totalResults || results.length);
        setHasMore(data.page < data.totalPages && results.length > 0);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setIsInitialLoading(false);
        setIsLoadingMore(false);
      }
    },
    [activeGenre, activeLanguage, sortBy],
  );

  // Initial & Filter change trigger
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    fetchMoviesData(1, true);
  }, [fetchMoviesData]);

  // Infinite Scroll Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasMore &&
          !isInitialLoading &&
          !isLoadingMore
        ) {
          setPage((prevPage) => {
            const nextPage = prevPage + 1;
            fetchMoviesData(nextPage, false);
            return nextPage;
          });
        }
      },
      { threshold: 0.1, rootMargin: "300px" },
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) observer.unobserve(currentTarget);
    };
  }, [hasMore, isInitialLoading, isLoadingMore, fetchMoviesData]);

  // Client-side quick title search filtering
  const displayedMovies = searchQuery.trim()
    ? movies.filter((m) =>
        (m.titleMain || m.title || "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase()),
      )
    : movies;

  return (
    <div className="min-h-screen w-full bg-background lg:pt-36 pt-24 pb-28 text-text px-4 sm:px-8 lg:px-12 max-w-[1720px] mx-auto">
      {/* ── Page Header Banner ── */}
      <div className="space-y-4 text-center md:text-left mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 backdrop-blur-md">
          <Film className="h-4 w-4 text-primary" />
          <span className="text-xs font-bold uppercase tracking-widest text-white">
            ULTRA HD CINEMA
          </span>
        </div>
        <h1 className="text-3xl font-black sm:text-4xl lg:text-5xl text-white tracking-tight">
          Explore All Movies
        </h1>
        <p className="max-w-3xl text-xs sm:text-sm text-white/60 leading-relaxed">
          Browse through unlimited blockbusters, regional cinema masterpieces, award-winning international hits, and upcoming premieres across all genres and languages.
        </p>
      </div>

      {/* ── Control Bar: Search & Sort ── */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6 rounded-2xl border border-white/10 bg-surface/60 p-4 backdrop-blur-md shadow-lg">
        {/* Search within Category */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
          <input
            type="text"
            placeholder="Quick search loaded movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-white/15 bg-black/40 pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/40 focus:border-primary focus:outline-none transition"
          />
        </div>

        {/* Sort & Stats */}
        <div className="flex items-center justify-between md:justify-end gap-4">
          <span className="text-xs text-white/50 font-medium">
            Loaded: <strong className="text-white">{displayedMovies.length}</strong> {totalCount > 0 ? `of ${totalCount.toLocaleString()}+` : "movies"}
          </span>

          <CustomDropdown
            options={SORT_OPTIONS}
            value={sortBy}
            onChange={(newVal) => setSortBy(newVal)}
            icon={ArrowUpDown}
            placeholder="Sort Movies"
          />
        </div>
      </div>

      {/* ── Languages Filter Row ── */}
      <div className="mb-5 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/60">
          <Globe className="h-3.5 w-3.5 text-primary" />
          <span>Select Cinema Language</span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {MOVIE_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => setActiveLanguage(lang.code)}
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold tracking-wide transition-all duration-300 cursor-pointer ${
                activeLanguage === lang.code
                  ? "bg-primary text-white shadow-[0_0_20px_rgba(255,59,48,0.5)] scale-105"
                  : "border border-white/10 bg-surface/80 text-white/70 hover:border-white/25 hover:text-white hover:bg-white/10"
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Genres Filter Row ── */}
      <div className="mb-10 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/60">
          <Layers className="h-3.5 w-3.5 text-primary" />
          <span>Select Movie Genre</span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {MOVIE_GENRES.map((genre) => (
            <button
              key={genre.id}
              type="button"
              onClick={() => setActiveGenre(genre.genreId)}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                activeGenre === genre.genreId
                  ? "bg-white text-black font-bold shadow-[0_0_20px_rgba(255,255,255,0.4)] scale-105"
                  : "border border-white/10 bg-surface/80 text-white/70 hover:border-white/25 hover:text-white hover:bg-white/10"
              }`}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>

      {/* ── Movie Cards Grid ── */}
      {isInitialLoading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 sm:gap-6">
          {Array.from({ length: 18 }).map((_, idx) => (
            <MovieCardSkeleton key={`init-skel-${idx}`} />
          ))}
        </div>
      ) : displayedMovies.length > 0 ? (
        <div className="space-y-10">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 sm:gap-6">
            {displayedMovies.map((movie, idx) => (
              <MovieCard
                key={`${movie.id}-${idx}`}
                movie={movie}
              />
            ))}
          </div>

          {/* Loading More Rows Skeleton */}
          {isLoadingMore && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 sm:gap-6 pt-4">
              {Array.from({ length: 6 }).map((_, idx) => (
                <MovieCardSkeleton key={`more-skel-${idx}`} />
              ))}
            </div>
          )}

          {/* Scroll Down Infinite Sentinel Trigger */}
          <div ref={observerTarget} className="h-10 w-full flex items-center justify-center">
            {isLoadingMore && (
              <div className="flex items-center gap-2 text-xs text-white/60 font-semibold">
                <RefreshCw className="h-4 w-4 animate-spin text-primary" />
                <span>Loading more movies smoothly...</span>
              </div>
            )}
            {!hasMore && !isLoadingMore && (
              <p className="text-xs text-white/40 py-6">
                ✨ You've reached the end of the collection.
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="py-24 text-center space-y-4 rounded-3xl border border-white/10 bg-surface/30 p-12">
          <Film className="h-12 w-12 text-white/20 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Movies Found</h3>
          <p className="text-xs text-white/50 max-w-sm mx-auto">
            We couldn't find any movies matching the selected combination of genre and language.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveGenre("all");
              setActiveLanguage("all");
              setSearchQuery("");
            }}
            className="rounded-xl bg-primary px-6 py-2.5 text-xs font-bold uppercase text-white shadow transition hover:bg-primary-hover"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
