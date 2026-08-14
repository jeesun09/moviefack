"use client";

import { useState } from "react";
import Image from "next/image";
import { getImageUrl } from "@/util/helper";
import { useAuth } from "@/context/AuthContext";
import TrailerModal from "@/components/common/TrailerModal";
import SectionSlider from "@/components/pageComponents/homePage/SectionSlider";
import {
  PlayCircle,
  Tv,
  Bookmark,
  Share2,
  Star,
  CheckCircle2,
  User,
  X,
  Film,
} from "lucide-react";
import VideoModal from "@/components/common/VideoModal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const MovieDetailClientComponent = ({
  movie,
  trailerKey,
  cast,
  similarMovies,
  id,
  title,
}) => {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [isMovieOpen, setIsMovieOpen] = useState(false);
  const [shareToast, setShareToast] = useState(false);
  const { addToWishlist, isMovieInWishlist } = useAuth();
  const movieId = movie?.id || id;
  const isSaved = isMovieInWishlist(movieId);
  const searchParams = useSearchParams("play");
  const router = useRouter();
  const pathname = usePathname();
  const isPlay = Boolean(searchParams.get("play"));

  const backdropSrc =
    getImageUrl(
      movie?.backdrop_path || movie?.backdrop || movie?.poster_path,
      "original",
    ) || "https://image.tmdb.org/t/p/original/8Tfys3mDZVp4tNoH2ktm06a0Tau.jpg";

  const posterSrc =
    getImageUrl(
      movie?.poster_path || movie?.thumb || movie?.backdrop_path,
      "w500",
    ) || "https://image.tmdb.org/t/p/w500/yihdXomYb5kTeSivtFndMy5iDmf.jpg";

  const titleMain =
    title || movie?.titleMain || movie?.title || movie?.original_title || "Untitled";
  const titleSub = movie?.titleSub || "";
  const releaseYear = movie?.release_date
    ? String(movie.release_date).split("-")[0]
    : movie?.year || "2026";

  const ratingDisplay =
    typeof movie?.vote_average === "number"
      ? movie.vote_average.toFixed(1)
      : movie?.rating || "8.5";

  const genreList =
    Array.isArray(movie?.genre) && movie.genre.length
      ? movie.genre
      : ["Action", "Adventure", "Sci-Fi"];

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      setShareToast(true);
      setTimeout(() => setShareToast(false), 2500);
    }
  };

  const handleWatchNowButtonClick = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("play");
    params.set("play", "true");
    router.push(pathname + "?" + params.toString());
  };

  return (
    <div className="relative min-h-screen w-full bg-background text-text overflow-hidden">
      {/* ── FULL WIDTH HERO DETAILS BANNER ── */}
      {isPlay ? (
        <section className="relative w-full min-h-fit lg:min-h-[90vh] flex flex-col justify-end pt-28 pb-16 px-4 sm:px-8 lg:px-12">
          {/* Full-Bleed Backdrop Image with Cinema Blur */}
          <div className="absolute inset-0 z-0">
            <Image
              src={backdropSrc}
              alt={titleMain}
              fill
              priority
              className="object-cover object-center blur-2xl scale-110 opacity-30"
            />
            {/* Deep Dark Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/95" />
            <div className="absolute inset-0 bg-radial from-transparent via-black/60 to-black/90" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[1600px]">
            <div
              className="relative z-10 w-full overflow-hidden rounded-3xl border border-white/15 bg-[#0f0f0f] shadow-[0_25px_80px_rgba(0,0,0,0.9)]"
            >
              {/* Top Bar */}
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                <div className="flex items-center gap-2 w-[90%]">
                  <Film className="h-5 w-5 text-primary" />
                  {titleMain && (
                    <h3 className="text-base font-bold text-white truncate max-w-md">
                      {titleMain}
                    </h3>
                  )}
                </div>
                <button
                  onClick={() => {
                    const params = new URLSearchParams(searchParams.toString());
                    params.delete("play");
                    const q = params.toString();
                    router.push(pathname + (q ? "?" + q : ""));
                  }}
                  className="rounded-full border border-white/10 bg-white/5 p-2 text-white/70 hover:bg-white/10 hover:text-white transition cursor-pointer"
                  aria-label="Close player"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Video Player iFrame Container */}
              <div className="relative w-full aspect-video bg-black">
                {movieId ? (
                  <iframe
                    src={`https://www.vidking.net/embed/movie/${movieId}?color=e50914&autoPlay=true`}
                    width="100%"
                    height="100%"
                    className="absolute inset-0 h-full w-full border-0"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-white/50">
                    Video currently unavailable.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="relative w-full min-h-[85vh] lg:min-h-[90vh] flex items-end pt-28 pb-16 px-4 sm:px-8 lg:px-12">
          {/* Full-Bleed Backdrop Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src={backdropSrc}
              alt={titleMain}
              fill
              priority
              className="object-cover object-center"
            />
            {/* Deep Dark Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
          </div>

          {/* Hero Content Box */}
          <div className="relative z-10 mx-auto w-full max-w-[1600px] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            {/* Main Detail Content (Col 1-8) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Metadata Tags */}
              <div className="flex flex-wrap items-center gap-2.5 text-xs text-white/80">
                <span className="flex items-center gap-1 rounded-full bg-amber-500/20 border border-amber-500/40 px-3 py-1 text-amber-400 font-bold">
                  <Star className="h-3.5 w-3.5 fill-amber-400" />
                  <span>IMDb {ratingDisplay}</span>
                </span>
                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 font-medium">
                  {releaseYear}
                </span>
                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 font-medium">
                  {movie.runtime || "2h 15m"}
                </span>
                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 font-medium uppercase">
                  {movie.adult ? "18+" : "PG-13"}
                </span>
                <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-semibold text-primary">
                  HD 4K
                </span>
              </div>

              {/* Title */}
              <div className="space-y-1">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none">
                  {titleMain}
                </h1>
                {titleSub && (
                  <p className="text-xl sm:text-2xl font-bold text-primary">
                    {titleSub}
                  </p>
                )}
              </div>

              {/* Genres */}
              <p className="text-sm font-semibold text-white/70">
                Genre:&nbsp;
                <span className="text-white">{genreList.join(" • ")}</span>
              </p>

              {/* Synopsis / Description */}
              <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-white/75 line-clamp-4">
                {movie.overview ||
                  movie.description ||
                  "Stream this blockbuster movie in Ultra HD on MUVI Cinema."}
              </p>

              {/* ACTION BUTTONS */}
              <div className="flex flex-wrap items-center gap-3 pt-4">
                {/* Play Button */}
                <button
                  onClick={handleWatchNowButtonClick}
                  className="group flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-[0_0_30px_rgba(255,59,48,0.45)] transition hover:bg-primary-hover hover:shadow-[0_0_40px_rgba(255,59,48,0.6)]"
                >
                  <PlayCircle className="h-5 w-5" />
                  <span>Play Now</span>
                </button>

                {/* Watch Trailer Button */}
                <button
                  onClick={() => setIsTrailerOpen(true)}
                  className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md transition hover:border-white/40 hover:bg-white/20"
                >
                  <Tv className="h-4 w-4" />
                  <span>Watch Trailer</span>
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => addToWishlist(movie)}
                  className={`flex items-center gap-2 rounded-full border px-5 py-3.5 text-xs font-bold uppercase tracking-wider transition ${isSaved
                    ? "border-primary bg-primary text-white shadow-[0_0_20px_rgba(255,59,48,0.4)]"
                    : "border-white/20 bg-white/10 text-white backdrop-blur-md hover:border-primary hover:bg-primary"
                    }`}
                >
                  <Bookmark
                    className={`h-4 w-4 ${isSaved ? "fill-white" : ""}`}
                  />
                  <span>{isSaved ? "Saved" : "My List"}</span>
                </button>

                {/* Share Button */}
                <button
                  onClick={handleShare}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:border-white/40 hover:bg-white/20"
                  aria-label="Share movie"
                >
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Side Poster Card (Col 9-12) */}
            <div className="hidden lg:block lg:col-span-4">
              <div className="relative aspect-[2/3] w-72 ml-auto overflow-hidden rounded-3xl border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                <Image
                  src={posterSrc}
                  alt={titleMain}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── CAST SECTION SLIDER ── */}
      {cast && cast.length > 0 && (
        <section className="mx-auto max-w-[1600px] px-4 sm:px-8 lg:px-12 lg:py-12 py-8 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
            Top Cast & Crew
          </h2>
          <div className="flex items-center gap-4 overflow-x-auto pb-0 scrollbar-none">
            {cast.map((actor) => {
              const actorPhoto = actor.profile_path
                ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                : null;

              return (
                <div
                  key={actor.id}
                  className="flex shrink-0 items-center gap-3 rounded-2xl border border-white/10 bg-surface/60 p-3 w-56 backdrop-blur-md transition duration-300 hover:border-white/25"
                >
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-white/10 flex items-center justify-center">
                    {actorPhoto ? (
                      <Image
                        src={actorPhoto}
                        alt={actor.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <User className="h-6 w-6 text-white/50" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-white truncate">
                      {actor.name}
                    </h4>
                    <p className="text-[11px] text-white/60 truncate">
                      {actor.character || "Actor"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ── MORE LIKE THIS (SIMILAR MOVIES) ── */}
      {similarMovies && similarMovies.length > 0 && (
        <div className="space-y-16 px-4 pb-20 pt-12 sm:px-6 lg:px-12">
          <section className="">
            <SectionSlider
              title="More Like This"
              subtitle="Recommended movies and shows tailored for fans of this title."
              movies={similarMovies}
            />
          </section>
        </div>
      )}

      {/* Trailer Video Modal Popup */}
      <TrailerModal
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
        trailerKey={trailerKey}
        title={titleMain}
      />

      <VideoModal
        isOpen={isMovieOpen}
        onClose={() => setIsMovieOpen(false)}
        id={movie.id}
        title={titleMain}
      />

      {/* Share Toast Feedback */}
      {shareToast && (
        <div className="fixed bottom-6 right-6 z-100 flex items-center gap-2 rounded-2xl border border-white/20 bg-black/90 px-4 py-3 text-xs font-semibold text-white shadow-xl backdrop-blur-xl">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>Movie link copied to clipboard!</span>
        </div>
      )}
    </div>
  );
};

export default MovieDetailClientComponent;
