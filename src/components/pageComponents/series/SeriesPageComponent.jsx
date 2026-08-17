"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import MovieCard from "@/components/shared/MovieCard";
import MovieCardSkeleton from "@/components/shared/MovieCardSkeleton";
import CustomDropdown from "@/components/common/CustomDropdown";
import {
  Tv,
  Globe,
  SlidersHorizontal,
  Sparkles,
  RefreshCw,
  Layers,
  ArrowUpDown,
  Search,
} from "lucide-react";

export const SERIES_GENRES = [
  { id: "all", name: "All Series", genreId: "all" },
  { id: "action", name: "Action & Adventure", genreId: "10759" },
  { id: "drama", name: "Drama Series", genreId: "18" },
  { id: "animation", name: "Anime & Animation", genreId: "16" },
  { id: "comedy", name: "Comedy & Sitcoms", genreId: "35" },
  { id: "crime", name: "Crime & Mafia", genreId: "80" },
  { id: "mystery", name: "Mystery & Thriller", genreId: "9648" },
  { id: "scifi", name: "Sci-Fi & Fantasy", genreId: "10765" },
  { id: "documentary", name: "Documentary", genreId: "99" },
  { id: "family", name: "Family & Kids", genreId: "10751" },
  { id: "reality", name: "Reality TV", genreId: "10764" },
  { id: "war", name: "War & Politics", genreId: "10768" },
  { id: "western", name: "Western", genreId: "37" },
];

export const SERIES_LANGUAGES = [
  { code: "all", name: "All Languages", flag: "🌐" },
  { code: "en", name: "English (US/UK)", flag: "🇺🇸" },
  { code: "bn", name: "Bengali (বাংলা সিরিজ)", flag: "🇧🇩" },
  { code: "hi", name: "Hindi (Indian Series)", flag: "🇮🇳" },
  { code: "ko", name: "Korean (K-Drama)", flag: "🇰🇷" },
  { code: "ja", name: "Japanese (Anime)", flag: "🇯🇵" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "te", name: "Telugu", flag: "🎭" },
  { code: "ta", name: "Tamil", flag: "🌺" },
  { code: "zh", name: "Chinese", flag: "🇨🇳" },
  { code: "de", name: "German", flag: "🇩🇪" },
];

export const SORT_OPTIONS = [
  { id: "popularity.desc", name: "Most Popular" },
  { id: "vote_average.desc", name: "Top Rated" },
  { id: "first_air_date.desc", name: "Latest Premieres" },
];

export default function SeriesPageComponent() {
  const [activeGenre, setActiveGenre] = useState("all");
  const [activeLanguage, setActiveLanguage] = useState("all");
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [searchQuery, setSearchQuery] = useState("");

  const [series, setSeries] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const observerTarget = useRef(null);
  const abortControllerRef = useRef(null);

  // Fetch series function
  const fetchSeriesData = useCallback(
    async (pageToFetch, isNewFilter = false) => {
      abortControllerRef.current?.abort();
      const controller = new AbortController();
      abortControllerRef.current = controller;
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

        const res = await fetch(`/api/series?${queryParams.toString()}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Failed to fetch series");

        const data = await res.json();
        const results = Array.isArray(data?.results) ? data.results : [];

        setSeries((prev) => (isNewFilter ? results : [...prev, ...results]));
        setTotalCount(data.totalResults || results.length);
        setHasMore(data.page < data.totalPages && results.length > 0);
      } catch (error) {
        if (error.name === "AbortError") return;
        console.error("Error fetching series:", error);
      } finally {
        if (!controller.signal.aborted) {
          setIsInitialLoading(false);
          setIsLoadingMore(false);
        }
      }
    },
    [activeGenre, activeLanguage, sortBy],
  );

  // Initial & Filter change trigger
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    fetchSeriesData(1, true);
  }, [fetchSeriesData]);

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
            fetchSeriesData(nextPage, false);
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
  }, [hasMore, isInitialLoading, isLoadingMore, fetchSeriesData]);

  // Client-side quick search filtering
  const displayedSeries = searchQuery.trim()
    ? series.filter((m) =>
        (m.titleMain || m.name || m.title || "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase()),
      )
    : series;
  
  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, [])

  return (
    <div className="min-h-screen w-full bg-background lg:pt-36 pt-24 pb-28 text-text px-4 sm:px-8 lg:px-12 max-w-[1720px] mx-auto">
      {/* ── Page Header Banner ── */}
      <div className="space-y-4 text-center md:text-left mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 backdrop-blur-md">
          <Tv className="h-4 w-4 text-primary" />
          <span className="text-xs font-bold uppercase tracking-widest text-white">
            EXCLUSIVE TV & WEB SERIES
          </span>
        </div>
        <h1 className="text-3xl font-black sm:text-4xl lg:text-5xl text-white tracking-tight">
          Trending TV Series & Originals
        </h1>
        <p className="max-w-3xl text-xs sm:text-sm text-white/60 leading-relaxed">
          Binge-watch award-winning original dramas, addictive suspense series,
          Korean K-dramas, Japanese anime series, and Bengali detective web
          originals.
        </p>
      </div>

      {/* ── Control Bar: Search & Sort ── */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6 rounded-2xl border border-white/10 bg-surface/60 p-4 backdrop-blur-md shadow-lg">
        {/* Search within Series */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
          <input
            type="text"
            placeholder="Quick search loaded series..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-white/15 bg-black/40 pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/40 focus:border-primary focus:outline-none transition"
          />
        </div>

        {/* Sort & Stats */}
        <div className="flex items-center justify-between md:justify-end gap-4">
          <span className="text-xs text-white/50 font-medium">
            Loaded:{" "}
            <strong className="text-white">{displayedSeries.length}</strong>{" "}
            {totalCount > 0 ? `of ${totalCount.toLocaleString()}+` : "shows"}
          </span>

          <CustomDropdown
            options={SORT_OPTIONS}
            value={sortBy}
            onChange={(newVal) => setSortBy(newVal)}
            icon={ArrowUpDown}
            placeholder="Sort Series"
          />
        </div>
      </div>

      {/* ── Languages Filter Row ── */}
      <div className="mb-5 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/60">
          <Globe className="h-3.5 w-3.5 text-primary" />
          <span>Select Series Language</span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {SERIES_LANGUAGES.map((lang) => (
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
          <span>Select TV Genre</span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {SERIES_GENRES.map((genre) => (
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

      {/* ── Series Cards Grid ── */}
      {isInitialLoading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 xxl:grid-cols-6 sm:gap-6">
          {Array.from({ length: 18 }).map((_, idx) => (
            <MovieCardSkeleton key={`init-series-skel-${idx}`} />
          ))}
        </div>
      ) : displayedSeries.length > 0 ? (
        <div className="space-y-10">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 xxl:grid-cols-6 sm:gap-6">
            {displayedSeries.map((item, idx) => (
              <MovieCard key={`${item.id}-${idx}`} movie={item} />
            ))}
          </div>

          {/* Loading More Rows Skeleton */}
          {isLoadingMore && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 xxl:grid-cols-6 sm:gap-6 pt-4">
              {Array.from({ length: 6 }).map((_, idx) => (
                <MovieCardSkeleton key={`more-series-skel-${idx}`} />
              ))}
            </div>
          )}

          {/* Scroll Down Infinite Sentinel Trigger */}
          <div
            ref={observerTarget}
            className="h-10 w-full flex items-center justify-center"
          >
            {isLoadingMore && (
              <div className="flex items-center gap-2 text-xs text-white/60 font-semibold">
                <RefreshCw className="h-4 w-4 animate-spin text-primary" />
                <span>Loading more series smoothly...</span>
              </div>
            )}
            {!hasMore && !isLoadingMore && (
              <p className="text-xs text-white/40 py-6">
                ✨ You've reached the end of the series collection.
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="py-24 text-center space-y-4 rounded-3xl border border-white/10 bg-surface/30 p-12">
          <Tv className="h-12 w-12 text-white/20 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Series Found</h3>
          <p className="text-xs text-white/50 max-w-sm mx-auto">
            We couldn't find any series matching the selected combination of
            genre and language.
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
