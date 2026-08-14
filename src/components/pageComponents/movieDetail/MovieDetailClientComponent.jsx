"use client";

import { useEffect, useState } from "react";
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
  Film,
  ArrowLeft,
  ChevronDown,
  Check,
} from "lucide-react";
import VideoModal from "@/components/common/VideoModal";
import ShareFloatingMenu from "@/components/common/ShareFloatingMenu";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const MOVIE_SERVERS = [
  {
    id: "vidking",
    name: "Server 1 (VidKing)",
    tag: "Ultra Fast",
    getUrl: (movieId) =>
      `https://www.vidking.net/embed/movie/${movieId}?color=e50914&autoPlay=true`,
  },
  {
    id: "autoembed",
    name: "Server 2 (AutoEmbed)",
    tag: "HD 1080p",
    getUrl: (movieId) => `https://player.autoembed.cc/embed/movie/${movieId}`,
  },
  {
    id: "superembed",
    name: "Server 3 (SuperEmbed)",
    tag: "Multi-Server",
    getUrl: (movieId) => `https://multiembed.mov/?video_id=${movieId}&tmdb=1`,
  },
  {
    id: "vidsrc",
    name: "Server 4 (VidSrc)",
    tag: "Backup",
    getUrl: (movieId) => `https://vidsrc.xyz/embed/movie/${movieId}`,
  },
];

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
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const isPlay = Boolean(searchParams.get("play"));

  // Full-Screen Player States
  const [selectedServer, setSelectedServer] = useState(MOVIE_SERVERS[0]);
  const [isServerOpen, setIsServerOpen] = useState(false);
  const [isLoadingIframe, setIsLoadingIframe] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(15);
  const [iframeKey, setIframeKey] = useState(Date.now());
  const [controlsVisible, setControlsVisible] = useState(true);

  // Lock body scroll and handle buffering progress when isPlay is active
  useEffect(() => {
    if (isPlay) {
      document.body.style.overflow = "hidden";
      setIsLoadingIframe(true);
      setLoadingProgress(15);

      const progressInterval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 92) {
            clearInterval(progressInterval);
            return 92;
          }
          return prev + Math.floor(Math.random() * 12) + 8;
        });
      }, 120);

      const readyTimer = setTimeout(() => {
        setIsLoadingIframe(false);
      }, 1600);

      return () => {
        document.body.style.overflow = "";
        clearInterval(progressInterval);
        clearTimeout(readyTimer);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isPlay, selectedServer, iframeKey]);

  // Auto-hide controls after inactivity
  useEffect(() => {
    if (!isPlay) return;

    let timeout;
    const resetTimer = () => {
      setControlsVisible(true);
      clearTimeout(timeout);
      if (!isServerOpen) {
        timeout = setTimeout(() => {
          setControlsVisible(false);
        }, 3500);
      }
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("touchstart", resetTimer);
    resetTimer();

    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("touchstart", resetTimer);
      clearTimeout(timeout);
    };
  }, [isPlay, isServerOpen]);

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
    title ||
    movie?.titleMain ||
    movie?.title ||
    movie?.original_title ||
    "Untitled";
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

  const handleCloseVideoPlayer = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("play");
    const q = params.toString();
    router.replace(pathname + (q ? "?" + q : ""));
  };

  return (
    <div className="relative min-h-screen w-full bg-background text-text overflow-hidden">
      {/* ── 100% FULL-SCREEN CINEMA PLAYER (MATCHING REFERENCE DESIGN) ── */}
      {isPlay && (
        <div
          className={`fixed inset-0 z-[99999] h-screen w-screen min-h-[100dvh] max-h-[100dvh] bg-black overflow-hidden flex flex-col justify-between select-none ${
            !controlsVisible ? "cursor-none" : ""
          }`}
        >
          {/* Top-Left Back Arrow Button (Prominent & Always Accessible on Mobile) */}
          <button
            type="button"
            onClick={handleCloseVideoPlayer}
            className={`fixed top-4 left-4 z-[100] flex h-10 w-11 items-center justify-center rounded-xl border border-white/20 bg-black/85 text-white backdrop-blur-xl transition duration-200 hover:bg-white/20 hover:border-white/40 cursor-pointer shadow-[0_4px_25px_rgba(0,0,0,0.8)] active:scale-95 ${
              controlsVisible ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            title="Back to Movie (Esc)"
            aria-label="Back to movie details"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          {/* Buffering / Preparing Stream Card (Matching Reference Design) */}
          {isLoadingIframe && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black p-4 text-white">
              <div className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-[#121212]/95 p-6 sm:p-7 shadow-[0_20px_70px_rgba(0,0,0,0.9)] backdrop-blur-2xl flex flex-col items-center text-center gap-3">
                {/* Brand Category Tag */}
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
                  MOVIEFACK • STREAM
                </span>

                {/* Main Heading */}
                <h3 className="text-base sm:text-lg font-black uppercase tracking-wider text-white">
                  PREPARING YOUR STREAM
                </h3>

                {/* Subtitle */}
                <p className="text-xs text-white/60 -mt-1 font-medium">
                  Buffering the first frame
                </p>

                {/* Animated Red Progress Bar */}
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mt-3">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-150 ease-out shadow-[0_0_10px_rgba(255,59,48,0.8)]"
                    style={{ width: `${loadingProgress}%` }}
                  />
                </div>

                {/* Status and Percentage Footer */}
                <div className="w-full flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-white/40 pt-1">
                  <span>WAITING FOR PLAYBACK</span>
                  <span className="text-white/70 font-mono">
                    {loadingProgress}%
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Full-Screen Video Player iFrame */}
          <div className="relative z-10 h-full w-full flex-1 bg-black flex items-center justify-center">
            {movieId ? (
              <iframe
                key={iframeKey}
                src={selectedServer.getUrl(movieId)}
                title={titleMain}
                className="h-full w-full border-0 absolute inset-0 bg-black"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                onLoad={() => {
                  setTimeout(() => setIsLoadingIframe(false), 900);
                }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 text-center p-6 text-white">
                <p className="text-base font-bold">Video stream unavailable</p>
                <button
                  onClick={handleCloseVideoPlayer}
                  className="rounded-full bg-primary px-5 py-2 text-xs font-bold uppercase tracking-wider text-white cursor-pointer"
                >
                  Back to Details
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── STANDARD MOVIE DETAILS HERO BANNER ── */}
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
                {movie?.runtime || "2h 15m"}
              </span>
              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 font-medium uppercase">
                {movie?.adult ? "18+" : "PG-13"}
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
              {movie?.overview ||
                movie?.description ||
                "Stream this blockbuster movie in Ultra HD on MUVI Cinema."}
            </p>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              {/* Play Button */}
              <button
                onClick={handleWatchNowButtonClick}
                className="group flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-[0_0_30px_rgba(255,59,48,0.45)] transition hover:bg-primary-hover hover:shadow-[0_0_40px_rgba(255,59,48,0.6)] cursor-pointer"
              >
                <PlayCircle className="h-5 w-5" />
                <span>Play Now</span>
              </button>

              {/* Watch Trailer Button */}
              <button
                onClick={() => setIsTrailerOpen(true)}
                className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md transition hover:border-white/40 hover:bg-white/20 cursor-pointer"
              >
                <Tv className="h-4 w-4" />
                <span>Watch Trailer</span>
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => addToWishlist(movie)}
                className={`flex items-center gap-2 rounded-full border px-5 py-3.5 text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                  isSaved
                    ? "border-primary bg-primary text-white shadow-[0_0_20px_rgba(255,59,48,0.4)]"
                    : "border-white/20 bg-white/10 text-white backdrop-blur-md hover:border-primary hover:bg-primary"
                }`}
              >
                <Bookmark className={`h-4 w-4 ${isSaved ? "fill-white" : ""}`} />
                <span>{isSaved ? "Saved" : "My List"}</span>
              </button>

              {/* Expandable Radial Share Menu */}
              <ShareFloatingMenu title={titleMain} />
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
        id={movie?.id}
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
