"use client";

import Image from "next/image";
import Link from "next/link";
import { Play, Star, Bookmark, Info, Sparkles } from "lucide-react";
import { getImageUrl } from "@/util/helper";
import { useAuth } from "@/context/AuthContext";

export default function CinemaSpotlightBanner({
  movie,
  badge = "CRITICS' CHOICE",
  tagline = "Spotlight Premiere of the Week",
}) {
  const { addToWishlist, isMovieInWishlist } = useAuth();

  if (!movie) return null;

  const isSaved = isMovieInWishlist(movie.id);
  const backdrop =
    getImageUrl(movie.backdrop_path || movie.poster_path, "original") ||
    "https://image.tmdb.org/t/p/original/r013C8Me2bZ0pUi0OWJRh0h7MzT.jpg";

  const poster =
    getImageUrl(movie.poster_path || movie.backdrop_path, "w500") ||
    "https://image.tmdb.org/t/p/w500/yihdXomYb5kTeSivtFndMy5iDmf.jpg";

  const titleMain =
    movie.titleMain || movie.title || movie.name || "Spotlight Movie";
  const rating =
    typeof movie.vote_average === "number"
      ? movie.vote_average.toFixed(1)
      : movie.rating || "8.8";

  const year = movie.release_date
    ? String(movie.release_date).split("-")[0]
    : movie.year || "2024";

  return (
    <section className="relative my-12 overflow-hidden rounded-3xl border border-white/15 bg-surface/50 shadow-[0_25px_80px_rgba(0,0,0,0.9)]">
      {/* Full Bleed Backdrop Image */}
      <div className="relative min-h-[460px] sm:min-h-[500px] lg:min-h-[540px] w-full flex items-center">
        <Image
          loading="lazy"
          src={backdrop}
          alt={titleMain}
          fill

          className="object-cover object-center"
        />

        {/* Deep Cinema Ambient Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/65 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-transparent" />

        {/* Two-Column Grid: Left Info, Right Poster Card */}
        <div className="relative z-10 grid grid-cols-1 items-center gap-8 p-6 sm:p-10 lg:grid-cols-12 lg:gap-12 lg:p-14 w-full">
          {/* Left Details (Col 1-8) */}
          <div className="space-y-4 lg:col-span-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1 rounded-full bg-primary/20 border border-primary/40 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-primary shadow">
                <Sparkles className="h-3 w-3 fill-primary text-primary" />
                <span>{badge}</span>
              </span>
              <span className="text-xs font-semibold text-white/60">
                {tagline}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-none">
              {titleMain}
            </h2>

            <div className="flex items-center gap-3 text-xs text-white/80 font-medium">
              <span className="flex items-center gap-1 rounded-full bg-amber-500/20 border border-amber-500/40 px-2.5 py-0.5 text-amber-400 font-bold">
                <Star className="h-3 w-3 fill-amber-400" />
                <span>IMDb {rating}</span>
              </span>
              <span>{year}</span>
              <span>•</span>
              <span className="rounded-md border border-white/20 bg-white/10 px-2 py-0.5 font-bold uppercase text-[10px]">
                Ultra HD 4K
              </span>
            </div>

            <p className="text-xs sm:text-sm text-white/70 line-clamp-3 leading-relaxed max-w-xl">
              {movie.overview ||
                "Experience this acclaimed cinematic masterpiece in 4K Ultra HD on MUVI Cinema."}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <Link
                href={`/movie/${movie.id}?play=true`}
                className="flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-[0_0_25px_rgba(255,59,48,0.5)] transition duration-300 hover:bg-primary-hover hover:scale-105 active:scale-95"
              >
                <Play className="h-4 w-4 fill-white" />
                <span>Play Now</span>
              </Link>

              <Link
                href={`/movie/${movie.id}`}
                className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md transition duration-300 hover:bg-white/20 hover:border-white/40 active:scale-95"
              >
                <Info className="h-4 w-4" />
                <span>More Details</span>
              </Link>

              <button
                type="button"
                onClick={() => addToWishlist(movie)}
                className={`flex h-11 w-11 items-center justify-center rounded-full border transition cursor-pointer ${isSaved
                    ? "border-primary bg-primary text-white shadow-[0_0_15px_rgba(255,59,48,0.4)]"
                    : "border-white/20 bg-white/10 text-white hover:border-white/40 hover:bg-white/20"
                  }`}
                title={isSaved ? "Saved in List" : "Add to List"}
              >
                <Bookmark className={`h-4 w-4 ${isSaved ? "fill-white" : ""}`} />
              </button>
            </div>
          </div>

          {/* Right Floating Poster Card (Col 9-12) */}
          <div className="hidden md:flex lg:col-span-4 justify-end">
            <Link
              href={`/movie/${movie.id}`}
              className="group relative aspect-[2/3] w-56 sm:w-64 lg:w-72 overflow-hidden rounded-3xl border border-white/20 bg-black/60 shadow-[0_20px_60px_rgba(0,0,0,0.85)] transition-all duration-500 hover:scale-105 hover:border-primary hover:shadow-[0_25px_70px_rgba(255,59,48,0.4)]"
            >
              <Image
                loading="lazy"
                src={poster}
                alt={titleMain}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition" />

              {/* Hover Play Button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 bg-black/40">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-[0_0_30px_rgba(255,59,48,0.9)]">
                  <Play className="h-6 w-6 fill-white ml-0.5" />
                </div>
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-center">
                <span className="rounded-full bg-black/80 border border-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow">
                  Watch in 4K
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
