"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, Film, PlayCircle, Loader2, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/util/helper";
import { searchMovies } from "@/util/api";

const QUICK_TAGS = [
  "Spider-Man",
  "Avengers",
  "Batman",
  "Horror",
  "Sci-Fi",
  "Anime",
  "Comedy",
];

const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef(null);

  // Auto-focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  // Keyboard shortcut listener (ESC to close, Ctrl+K / Cmd+K to toggle)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Debounced search logic
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const data = await searchMovies(query, controller);
        setResults(data || []);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setIsSearching(false);
      }
    }, 350);

    return () => { clearTimeout(timer), controller.abort()};
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-start justify-center pt-16 sm:pt-24 px-4">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl border border-white/15 bg-[#111111] shadow-[0_25px_80px_rgba(0,0,0,0.85)]"
          >
            {/* Search Input Bar */}
            <div className="relative flex items-center border-b border-white/10 px-5 py-4">
              <Search className="h-5 w-5 text-white/50 shrink-0 mr-3" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search movies, TV shows, actors..."
                className="w-full bg-transparent text-base text-white placeholder-white/40 focus:outline-none font-medium"
              />
              {isSearching ? (
                <Loader2 className="h-5 w-5 animate-spin text-primary shrink-0 ml-2" />
              ) : query ? (
                <button
                  onClick={() => setQuery("")}
                  className="rounded-full p-1 text-white/50 hover:bg-white/10 hover:text-white transition"
                >
                  <X className="h-4 w-4" />
                </button>
              ) : null}
              <button
                onClick={onClose}
                className="ml-3 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/60 hover:bg-white/10 hover:text-white transition"
              >
                ESC
              </button>
            </div>

            {/* Modal Body */}
            <div className="max-h-[60dvh] overflow-y-auto p-5 scrollbar-thin scrollbar-thumb-white/10">
              {/* Quick Suggestion Tags (When query is empty) */}
              {!query.trim() && (
                <div className="space-y-4 py-2">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/40 font-semibold">
                    <Sparkles className="h-3.5 w-3.5 text-primary" />
                    <span>Popular Searches</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {QUICK_TAGS.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setQuery(tag)}
                        className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/70 hover:border-primary hover:bg-primary/10 hover:text-white transition"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Search Results List */}
              {query.trim() && !isSearching && results.length > 0 && (
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-widest text-white/40 font-semibold mb-2">
                    Found {results.length} Results
                  </p>
                  {results.slice(0, 8).map((movie) => {
                    const posterSrc =
                      getImageUrl(movie.poster_path || movie.thumb || movie.backdrop_path, "w500") ||
                      "https://image.tmdb.org/t/p/w500/bRwnj8WEKBCvmfeUNOukJPwB43K.jpg";
                    const year = movie.release_date
                      ? String(movie.release_date).split("-")[0]
                      : movie.year || "2026";

                    return (
                      <Link
                        key={movie.id}
                        href={movie.isSeries || movie.media_type === "tv" ? `/series/${movie.id}` : `/movie/${movie.id}`}
                        onClick={onClose}
                        className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.03] p-3 transition duration-200 hover:border-primary/40 hover:bg-white/[0.08] cursor-pointer"
                      >
                        {/* Thumbnail */}
                        <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded-xl bg-white/5">
                          <Image
                           loading="lazy"
                            src={posterSrc}
                            alt={movie.title || "poster"}
                            fill
                            className="object-cover transition duration-300 group-hover:scale-105"
                          />
                        </div>

                        {/* Title & Info */}
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-semibold text-white truncate group-hover:text-primary transition">
                              {movie.title || movie.titleMain || "Untitled"}
                            </h4>
                            <span className="shrink-0 rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-white/70">
                              {year}
                            </span>
                          </div>
                          <p className="text-xs text-white/50 line-clamp-1">
                            {movie.overview || "Stream in HD on MUVI Cinema."}
                          </p>
                        </div>

                        {/* Play Icon */}
                        <div className="shrink-0 text-white/40 group-hover:text-primary transition">
                          <PlayCircle className="h-6 w-6" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}

              {/* No Results Empty State */}
              {query.trim() && !isSearching && results.length === 0 && (
                <div className="py-12 text-center text-white/50 space-y-2">
                  <Film className="h-8 w-8 mx-auto text-white/30" />
                  <p className="text-sm">No movies or shows found for &quot;{query}&quot;</p>
                  <p className="text-xs text-white/40">Try searching for popular titles like &quot;Spider-Man&quot; or &quot;Avengers&quot;.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
