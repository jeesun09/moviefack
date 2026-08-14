"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper/modules";
import { Play, Star, Sparkles, Info, ChevronLeft, ChevronRight } from "lucide-react";
import { getImageUrl } from "@/util/helper";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function CinemaHeroCarousel({
  title = "Featured Blockbuster Premieres",
  subtitle = "Handpicked cinematic spectacles streaming in 4K Ultra HD.",
  movies = [],
}) {
  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);

  if (!movies || movies.length === 0) return null;

  const topMovies = movies.slice(0, 6);

  return (
    <section className="relative my-12 overflow-hidden">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-widest">
            <Sparkles className="h-3.5 w-3.5 fill-primary" />
            <span>FEATURED SPOTLIGHTS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-white/60">{subtitle}</p>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center gap-2">
          <button
            ref={setPrevEl}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white/80 transition hover:bg-primary hover:border-primary hover:text-white cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            ref={setNextEl}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white/80 transition hover:bg-primary hover:border-primary hover:text-white cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Single Slide Swiper with Fade Effect */}
      <Swiper
        modules={[Autoplay, EffectFade, Pagination, Navigation]}
        effect="fade"
        speed={1000}
        autoplay={{
          delay: 5500,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        navigation={{ prevEl, nextEl }}
        onBeforeInit={(swiper) => {
          if (swiper.params.navigation) {
            swiper.params.navigation.prevEl = prevEl;
            swiper.params.navigation.nextEl = nextEl;
          }
        }}
        pagination={{
          clickable: true,
        }}
        slidesPerView={1}
        loop={true}
        className="w-full rounded-3xl border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden [&_.swiper-pagination]:!bottom-5"
      >
        {topMovies.map((movie) => {
          const backdrop =
            getImageUrl(movie.backdrop_path || movie.poster_path, "original") ||
            "https://image.tmdb.org/t/p/original/r013C8Me2bZ0pUi0OWJRh0h7MzT.jpg";
          const poster =
            getImageUrl(movie.poster_path || movie.backdrop_path, "w500") ||
            "https://image.tmdb.org/t/p/w500/yihdXomYb5kTeSivtFndMy5iDmf.jpg";
          const titleMain =
            movie.titleMain || movie.title || movie.name || "Blockbuster";
          const rating =
            typeof movie.vote_average === "number"
              ? movie.vote_average.toFixed(1)
              : movie.rating || "8.9";
          const year = movie.release_date
            ? String(movie.release_date).split("-")[0]
            : movie.year || "2024";

          return (
            <SwiperSlide key={`hero-slide-${movie.id}`}>
              <div className="relative min-h-[440px] sm:min-h-[500px] lg:min-h-[540px] w-full flex items-center bg-black">
                {/* Backdrop Image */}
                <Image
                  loading="lazy"
                  src={backdrop}
                  alt={titleMain}
                  fill
                  className="object-cover object-center"
                />

                {/* Deep Cinema Ambient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />

                {/* Content Grid */}
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center gap-8 p-6 sm:p-10 lg:p-14 w-full">
                  {/* Left Column Details */}
                  <div className="space-y-4 lg:col-span-8 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-primary/20 border border-primary/40 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-primary shadow">
                        POPULAR CHOICE
                      </span>
                      <span className="text-xs font-semibold text-white/60">
                        Trending Worldwide
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

                    <p className="text-xs sm:text-sm text-white/70 line-clamp-3 leading-relaxed">
                      {movie.overview ||
                        "Experience this acclaimed blockbuster film with immersive sound and full Ultra HD 4K visuals."}
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
                        <span>View Details</span>
                      </Link>
                    </div>
                  </div>

                  {/* Right Column Floating 3D Poster */}
                  <div className="hidden lg:flex lg:col-span-4 justify-end">
                    <Link
                      href={`/movie/${movie.id}`}
                      className="group relative aspect-[2/3] w-64 overflow-hidden rounded-3xl border border-white/20 bg-black/60 shadow-[0_20px_60px_rgba(0,0,0,0.85)] transition-all duration-500 hover:scale-105 hover:border-primary hover:shadow-[0_25px_70px_rgba(255,59,48,0.4)]"
                    >
                      <Image
                        loading="lazy"
                        src={poster}
                        alt={titleMain}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 bg-black/40">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-[0_0_30px_rgba(255,59,48,0.9)]">
                          <Play className="h-6 w-6 fill-white ml-0.5" />
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
