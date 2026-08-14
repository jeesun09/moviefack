"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { getImageUrl } from "@/util/helper";
import { useAuth } from "@/context/AuthContext";
import TrailerModal from "@/components/common/TrailerModal";
import VideoModal from "@/components/common/VideoModal";
import SectionSlider from "@/components/pageComponents/homePage/SectionSlider";
import { getSeriesSeasonEpisodes } from "@/util/api";
import {
  PlayCircle,
  Tv,
  Bookmark,
  Share2,
  Star,
  CheckCircle2,
  User,
  Search,
  ArrowUpDown,
  ChevronDown,
  Check,
} from "lucide-react";
import SeriesModal from "@/components/common/SeriesModal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SeriesDetailClientComponent = ({
  series,
  initialEpisodes = [],
  trailerKey,
  cast = [],
  similarSeries = [],
}) => {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [activeEpisode, setActiveEpisode] = useState(null);

  const [selectedSeason, setSelectedSeason] = useState(1);
  const [episodes, setEpisodes] = useState(initialEpisodes);
  const [isLoadingEpisodes, setIsLoadingEpisodes] = useState(false);

  const [isSeasonOpen, setIsSeasonOpen] = useState(false);
  const seasonDropdownRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [isSortDesc, setIsSortDesc] = useState(false);

  const [shareToast, setShareToast] = useState(false);
  const { addToWishlist, isMovieInWishlist } = useAuth();
  const isSaved = isMovieInWishlist(series.id);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const season = searchParams.get("season");
  const episode = searchParams.get("episode");

  // Close season dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        seasonDropdownRef.current &&
        !seasonDropdownRef.current.contains(e.target)
      ) {
        setIsSeasonOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch season episodes when season selector changes
  useEffect(() => {
    let isMounted = true;
    const loadSeasonData = async () => {
      if (
        selectedSeason === 1 &&
        initialEpisodes &&
        initialEpisodes.length > 0
      ) {
        setEpisodes(initialEpisodes);
        return;
      }
      setIsLoadingEpisodes(true);
      try {
        const data = await getSeriesSeasonEpisodes(series.id, selectedSeason);
        if (isMounted) {
          setEpisodes(data || []);
        }
      } catch (err) {
        console.error("Error loading season episodes:", err);
      } finally {
        if (isMounted) setIsLoadingEpisodes(false);
      }
    };

    loadSeasonData();
    return () => {
      isMounted = false;
    };
  }, [selectedSeason, series.id, initialEpisodes]);

  // Backdrop and Poster images
  const backdropSrc =
    getImageUrl(
      series.backdrop_path || series.backdrop || series.poster_path,
      "original",
    ) || "https://image.tmdb.org/t/p/original/r013C8Me2bZ0pUi0OWJRh0h7MzT.jpg";

  const posterSrc =
    getImageUrl(
      series.poster_path || series.thumb || series.backdrop_path,
      "w500",
    ) || "https://image.tmdb.org/t/p/w500/yihdXomYb5kTeSivtFndMy5iDmf.jpg";

  const titleMain =
    series.titleMain || series.title || series.name || "Untitled Series";
  const titleSub = series.titleSub || "";
  const releaseYear = series.release_date
    ? String(series.release_date).split("-")[0]
    : series.year || "2024";

  const ratingDisplay =
    typeof series.vote_average === "number"
      ? series.vote_average.toFixed(1)
      : series.rating || "8.4";

  const genreList =
    Array.isArray(series.genre) && series.genre.length
      ? series.genre
      : ["Action", "Crime", "Drama", "Thriller"];

  const seasonsList = Array.from(
    { length: series.number_of_seasons || 3 },
    (_, i) => i + 1,
  );

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      setShareToast(true);
      setTimeout(() => setShareToast(false), 2500);
    }
  };

  const handlePlayEpisode = (ep) => {
    // setActiveEpisode(ep);
    // setIsVideoOpen(true);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("season");
    params.delete("episode");

    params.set("season", ep.season_number);
    params.set("episode", ep.episode_number);

    router.push(pathname + "?" + params.toString());
  };

  const handlePlaySeries = () => {
    // const ep1 = episodes[0] || {
    //   name: "Episode 1",
    //   episode_number: 1,
    //   season_number: selectedSeason,
    // };
    // setActiveEpisode(ep1);
    // setIsVideoOpen(true);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("season");
    params.delete("episode");

    params.set("season", selectedSeason);
    params.set("episode", "1");

    router.push(pathname + "?" + params.toString());
  };

  // Handle select season
  const handleSelectSeason = (num) => {
    setSelectedSeason(num);
    setIsSeasonOpen(false);
    
    const params = new URLSearchParams(searchParams.toString());
    params.delete("season");
    params.delete("episode");
    params.set("season", num);
    router.push(pathname + "?" + params.toString());
  };

  // Filter and Sort Episodes
  const filteredEpisodes = episodes
    .filter((ep) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        (ep.name && ep.name.toLowerCase().includes(q)) ||
        (ep.overview && ep.overview.toLowerCase().includes(q)) ||
        String(ep.episode_number).includes(q)
      );
    })
    .sort((a, b) => {
      if (isSortDesc) return b.episode_number - a.episode_number;
      return a.episode_number - b.episode_number;
    });

  console.log("Season Episodes:", season, episode);

  return (
    <div className="relative min-h-screen w-full bg-background text-text overflow-hidden">
      {season && episode ? (
        <></>
      ) : (
        <>
          {/* ── FULL WIDTH HERO DETAILS BANNER ── */}
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
              {/* Dark Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
            </div>

            {/* Hero Content Grid */}
            <div className="relative z-10 mx-auto w-full max-w-[1600px] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
              {/* Main Detail Content (Col 1-8) */}
              <div className="lg:col-span-8 space-y-6">
                {/* Metadata Badges */}
                <div className="flex flex-wrap items-center gap-2.5 text-xs text-white/80">
                  <span className="flex items-center gap-1 rounded-full bg-amber-500/20 border border-amber-500/40 px-3 py-1 text-amber-400 font-bold">
                    <Star className="h-3.5 w-3.5 fill-amber-400" />
                    <span>IMDb {ratingDisplay}</span>
                  </span>
                  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 font-medium">
                    {releaseYear}
                  </span>
                  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 font-medium">
                    {series.number_of_seasons || 3}{" "}
                    {series.number_of_seasons === 1 ? "Season" : "Seasons"}
                  </span>
                  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 font-medium uppercase">
                    {series.adult ? "18+" : "TV-MA"}
                  </span>
                  <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-semibold text-primary">
                    Ultra HD 4K
                  </span>
                </div>

                {/* Title */}
                <div className="space-y-1">
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none uppercase">
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

                {/* Overview / Synopsis */}
                <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-white/75 line-clamp-4">
                  {series.overview ||
                    "Binge-watch this acclaimed original TV series in full 4K Ultra HD on MUVI Cinema."}
                </p>

                {/* ACTION BUTTONS */}
                <div className="flex flex-wrap items-center gap-3 pt-4">
                  {/* Play Button */}
                  <button
                    onClick={handlePlaySeries}
                    className="group flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-[0_0_30px_rgba(255,59,48,0.45)] transition hover:bg-primary-hover hover:shadow-[0_0_40px_rgba(255,59,48,0.6)]"
                  >
                    <PlayCircle className="h-5 w-5" />
                    <span>Play Season {selectedSeason}</span>
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
                    onClick={() => addToWishlist(series)}
                    className={`flex items-center gap-2 rounded-full border px-5 py-3.5 text-xs font-bold uppercase tracking-wider transition ${
                      isSaved
                        ? "border-primary bg-primary text-white shadow-[0_0_20px_rgba(255,59,48,0.4)]"
                        : "border-white/20 bg-white/10 text-white backdrop-blur-md hover:border-primary hover:bg-primary"
                    }`}
                  >
                    <Bookmark
                      className={`h-4 w-4 ${isSaved ? "fill-white" : ""}`}
                    />
                    <span>{isSaved ? "Saved" : "In My List"}</span>
                  </button>

                  {/* Share Button */}
                  <button
                    onClick={handleShare}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:border-white/40 hover:bg-white/20"
                    aria-label="Share series"
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
        </>
      )}

      {/* ── SERIES PLAYLIST / EPISODES SECTION ── */}
      <section className="mx-auto max-w-[1600px] px-4 sm:px-8 lg:px-12 py-10 space-y-6">
        {/* Section Header */}
        <div className="space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/50">
            Continue The Story
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Episodes
          </h2>
        </div>

        {/* Controls Bar (Season Selector, Search Input, Sort Toggle) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2 pb-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Custom Season Selector Dropdown */}
            <div className="flex flex-col space-y-1">
              <span className="text-[10px] uppercase font-bold text-white/40 tracking-wider">
                Season
              </span>
              <div
                className="relative inline-block min-w-44"
                ref={seasonDropdownRef}
              >
                {/* Dropdown Button Trigger */}
                <button
                  type="button"
                  onClick={() => setIsSeasonOpen((prev) => !prev)}
                  className={`flex w-full items-center justify-between gap-4 rounded-xl border py-2.5 px-4 text-xs font-bold text-white backdrop-blur-md transition duration-200 cursor-pointer ${
                    isSeasonOpen
                      ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(255,59,48,0.3)]"
                      : "border-white/15 bg-white/5 hover:border-white/30 hover:bg-white/10"
                  }`}
                >
                  <span>Season {selectedSeason}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-white/70 transition-transform duration-300 ${
                      isSeasonOpen ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>

                {/* Animated Dropdown Menu */}
                <AnimatePresence>
                  {isSeasonOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute left-0 top-full z-50 mt-2 w-full min-w-48 overflow-hidden rounded-2xl border border-white/15 bg-[#141414]/95 p-1.5 shadow-[0_20px_60px_rgba(0,0,0,0.85)] backdrop-blur-xl"
                    >
                      <div className="space-y-1">
                        {seasonsList.map((num) => {
                          const isSelected = num === selectedSeason;
                          return (
                            <button
                              key={`season-item-${num}`}
                              type="button"
                              onClick={() => handleSelectSeason(num)}
                              className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-bold transition duration-150 ${
                                isSelected
                                  ? "bg-primary text-white shadow-[0_0_15px_rgba(255,59,48,0.4)]"
                                  : "text-white/80 hover:bg-white/10 hover:text-white"
                              }`}
                            >
                              <span>Season {num}</span>
                              {isSelected && (
                                <Check className="h-4 w-4 text-white" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Episode Search & Sort Controls */}
          <div className="flex items-end gap-2">
            {/* Search Input */}
            <div className="flex flex-col space-y-1 flex-1 sm:w-64">
              <span className="text-[10px] uppercase font-bold text-white/40 tracking-wider">
                Find An Episode
              </span>
              <div className="relative flex items-center">
                <Search className="absolute left-3 h-3.5 w-3.5 text-white/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search episode..."
                  className="w-full rounded-xl border border-white/15 bg-white/5 py-2.5 pl-9 pr-3 text-xs text-white placeholder-white/40 backdrop-blur-md focus:border-primary focus:outline-none transition"
                />
              </div>
            </div>

            {/* Sort Toggle Button */}
            <div className="flex flex-col space-y-1">
              <span className="text-[10px] uppercase font-bold text-white/40 tracking-wider opacity-0">
                Sort
              </span>
              <button
                onClick={() => setIsSortDesc((prev) => !prev)}
                className={`flex h-10 w-10 items-center justify-center rounded-xl border transition ${
                  isSortDesc
                    ? "border-primary bg-primary/20 text-primary"
                    : "border-white/15 bg-white/5 text-white/70 hover:border-white/30 hover:text-white"
                }`}
                title={isSortDesc ? "Sort Ascending" : "Sort Descending"}
              >
                <ArrowUpDown className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Episode Playlist Cards Container */}
        <div className="space-y-3">
          {isLoadingEpisodes ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={`ep-skel-${idx}`}
                  className="h-28 w-full animate-pulse rounded-2xl border border-white/10 bg-white/5"
                />
              ))}
            </div>
          ) : filteredEpisodes.length > 0 ? (
            filteredEpisodes.map((ep) => {
              const epImage = ep.still_path
                ? getImageUrl(ep.still_path, "w500") || backdropSrc
                : backdropSrc;

              return (
                <div
                  key={`ep-${ep.id || ep.episode_number}`}
                  onClick={() => handlePlayEpisode(ep)}
                  className="group relative flex flex-col md:flex-row items-start md:items-center gap-4 sm:gap-6 rounded-2xl border border-white/10 bg-surface/50 p-4 backdrop-blur-md transition duration-300 hover:border-primary/50 hover:bg-white/[0.08] cursor-pointer"
                >
                  {/* Thumbnail with Play Icon and Episode Number */}
                  <div className="relative h-32 md:h-28 w-full md:w-52 shrink-0 overflow-hidden rounded-xl bg-white/10 border border-white/10">
                    <Image
                      src={epImage}
                      alt={ep.name}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />

                    {/* Episode Number Badge (Bottom-Left Overlay) */}
                    <div className="absolute bottom-2 left-2 flex h-6 w-6 items-center justify-center rounded bg-black/80 text-xs font-bold text-white border border-white/20">
                      {ep.episode_number}
                    </div>

                    {/* Hover Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shadow-lg">
                        <PlayCircle className="h-6 w-6" />
                      </div>
                    </div>
                  </div>

                  {/* Episode Content */}
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-base sm:text-lg font-bold text-white truncate group-hover:text-primary transition">
                        {ep.name}
                      </h3>
                      <span className="shrink-0 text-xs font-medium text-white/50">
                        {ep.runtime || "50 min"}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-white/70 line-clamp-2 leading-relaxed">
                      {ep.overview ||
                        "Reacher discovers crucial evidence that forces him into an explosive confrontation."}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-16 text-center text-white/50 rounded-2xl border border-white/10 bg-white/[0.02]">
              No episodes found matching your filter query.
            </div>
          )}
        </div>
      </section>

      {/* ── TOP CAST & CREW SLIDER ── */}
      {cast && cast.length > 0 && (
        <section className="mx-auto max-w-[1600px] px-4 sm:px-8 lg:px-12 py-8 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
            Top Cast & Crew
          </h2>
          <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-none">
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

      {/* ── MORE LIKE THIS (RECOMMENDED SERIES) ── */}
      {similarSeries && similarSeries.length > 0 && (
        <div className="space-y-16 px-4 pb-20 pt-8 sm:px-6 lg:px-12">
          <section className="mx-auto max-w-[1600px]">
            <SectionSlider
              title="More Like This"
              subtitle="Recommended series and dramas tailored for fans of this title."
              movies={similarSeries}
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

      {/* Series / Episode Stream Video Modal */}
      {isVideoOpen && activeEpisode && selectedSeason && (
        <SeriesModal
          isOpen={isVideoOpen}
          onClose={() => setIsVideoOpen(false)}
          id={series.id}
          season={activeEpisode.season_number || selectedSeason}
          episode={activeEpisode.episode_number}
          title={
            activeEpisode
              ? `${titleMain} - S${activeEpisode.season_number || selectedSeason}E${activeEpisode.episode_number}: ${activeEpisode.name}`
              : titleMain
          }
        />
      )}

      {/* Share Toast Feedback */}
      {shareToast && (
        <div className="fixed bottom-6 right-6 z-100 flex items-center gap-2 rounded-2xl border border-white/20 bg-black/90 px-4 py-3 text-xs font-semibold text-white shadow-xl backdrop-blur-xl">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>Series link copied to clipboard!</span>
        </div>
      )}
    </div>
  );
};

export default SeriesDetailClientComponent;
