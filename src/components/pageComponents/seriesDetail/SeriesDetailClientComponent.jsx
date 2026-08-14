"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { getImageUrl } from "@/util/helper";
import { useAuth } from "@/context/AuthContext";
import TrailerModal from "@/components/common/TrailerModal";
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
  ArrowLeft,
  LayoutGrid,
  X,
  Film,
  Play,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const TV_SERVERS = [
  {
    id: "vidking",
    name: "Server 1 (VidKing)",
    tag: "Ultra Fast",
    getUrl: (id, s, e) =>
      `https://www.vidking.net/embed/tv/${id}/${s}/${e}?color=e50914&autoPlay=true`,
  },
  {
    id: "autoembed",
    name: "Server 2 (AutoEmbed)",
    tag: "HD 1080p",
    getUrl: (id, s, e) => `https://player.autoembed.cc/embed/tv/${id}/${s}/${e}`,
  },
  {
    id: "superembed",
    name: "Server 3 (SuperEmbed)",
    tag: "Multi-Server",
    getUrl: (id, s, e) =>
      `https://multiembed.mov/?video_id=${id}&tmdb=1&s=${s}&e=${e}`,
  },
  {
    id: "vidsrc",
    name: "Server 4 (VidSrc)",
    tag: "Backup",
    getUrl: (id, s, e) => `https://vidsrc.xyz/embed/tv/${id}/${s}-${e}`,
  },
];

const SeriesDetailClientComponent = ({
  series,
  initialEpisodes = [],
  trailerKey,
  cast = [],
  similarSeries = [],
}) => {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const seasonParam = searchParams.get("season");
  const episodeParam = searchParams.get("episode");
  const isPlaying = Boolean(seasonParam && episodeParam);

  const [selectedSeason, setSelectedSeason] = useState(
    seasonParam ? Number(seasonParam) : 1,
  );
  const [episodes, setEpisodes] = useState(initialEpisodes);
  const [isLoadingEpisodes, setIsLoadingEpisodes] = useState(false);

  const [isSeasonOpen, setIsSeasonOpen] = useState(false);
  const seasonDropdownRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [isSortDesc, setIsSortDesc] = useState(false);

  // In-Player States
  const [selectedServer, setSelectedServer] = useState(TV_SERVERS[0]);
  const [isServerOpen, setIsServerOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [inDrawerSearch, setInDrawerSearch] = useState("");
  const [inDrawerSeasonOpen, setInDrawerSeasonOpen] = useState(false);
  const [inDrawerSortDesc, setInDrawerSortDesc] = useState(false);
  const [isLoadingIframe, setIsLoadingIframe] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(15);
  const [iframeKey, setIframeKey] = useState(Date.now());
  const [controlsVisible, setControlsVisible] = useState(true);

  const [shareToast, setShareToast] = useState(false);
  const { addToWishlist, isMovieInWishlist } = useAuth();
  const isSaved = isMovieInWishlist(series.id);

  // Sync selectedSeason with season query param
  useEffect(() => {
    if (seasonParam) {
      setSelectedSeason(Number(seasonParam));
    }
  }, [seasonParam]);

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

  // Fetch season episodes when selectedSeason changes
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

  // Lock body scroll and handle stream preparation buffering when isPlaying is active
  useEffect(() => {
    if (isPlaying) {
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
  }, [isPlaying, seasonParam, episodeParam, selectedServer, iframeKey]);

  // Auto-hide top controls after inactivity in full-screen player
  useEffect(() => {
    if (!isPlaying) return;

    let timeout;
    const resetTimer = () => {
      setControlsVisible(true);
      clearTimeout(timeout);
      if (!isServerOpen && !inDrawerSeasonOpen) {
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
  }, [isPlaying, isServerOpen, inDrawerSeasonOpen]);

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
    const s = ep.season_number || selectedSeason;
    const e = ep.episode_number || 1;
    const params = new URLSearchParams(searchParams.toString());
    params.set("season", String(s));
    params.set("episode", String(e));
    router.replace(pathname + "?" + params.toString());
    setIframeKey(Date.now());
  };

  const handlePlaySeries = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("season", String(selectedSeason));
    params.set("episode", "1");
    router.replace(pathname + "?" + params.toString());
    setIframeKey(Date.now());
  };

  const handleSelectSeason = (num) => {
    setSelectedSeason(num);
    setIsSeasonOpen(false);
    setInDrawerSeasonOpen(false);

    if (isPlaying) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("season", String(num));
      params.set("episode", "1");
      router.replace(pathname + "?" + params.toString());
      setIframeKey(Date.now());
    }
  };

  const handleClosePlayer = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("season");
    params.delete("episode");
    const q = params.toString();
    router.replace(pathname + (q ? "?" + q : ""));
  };

  // Filter and Sort Episodes for main list
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

  // Filter and Sort Episodes for drawer list
  const drawerEpisodes = episodes
    .filter((ep) => {
      if (!inDrawerSearch.trim()) return true;
      const q = inDrawerSearch.toLowerCase();
      return (
        (ep.name && ep.name.toLowerCase().includes(q)) ||
        (ep.overview && ep.overview.toLowerCase().includes(q)) ||
        String(ep.episode_number).includes(q)
      );
    })
    .sort((a, b) => {
      if (inDrawerSortDesc) return b.episode_number - a.episode_number;
      return a.episode_number - b.episode_number;
    });

  const currentPlayingSeason = seasonParam ? Number(seasonParam) : selectedSeason;
  const currentPlayingEpisode = episodeParam ? Number(episodeParam) : 1;

  return (
    <div className="relative min-h-screen w-full bg-background text-text overflow-hidden">
      {/* ── 100% FULL-SCREEN SERIES CINEMA PLAYER WITH EPISODES DRAWER ── */}
      {isPlaying && (
        <div
          className={`fixed inset-0 z-[99999] h-screen w-screen min-h-[100dvh] max-h-[100dvh] bg-black overflow-hidden flex flex-col justify-between select-none ${
            !controlsVisible && !isDrawerOpen ? "cursor-none" : ""
          }`}
        >
          {/* Top Bar Floating Controls */}
          <div
            className={`absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-4 sm:p-6 transition-opacity duration-300 ${
              controlsVisible || isDrawerOpen
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
          >
            {/* Top-Left: Back Arrow Button */}
            <button
              onClick={handleClosePlayer}
              className="flex h-10 w-11 items-center justify-center rounded-lg border border-white/20 bg-black/75 text-white/90 backdrop-blur-md transition hover:bg-white/10 hover:border-white/40 hover:text-white cursor-pointer shadow-lg"
              title="Back to Overview"
              aria-label="Back to series details"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            {/* Top-Center: CHANGE SERVER Button & Dropdown */}
            <div className="absolute left-1/2 -translate-x-1/2 top-4 sm:top-6">
              <div className="relative">
                <button
                  onClick={() => setIsServerOpen((prev) => !prev)}
                  className="flex items-center gap-2 rounded-lg border border-white/20 bg-black/80 px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-md transition hover:bg-white/10 hover:border-white/40 cursor-pointer shadow-lg"
                >
                  <span>CHANGE SERVER</span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 text-white/70 transition-transform duration-200 ${
                      isServerOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Server Dropdown Menu */}
                {isServerOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-56 overflow-hidden rounded-2xl border border-white/20 bg-[#121212]/95 p-1.5 shadow-[0_15px_50px_rgba(0,0,0,0.95)] backdrop-blur-2xl z-50 text-white">
                    <div className="px-3 py-1.5 border-b border-white/10 text-[10px] font-bold uppercase tracking-wider text-white/50">
                      Select Server
                    </div>
                    <div className="space-y-1 mt-1">
                      {TV_SERVERS.map((server) => {
                        const isSelected = server.id === selectedServer.id;
                        return (
                          <button
                            key={server.id}
                            onClick={() => {
                              setSelectedServer(server);
                              setIsServerOpen(false);
                              setIframeKey(Date.now());
                            }}
                            className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition cursor-pointer ${
                              isSelected
                                ? "bg-primary text-white shadow-[0_0_12px_rgba(255,59,48,0.5)]"
                                : "text-white/80 hover:bg-white/10 hover:text-white"
                            }`}
                          >
                            <div className="text-left">
                              <p className="leading-tight">{server.name}</p>
                              <span className="text-[10px] opacity-60">
                                {server.tag}
                              </span>
                            </div>
                            {isSelected && (
                              <Check className="h-3.5 w-3.5 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Spacer for balance */}
            <div className="w-11" />
          </div>

          {/* Left Floating Button to Re-Open Drawer if Hidden (Matching Reference) */}
          {!isDrawerOpen && (
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="absolute left-5 top-1/2 -translate-y-1/2 z-40 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-black/80 text-white shadow-2xl backdrop-blur-md transition hover:bg-white/10 hover:border-primary cursor-pointer"
              title="Show Episodes Drawer"
            >
              <LayoutGrid className="h-5 w-5 text-white" />
            </button>
          )}

          {/* Right Side Episodes Drawer Panel (Matching Reference Design) */}
          <AnimatePresence>
            {isDrawerOpen && (
              <motion.div
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 80 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="absolute right-3 sm:right-5 top-3 sm:top-5 bottom-3 sm:bottom-5 z-40 w-[310px] sm:w-[360px] md:w-[380px] rounded-3xl border border-white/15 bg-[#0f0f0f]/95 shadow-[0_25px_80px_rgba(0,0,0,0.95)] backdrop-blur-2xl flex flex-col p-4 overflow-hidden"
              >
                {/* Drawer Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-[11px] font-bold text-white/80">
                    Episodes
                  </span>
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="flex items-center gap-1 rounded-lg border border-white/15 bg-white/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white/70 hover:bg-white/15 hover:text-white transition cursor-pointer"
                  >
                    <span>HIDE</span>
                  </button>
                </div>

                <div className="pt-3 pb-2">
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">
                    CONTINUE THE STORY
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    Episodes
                  </h2>
                </div>

                {/* Season Selector & Search Filter Bar inside Drawer */}
                <div className="flex items-center gap-2 pt-1 pb-2">
                  {/* Season Dropdown */}
                  <div className="relative shrink-0">
                    <button
                      type="button"
                      onClick={() => setInDrawerSeasonOpen((prev) => !prev)}
                      className="flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-bold text-white transition hover:border-white/30 hover:bg-white/10 cursor-pointer"
                    >
                      <span>Season {selectedSeason}</span>
                      <ChevronDown
                        className={`h-3 w-3 text-white/70 transition-transform duration-200 ${
                          inDrawerSeasonOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {inDrawerSeasonOpen && (
                      <div className="absolute left-0 top-full mt-1.5 z-50 w-36 max-h-48 overflow-y-auto rounded-xl border border-white/15 bg-[#141414]/98 p-1 shadow-2xl backdrop-blur-xl">
                        {seasonsList.map((num) => {
                          const isSelected = num === selectedSeason;
                          return (
                            <button
                              key={`drawer-season-${num}`}
                              onClick={() => handleSelectSeason(num)}
                              className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-bold transition cursor-pointer ${
                                isSelected
                                  ? "bg-primary text-white"
                                  : "text-white/80 hover:bg-white/10"
                              }`}
                            >
                              <span>Season {num}</span>
                              {isSelected && <Check className="h-3 w-3" />}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Search Input */}
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/40" />
                    <input
                      type="text"
                      placeholder="Search episode..."
                      value={inDrawerSearch}
                      onChange={(e) => setInDrawerSearch(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-white/5 py-1.5 pl-8 pr-3 text-xs text-white placeholder-white/40 focus:border-primary focus:outline-none"
                    />
                  </div>

                  {/* Sort Button */}
                  <button
                    onClick={() => setInDrawerSortDesc((prev) => !prev)}
                    className={`flex h-8 w-8 items-center justify-center rounded-xl border transition shrink-0 cursor-pointer ${
                      inDrawerSortDesc
                        ? "border-primary bg-primary/20 text-primary"
                        : "border-white/15 bg-white/5 text-white/70 hover:border-white/30"
                    }`}
                    title={inDrawerSortDesc ? "Ascending" : "Descending"}
                  >
                    <ArrowUpDown className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Scrollable Episodes List inside Drawer */}
                <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 mt-2 scrollbar-thin">
                  {isLoadingEpisodes ? (
                    <div className="flex flex-col items-center justify-center h-48 gap-2 text-white/50 text-xs">
                      <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      <span>Loading episodes...</span>
                    </div>
                  ) : drawerEpisodes.length > 0 ? (
                    drawerEpisodes.map((ep) => {
                      const isCurrent =
                        ep.episode_number === currentPlayingEpisode &&
                        (ep.season_number || selectedSeason) === currentPlayingSeason;
                      const thumb = ep.still_path
                        ? `https://image.tmdb.org/t/p/w300${ep.still_path}`
                        : posterSrc;

                      return (
                        <div
                          key={`drawer-ep-${ep.id || ep.episode_number}`}
                          onClick={() => handlePlayEpisode(ep)}
                          className={`group relative flex items-center gap-3 rounded-2xl border p-2.5 transition duration-200 cursor-pointer ${
                            isCurrent
                              ? "border-primary bg-primary/15 shadow-[0_0_15px_rgba(255,59,48,0.35)]"
                              : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.08]"
                          }`}
                        >
                          {/* Thumbnail Container */}
                          <div className="relative aspect-video w-24 sm:w-28 shrink-0 overflow-hidden rounded-xl bg-black">
                            <Image
                              src={thumb}
                              alt={ep.name}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition" />

                            {/* Episode number badge */}
                            <span className="absolute bottom-1 left-1 rounded-md bg-black/80 px-1.5 py-0.5 text-[9px] font-bold text-white border border-white/10">
                              {ep.episode_number}
                            </span>

                            {/* Play Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/40">
                              <Play className="h-4 w-4 text-white fill-white" />
                            </div>
                          </div>

                          {/* Episode Details */}
                          <div className="min-w-0 flex-1 space-y-1">
                            <div className="flex items-center justify-between gap-1">
                              <h4
                                className={`text-xs font-bold truncate leading-tight ${
                                  isCurrent ? "text-primary" : "text-white"
                                }`}
                              >
                                {ep.episode_number}. {ep.name}
                              </h4>
                            </div>
                            <p className="text-[10px] text-white/50 line-clamp-1">
                              {ep.runtime || "50 min"} • Season {selectedSeason}
                            </p>
                            <p className="text-[11px] text-white/60 line-clamp-2 leading-relaxed">
                              {ep.overview || "Stream this episode in Ultra HD 4K."}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="py-12 text-center text-xs text-white/40">
                      No episodes found.
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

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
                  Buffering Season {currentPlayingSeason} • Episode {currentPlayingEpisode}
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
            {series?.id ? (
              <iframe
                key={iframeKey}
                src={selectedServer.getUrl(
                  series.id,
                  currentPlayingSeason,
                  currentPlayingEpisode,
                )}
                title={`${titleMain} - S${currentPlayingSeason}E${currentPlayingEpisode}`}
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
                  onClick={handleClosePlayer}
                  className="rounded-full bg-primary px-5 py-2 text-xs font-bold uppercase tracking-wider text-white cursor-pointer"
                >
                  Back to Details
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── STANDARD TV SERIES HERO DETAILS BANNER ── */}
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
                className="group flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-[0_0_30px_rgba(255,59,48,0.45)] transition hover:bg-primary-hover hover:shadow-[0_0_40px_rgba(255,59,48,0.6)] cursor-pointer"
              >
                <PlayCircle className="h-5 w-5" />
                <span>Play Season {selectedSeason}</span>
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
                onClick={() => addToWishlist(series)}
                className={`flex items-center gap-2 rounded-full border px-5 py-3.5 text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                  isSaved
                    ? "border-primary bg-primary text-white shadow-[0_0_20px_rgba(255,59,48,0.4)]"
                    : "border-white/20 bg-white/10 text-white backdrop-blur-md hover:border-primary hover:bg-primary"
                }`}
              >
                <Bookmark className={`h-4 w-4 ${isSaved ? "fill-white" : ""}`} />
                <span>{isSaved ? "Saved" : "In My List"}</span>
              </button>

              {/* Share Button */}
              <button
                onClick={handleShare}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:border-white/40 hover:bg-white/20 cursor-pointer"
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

      {/* ── SERIES PLAYLIST / EPISODES SECTION ── */}
      <section className="mx-auto max-w-[1600px] px-4 sm:px-8 lg:px-12 py-10 space-y-6">
        {/* Section Header Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
              Episodes List
            </h2>
            <p className="text-xs sm:text-sm text-white/60">
              Season {selectedSeason} • {episodes.length} Episodes Available
            </p>
          </div>

          {/* Filters & Season Picker */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Season Selector Dropdown */}
            <div className="relative" ref={seasonDropdownRef}>
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

              <AnimatePresence>
                {isSeasonOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute left-0 top-full z-50 mt-2 w-full min-w-48 max-h-50 overflow-auto rounded-2xl border border-white/15 bg-[#141414]/95 p-1.5 shadow-[0_20px_60px_rgba(0,0,0,0.85)] backdrop-blur-xl"
                  >
                    <div className="space-y-1">
                      {seasonsList.map((num) => {
                        const isSelected = num === selectedSeason;
                        return (
                          <button
                            key={`season-item-${num}`}
                            type="button"
                            onClick={() => handleSelectSeason(num)}
                            className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-bold transition duration-150 cursor-pointer ${
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

            {/* Episode Search Bar */}
            <div className="relative min-w-[200px] flex-1 sm:flex-initial">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
              <input
                type="text"
                placeholder="Search episodes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-white/5 py-2.5 pl-10 pr-4 text-xs text-white placeholder-white/50 backdrop-blur-md transition focus:border-primary focus:bg-white/10 focus:outline-none"
              />
            </div>

            {/* Sort Toggle Button */}
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-xs font-medium text-white/60">
                Sort
              </span>
              <button
                onClick={() => setIsSortDesc((prev) => !prev)}
                className={`flex h-10 w-10 items-center justify-center rounded-xl border transition cursor-pointer ${
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

        {/* Episode Cards Grid / List */}
        <div className="space-y-3.5">
          {isLoadingEpisodes ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-white/60">
              <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span className="text-sm font-semibold">Loading Season {selectedSeason} episodes...</span>
            </div>
          ) : filteredEpisodes.length > 0 ? (
            filteredEpisodes.map((ep) => {
              const epThumb = ep.still_path
                ? `https://image.tmdb.org/t/p/w500${ep.still_path}`
                : posterSrc;

              return (
                <div
                  key={ep.id || ep.episode_number}
                  onClick={() => handlePlayEpisode(ep)}
                  className="group relative flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl border border-white/10 bg-surface/50 p-3.5 sm:p-4 backdrop-blur-md transition duration-300 hover:border-white/25 hover:bg-surface/80 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] cursor-pointer"
                >
                  {/* Episode Thumbnail */}
                  <div className="relative aspect-video w-full sm:w-56 shrink-0 overflow-hidden rounded-xl bg-surface">
                    <Image
                      src={epThumb}
                      alt={ep.name}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent sm:hidden" />

                    {/* Episode Number Badge */}
                    <span className="absolute bottom-2 left-2 rounded-lg bg-black/80 border border-white/10 px-2 py-0.5 text-xs font-bold text-white shadow">
                      EP {ep.episode_number}
                    </span>

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 bg-black/40">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-[0_0_20px_rgba(255,59,48,0.7)] transition-transform duration-300 group-hover:scale-110">
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
