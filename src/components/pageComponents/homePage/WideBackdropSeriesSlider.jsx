"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight, Play, Star, Tv } from "lucide-react";
import { getImageUrl } from "@/util/helper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";

export default function WideBackdropSeriesSlider({
  title = "Trending TV & Web Series",
  subtitle = "Binge-worthy series, original dramas, and addictive multi-episode adventures.",
  seriesList = [],
}) {
  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);

  if (!seriesList || seriesList.length === 0) return null;

  return (
    <section className="relative my-10 overflow-hidden">
      {/* Section Header */}
      <div className="flex flex-col mb-7 gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-full bg-primary/20 border border-primary/40 px-3 py-0.5 text-[10px] font-black uppercase tracking-wider text-primary">
              <Tv className="h-3.5 w-3.5 text-primary" />
              <span>SERIES & DRAMAS</span>
            </span>
          </div>
          <h2 className="lg:text-[32px] md:text-[26px] text-[22px] font-bold text-white tracking-tight">
            {title}
          </h2>
          <p className="max-w-2xl text-sm text-white/60">{subtitle}</p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-2">
          <button
            ref={setPrevEl}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white/80 transition hover:bg-primary hover:border-primary hover:text-white cursor-pointer"
            aria-label="Previous"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            ref={setNextEl}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white/80 transition hover:bg-primary hover:border-primary hover:text-white cursor-pointer"
            aria-label="Next"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Swiper with 16:9 Landscape Cards */}
      <Swiper
        modules={[Navigation, FreeMode, Autoplay]}
        navigation={{ prevEl, nextEl }}
        onBeforeInit={(swiper) => {
          if (swiper.params.navigation) {
            swiper.params.navigation.prevEl = prevEl;
            swiper.params.navigation.nextEl = nextEl;
          }
        }}
        onSwiper={(swiper) => {
          setTimeout(() => {
            if (swiper.navigation) {
              swiper.navigation.init();
              swiper.navigation.update();
            }
          }, 0);
        }}
        freeMode={{ enabled: true, momentum: true }}
        autoplay={{
          delay: 5200,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        grabCursor
        slidesPerView="auto"
        spaceBetween={18}
        className="series-slider w-full"
      >
        {seriesList.map((item) => {
          const backdrop =
            getImageUrl(item.backdrop_path || item.poster_path, "w500") ||
            "https://image.tmdb.org/t/p/w500/r013C8Me2bZ0pUi0OWJRh0h7MzT.jpg";
          const title = item.titleMain || item.name || item.title || "Series";
          const rating =
            typeof item.vote_average === "number"
              ? item.vote_average.toFixed(1)
              : item.rating || "8.4";

          return (
            <SwiperSlide
              key={`wide-${item.id}`}
              className="!w-[280px] sm:!w-[320px] md:!w-[350px] lg:!w-[370px] select-none"
            >
              <Link
                href={`/series/${item.id}`}
                className="group relative block w-full space-y-3"
              >
                {/* 16:9 Landscape Card */}
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/15 bg-surface shadow-lg transition-all duration-300 group-hover:scale-[1.03] group-hover:border-primary/80 group-hover:shadow-[0_10px_35px_rgba(255,59,48,0.35)]">
                  <Image
                   loading="lazy"
                    src={backdrop}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                  {/* Rating Tag */}
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-full bg-black/80 border border-amber-500/40 px-2 py-0.5 text-[10px] font-bold text-amber-400 backdrop-blur-md shadow">
                    <Star className="h-3 w-3 fill-amber-400" />
                    <span>{rating}</span>
                  </div>

                  {/* Season Badge */}
                  <div className="absolute bottom-2.5 left-2.5 rounded-md bg-black/80 border border-white/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white/90 backdrop-blur-md">
                    {item.number_of_seasons || 1}{" "}
                    {item.number_of_seasons === 1 ? "Season" : "Seasons"}
                  </div>

                  {/* Play Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 bg-black/40">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-[0_0_20px_rgba(255,59,48,0.9)]">
                      <Play className="h-5 w-5 fill-white ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Series Title and Info */}
                <div className="space-y-1 px-1">
                  <h3 className="text-sm sm:text-base font-bold text-white truncate group-hover:text-primary transition">
                    {title}
                  </h3>
                  <p className="text-xs text-white/50 line-clamp-1">
                    {item.overview || "Stream all episodes in Ultra HD 4K."}
                  </p>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
