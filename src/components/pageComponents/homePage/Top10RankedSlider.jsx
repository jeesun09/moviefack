"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight, Star, Flame, Play } from "lucide-react";
import { getImageUrl } from "@/util/helper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";

export default function Top10RankedSlider({
  title = "Top 10 Movies Today",
  subtitle = "The most watched and trending blockbusters across the globe right now.",
  movies = [],
}) {
  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);

  if (!movies || movies.length === 0) return null;

  const top10List = movies.slice(0, 10);

  return (
    <section className="relative my-10 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col mb-8 gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-full bg-primary/20 border border-primary/40 px-3 py-0.5 text-[10px] font-black uppercase tracking-wider text-primary">
              <Flame className="h-3.5 w-3.5 fill-primary text-primary" />
              <span>GLOBAL RANKINGS</span>
            </span>
          </div>
          <h2 className="lg:text-[32px] md:text-[26px] text-[22px] font-bold text-white tracking-tight">
            {title}
          </h2>
          <p className="max-w-2xl text-sm text-white/60">{subtitle}</p>
        </div>

        {/* Navigation buttons */}
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

      {/* Swiper Slider with Big Rank Numbers */}
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
          delay: 5000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        grabCursor
        slidesPerView="auto"
        spaceBetween={20}
        className="top10-slider w-full !overflow-visible"
      >
        {top10List.map((movie, index) => {
          const rank = index + 1;
          const poster =
            getImageUrl(movie.poster_path || movie.backdrop_path, "w500") ||
            "https://image.tmdb.org/t/p/w500/yihdXomYb5kTeSivtFndMy5iDmf.jpg";
          const titleMain =
            movie.titleMain || movie.title || movie.name || "Movie";
          const rating =
            typeof movie.vote_average === "number"
              ? movie.vote_average.toFixed(1)
              : movie.rating || "8.5";

          return (
            <SwiperSlide
              key={`top10-${movie.id}`}
              className="!w-[210px] min-[400px]:!w-[240px] sm:!w-[270px] md:!w-[290px] select-none"
            >
              <Link
                href={`/movie/${movie.id}`}
                className="group relative flex items-end h-[300px] sm:h-[380px] w-full"
              >
                {/* Giant Stylized Rank Number */}
                <div className="absolute left-0 bottom-0 z-0 select-none">
                  <span
                    className="text-[115px] min-[400px]:text-[140px] sm:text-[170px] font-black leading-none tracking-tighter text-transparent"
                    style={{
                      WebkitTextStroke: "3px rgba(255, 255, 255, 0.28)",
                      textShadow: "0 0 25px rgba(255, 59, 48, 0.4)",
                    }}
                  >
                    {rank}
                  </span>
                </div>

                {/* Poster Card overlapping number */}
                <div className="relative z-10 ml-auto aspect-[2/3] w-[145px] min-[400px]:w-[170px] sm:w-[195px] md:w-[210px] overflow-hidden rounded-2xl border border-white/15 bg-surface shadow-[0_15px_40px_rgba(0,0,0,0.8)] transition-all duration-300 group-hover:scale-105 group-hover:border-primary group-hover:shadow-[0_20px_50px_rgba(255,59,48,0.35)]">
                  <Image
                   loading="lazy"
                    src={poster}
                    alt={titleMain}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition" />

                  {/* Rating Badge */}
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-full bg-black/80 border border-amber-500/40 px-2 py-0.5 text-[10px] font-bold text-amber-400 backdrop-blur-md shadow">
                    <Star className="h-3 w-3 fill-amber-400" />
                    <span>{rating}</span>
                  </div>

                  {/* Play Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 bg-black/40">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-[0_0_25px_rgba(255,59,48,0.9)]">
                      <Play className="h-5 w-5 fill-white ml-0.5" />
                    </div>
                  </div>

                  {/* Bottom Title */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5">
                    <h3 className="text-xs sm:text-sm font-bold text-white truncate group-hover:text-primary transition">
                      {titleMain}
                    </h3>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
