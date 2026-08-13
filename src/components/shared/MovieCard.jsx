"use client";

import { getImageUrl } from "@/util/helper";
import { PlayCircle, Bookmark } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const MovieCard = ({ movie = {} }) => {
  const { addToWishlist, isMovieInWishlist } = useAuth();
  const movieId = movie.id || 1;
  const isSaved = isMovieInWishlist(movieId);

  const posterSrc =
    getImageUrl(movie.poster_path || movie.thumb || movie.backdrop_path || movie.backdrop, "w500") ||
    "https://image.tmdb.org/t/p/w500/bRwnj8WEKBCvmfeUNOukJPwB43K.jpg";

  const releaseYear = movie.release_date
    ? String(movie.release_date).split("-")[0]
    : movie.year || "2026";

  const ratingDisplay = typeof movie.vote_average === "number"
    ? `${movie.vote_average.toFixed(1)}/10`
    : movie.rating
      ? `${movie.rating}/10`
      : "N/A";

  const genreDisplay = Array.isArray(movie.genre) && movie.genre.length
    ? movie.genre[0]
    : "Movie";

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    addToWishlist(movie);
  };

  const isSeriesContent = movie.isSeries || movie.media_type === "tv" || movie.type === "series" || !!movie.first_air_date;
  const targetHref = isSeriesContent ? `/series/${movieId}` : `/movie/${movieId}`;

  return (
    <Link href={targetHref} className="block">
      <article className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-surface shadow-[0_18px_60px_rgba(0,0,0,0.22)] transition duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[0_24px_80px_rgba(0,0,0,0.32)] cursor-pointer">
        <div className="relative xxl:min-h-110.25 xl:h-105 lg:h-100 md:h-90 h-70 overflow-hidden rounded-[28px] bg-white/5">
          <Image
            height={500}
            width={500}
            src={posterSrc}
            alt={movie.title || "Movie poster"}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />

          {/* Top-right Wishlist Bookmark Button */}
          <button
            onClick={handleBookmarkClick}
            aria-label="Add to wishlist"
            className={`absolute top-3 right-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border transition duration-300 ${isSaved
                ? "border-primary bg-primary text-white shadow-[0_0_15px_rgba(255,59,48,0.5)]"
                : "border-white/20 bg-black/50 text-white/80 backdrop-blur-md hover:border-primary hover:bg-primary hover:text-white"
              }`}
          >
            <Bookmark className={`h-4 w-4 ${isSaved ? "fill-white" : ""}`} />
          </button>

          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-90 transition duration-300 group-hover:opacity-100" />

          <div className="absolute inset-x-0 bottom-0 p-4 text-white">
            <div className="mb-3 flex items-center justify-between text-[11px] uppercase tracking-[0.24em] text-white/60">
              <span>{releaseYear}</span>
              <span className="rounded-full border border-white/10 bg-white/10 px-2 py-1 text-[10px] uppercase text-white/80">
                {movie.adult ? "18+" : movie.age || "PG-13"}
              </span>
            </div>

            <h3 className="text-[0.95rem] font-semibold leading-5 text-white line-clamp-2">
              {movie.title || movie.titleMain || "Untitled Movie"}
            </h3>

            <div className="mt-3 flex items-center justify-between text-[11px] text-white/60">
              <span className="font-medium text-amber-400">
                ★ {ratingDisplay}
              </span>
              <span>{genreDisplay}</span>
            </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100 pointer-events-none">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/70 text-white shadow-[0_0_30px_rgba(255,255,255,0.16)]">
              <PlayCircle className="h-8 w-8" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default MovieCard;
