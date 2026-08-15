"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight, Sparkles, Ticket, Play } from "lucide-react";
import { getImageUrl } from "@/util/helper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";

export default function EarlyAccessBannerSlider({
  title = "CINEMA-LIKE EXPERIENCE AT HOME.",
  subtitle = "Rent and watch your favorite new movies & blockbuster premieres.",
  badge = "EARLY ACCESS",
  movies = [],
}) {
  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);

  if (!movies || movies.length === 0) return null;

  return (
    <section className="relative my-10 overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-r from-[#170505] via-[#100b14] to-[#080808] p-6 sm:p-8 lg:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.9)]">
      {/* Ambient Velvet Glow Background */}
      <div className="pointer-events-none absolute -left-20 top-0 h-96 w-96 rounded-full bg-primary/20 blur-[100px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-80 w-80 rounded-full bg-amber-500/10 blur-[90px]" />

      <div className="relative z-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
        {/* Left Side Content Info */}
        <div className="space-y-5 lg:col-span-4">
          <div className="flex items-center gap-2">
            {/* Gold Metallic Badge */}
            <div className="flex items-center gap-1.5 rounded-full border border-amber-400/50 bg-gradient-to-r from-amber-500/20 to-yellow-600/30 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              <Sparkles className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span>{badge}</span>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white leading-tight">
            {title}
          </h2>

          <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-sm">
            {subtitle}
          </p>

          <div className="flex items-center gap-3 pt-2">
            <Link
              href="/movies"
              className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md transition duration-300 hover:border-primary hover:bg-primary hover:shadow-[0_0_25px_rgba(255,59,48,0.5)] active:scale-95"
            >
              <span>Explore More</span>
            </Link>

            {/* Slider Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                ref={setPrevEl}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white/80 transition hover:bg-primary hover:border-primary hover:text-white cursor-pointer"
                aria-label="Previous"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                ref={setNextEl}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white/80 transition hover:bg-primary hover:border-primary hover:text-white cursor-pointer"
                aria-label="Next"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side Cards Swiper */}
        <div className="min-w-0 lg:col-span-8">
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
              delay: 4500,
              pauseOnMouseEnter: true,
              disableOnInteraction: false,
            }}
            grabCursor
            slidesPerView="auto"
            spaceBetween={16}
            className="early-access-slider w-full"
          >
            {movies.map((movie) => {
              const poster =
                getImageUrl(movie.poster_path || movie.backdrop_path, "w500") ||
                "https://image.tmdb.org/t/p/w500/yihdXomYb5kTeSivtFndMy5iDmf.jpg";
              const titleMain =
                movie.titleMain || movie.title || movie.name || "Movie";

              return (
                <SwiperSlide
                  key={`early-${movie.id}`}
                  className="!w-[145px] min-[400px]:!w-[160px] sm:!w-[190px] md:!w-[210px] select-none"
                >
                  <Link
                    href={`/movie/${movie.id}`}
                    className="group relative block aspect-[2/3] w-full overflow-hidden rounded-2xl border border-white/15 bg-black/60 shadow-xl transition-all duration-300 hover:scale-105 hover:border-primary/80 hover:shadow-[0_10px_30px_rgba(255,59,48,0.35)]"
                  >
                    <Image
                     loading="lazy"
                      src={poster}
                      alt={titleMain}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 opacity-60 transition group-hover:opacity-40" />

                    {/* Top Right "NEW MOVIE" Badge */}
                    <span className="absolute top-2.5 right-2.5 rounded-md bg-black/85 border border-white/20 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white shadow backdrop-blur-md">
                      NEW MOVIE
                    </span>

                    {/* Bottom Left Gold Ticket Icon */}
                    <div className="absolute bottom-2.5 left-2.5 flex h-6 w-6 items-center justify-center rounded-lg bg-amber-500/90 text-black shadow">
                      <Ticket className="h-3.5 w-3.5 fill-black" />
                    </div>

                    {/* Hover Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 bg-black/40">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white shadow-[0_0_20px_rgba(255,59,48,0.8)]">
                        <Play className="h-5 w-5 fill-white ml-0.5" />
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
