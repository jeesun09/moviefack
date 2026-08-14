"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MovieCard from "@/components/shared/MovieCard";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";

const SectionSlider = ({ title, subtitle, movies }) => {
  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);

  if (!movies?.length) return null;


  return (
    <section className="lg:mb-10 mb-6">
      <div className="flex flex-col mb-8 gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <h2 className="lg:text-[32px] md:text-[26px] text-[22px] font-bold text-primary">{title}</h2>
          <p className="max-w-2xl text-sm text-white/60">{subtitle}</p>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="text-xs uppercase tracking-[0.28em] text-white/40">
            drag to explore
          </span>
          <div className="flex items-center gap-2" >
            <button
              ref={setPrevEl}
              className="section-nav-button hover:bg-primary hover:text-white"
              aria-label="Previous section"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              ref={setNextEl}
              className="section-nav-button hover:bg-primary hover:text-white"
              aria-label="Next section"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

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
          delay: 4800,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        grabCursor
        slidesPerView="auto"
        spaceBetween={18}
        className="movie-slider"
        breakpoints={{
          640: { spaceBetween: 20 },
          768: { spaceBetween: 24 },
          1024: { spaceBetween: 26 },
        }}
      >
        {movies.map((movie) => (
          <SwiperSlide
            key={movie.id}
            className="!w-[212px] sm:!w-[232px] md:!w-[252px] lg:!w-[272px] select-none"
          >
            <MovieCard movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default SectionSlider;
