"use client";

import { useEffect, useRef, useState } from "react";

import {
  ChevronLeft,
  ChevronRight,
  PlayCircleIcon,
  BookmarkIcon,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";


import { Swiper, SwiperSlide } from "swiper/react";

import {
  Autoplay,
  EffectFade,
  FreeMode,
  Navigation,
  Thumbs,
} from "swiper/modules";

import Button from "@/components/shared/Button";

import { getFeaturedMovies } from "@/util/api";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import BannerSkeleton from "./BannerSkeleton";
import { useRouter } from "next/navigation";

const Banner = () => {
  const { addToWishlist } = useAuth();
  const router = useRouter();


  // ==========================================
  // SWIPER REFS
  // ==========================================

  const mainSwiperRef = useRef(null);
  const thumbsSwiperRef = useRef(null);

  // ==========================================
  // STATES
  // ==========================================

  const [thumbsSwiper, setThumbsSwiper] =
    useState(null);

  const [activeIndex, setActiveIndex] =
    useState(0);

  const [movies, setMovies] = useState([]);

  const [isLoading, setIsLoading] =
    useState(true);

  // ==========================================
  // FETCH TMDB MOVIES
  // ==========================================

  useEffect(() => {
    let isMounted = true;

    const fetchMovies = async () => {
      try {
        setIsLoading(true);

        const data = await getFeaturedMovies();

        if (isMounted) {
          setMovies(data || []);
        }
      } catch (error) {
        console.error(
          "Failed to load featured movies:",
          error
        );

        if (isMounted) {
          setMovies([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchMovies();

    return () => {
      isMounted = false;
    };
  }, []);

  // ==========================================
  // CONVERT TMDB DATA
  // TO YOUR BANNER DATA FORMAT
  // ==========================================

  const getImageUrl = (url, size = "original") => {
    if (!url) return "";

    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }

    return `https://image.tmdb.org/t/p/${size}${url}`;
  };

  const bannerMovies = movies.map(
    (movie, index) => {
      const titleMain = movie.titleMain || movie.title || movie.original_title || movie.name || "Untitled";
      const titleSub = movie.titleSub || "";
      const fullTitle = titleSub ? `${titleMain} ${titleSub}`.trim() : titleMain;

      return {
        id: movie.id || index + 1,

        // ------------------------------
        // TITLE
        // ------------------------------

        titleMain: titleMain,
        titleSub: titleSub,

        // ------------------------------
        // DESCRIPTION
        // ------------------------------

        description:
          movie.overview ||
          movie.description ||
          "Discover an unforgettable cinematic experience.",

        // ------------------------------
        // RATING
        // ------------------------------

        rating:
          typeof movie.vote_average === "number"
            ? movie.vote_average.toFixed(1)
            : movie.rating
              ? String(movie.rating)
              : "8.0",

        // ------------------------------
        // YEAR
        // ------------------------------

        year: movie.release_date
          ? movie.release_date.slice(0, 4)
          : movie.year || "2026",

        // ------------------------------
        // RUNTIME
        // ------------------------------

        runtime: movie.runtime || "1h 55m",

        // ------------------------------
        // GENRE
        // ------------------------------

        genre: Array.isArray(movie.genre) && movie.genre.length
          ? movie.genre
          : ["Action", "Sci-Fi"],

        // ------------------------------
        // AGE
        // ------------------------------

        age: movie.age || "PG-13",

        // ------------------------------
        // BACKDROP
        // ------------------------------

        backdrop: getImageUrl(
          movie.backdrop_path || movie.backdrop,
          "original",
        ),

        // ------------------------------
        // POSTER / THUMB
        // ------------------------------

        thumb: getImageUrl(
          movie.poster_path || movie.thumb || movie.backdrop_path || movie.backdrop,
          "w500",
        ),

        // ------------------------------
        // INDEX
        // ------------------------------

        thumbIndex: String(index + 1).padStart(2, "0"),

        // ------------------------------
        // THUMB TITLE
        // ------------------------------

        thumbLabel: movie.thumbLabel || fullTitle,
      };
    }
  );

  // ==========================================
  // LOADING STATE
  // ==========================================

  if (isLoading) {
    return <BannerSkeleton />;
  }



  // ==========================================
  // EMPTY / ERROR STATE
  // ==========================================

  if (!bannerMovies.length) {
    return (
      <section className="movie-hero relative flex h-dvh w-full items-center justify-center overflow-hidden bg-background">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-white/60">
            No movies found
          </p>
        </div>
      </section>
    );
  }

  // =========================================
  // Handle watch now click
  // =========================================

  const handleWatchNow = (movie) => {
    const url = `/movie/${movie.id}`;
    router.push(url);
  };

  // ==========================================
  // MAIN UI
  // ==========================================

  return (
    <section className="movie-hero relative h-dvh w-full overflow-hidden bg-background">
      {/* ======================================
          MAIN BANNER
      ====================================== */}

      <>
        <Swiper
          modules={[
            Autoplay,
            EffectFade,
            Navigation,
            Thumbs,
          ]}
          className="hero-main-swiper h-full w-full"
          speed={1100}
          loop={true}
          rewind={true}
          observer={true}
          observeParents={true}
          effect="fade"
          fadeEffect={{
            crossFade: true,
          }}
          autoplay={{
            delay: 5200,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={false}
          thumbs={
            thumbsSwiper
              ? {
                swiper: thumbsSwiper,
              }
              : undefined
          }
          onSwiper={(swiper) => {
            mainSwiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {

            const nextIndex =
              swiper.realIndex;

            setActiveIndex(nextIndex);

            if (
              thumbsSwiperRef.current &&
              thumbsSwiperRef.current
                .realIndex !== nextIndex
            ) {
              thumbsSwiperRef.current.slideTo(
                nextIndex
              );
            }
          }}
        >
          {/* ==================================
                MAIN SLIDES
            ================================== */}

          {bannerMovies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <article className="hero-slide relative h-full w-full">
                {/* BACKDROP */}

                <div
                  className="hero-backdrop absolute inset-0"
                  style={{
                    backgroundImage: `url(${movie.backdrop})`,
                  }}
                  aria-hidden="true"
                />

                {/* OVERLAY */}

                <div
                  className="hero-overlay absolute inset-0"
                  aria-hidden="true"
                />

                {/* CONTENT */}

                <div className="hero-shell relative z-5 mx-auto flex h-full w-full flex-col px-5 pb-10 pt-22 sm:px-10 sm:pb-10 lg:px-16 lg:pt-24 lg:pb-14">
                  <div className="hero-grid mt-auto w-full max-w-full lg:max-w-[52%] xl:max-w-[55%]">
                    <div
                      className="hero-content"
                      data-content
                    >
                      {/* TODAY */}

                      <div className="hero-day">
                        <span
                          className="hero-day-dot"
                          aria-hidden="true"
                        />

                        <span>Today</span>
                      </div>

                      {/* TITLE */}

                      <div className="hero-title-wrap">
                        <p className="hero-index">
                          <span className="hero-index-num">
                            {movie.thumbIndex}
                          </span>
                        </p>

                        <h1 className="hero-title">
                          <span>
                            {movie.titleMain}
                          </span>

                          {movie.titleSub && (
                            <span>
                              {movie.titleSub}
                            </span>
                          )}
                        </h1>
                      </div>

                      {/* STARS */}

                      <div
                        className="hero-stars"
                        aria-label={`Rated ${movie.rating} out of 10`}
                      >
                        {Array.from({
                          length: 5,
                        }).map((_, idx) => (
                          <span
                            key={`${movie.id}-star-${idx}`}
                          >
                            ★
                          </span>
                        ))}
                      </div>

                      {/* META */}

                      <div className="hero-meta">
                        <p>
                          Genre:&nbsp;

                          <span>
                            {movie.genre.join(
                              ", "
                            )}
                          </span>
                        </p>

                        <span className="hero-tag">
                          {movie.year}
                        </span>

                        <span className="hero-tag">
                          {movie.runtime}
                        </span>

                        <span className="hero-tag">
                          IMDb {movie.rating}
                        </span>

                        <span className="hero-tag">
                          {movie.age}
                        </span>
                      </div>

                      {/* DESCRIPTION */}

                      <p className="hero-description">
                        {movie.description}
                      </p>

                      {/* ACTIONS */}

                      <div className="hero-actions flex flex-wrap items-center gap-3">
                        <Button
                          icon={PlayCircleIcon}
                          iconPosition="right"
                          variant="primary"
                          size="md"
                          onClick={() => handleWatchNow(movie)}
                        >
                          watch now
                        </Button>

                        <Button
                          icon={BookmarkIcon}
                          iconPosition="right"
                          variant="secondary"
                          size="md"
                          onClick={() => addToWishlist(movie)}
                        >
                          Wishlist
                        </Button>

                      </div>

                    </div>
                  </div>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* ====================================
              THUMBNAIL SLIDER
          ==================================== */}

        <aside className="hero-side absolute bottom-6 right-4 lg:right-12 z-20 hidden lg:block w-full max-w-[44%] xl:max-w-[42%] 2xl:max-w-[38%]">
          <Swiper
            modules={[
              FreeMode,
              Thumbs,
            ]}
            className="hero-thumbs-swiper"
            loop={true}
            freeMode={{
              enabled: true,
              momentum: true,
            }}
            watchSlidesProgress={true}
            slideToClickedSlide={true}
            observer={true}
            observeParents={true}
            grabCursor={true}
            allowTouchMove={true}
            onSwiper={(swiper) => {
              setThumbsSwiper(swiper);

              thumbsSwiperRef.current =
                swiper;
            }}
            onClick={(swiper) => {
              if (
                typeof swiper.clickedIndex ===
                "number"
              ) {
                const clickedIndex =
                  swiper.clickedIndex;

                setActiveIndex(
                  clickedIndex
                );

                mainSwiperRef.current?.slideToLoop(
                  clickedIndex
                );
              }
            }}
            spaceBetween={14}
            slidesPerView={3}
            breakpoints={{
              1024: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 12,
              },
              1536: {
                slidesPerView: 4,
                spaceBetween: 14,
              },
            }}
          >
            {bannerMovies.map(
              (thumbMovie, idx) => (
                <SwiperSlide
                  className="!h-auto"
                  key={`thumb-${thumbMovie.id}`}
                >
                  <button
                    type="button"
                    className={`hero-thumb group relative rounded-lg ${activeIndex === idx
                      ? "active"
                      : ""
                      }`}
                    onClick={() =>
                      mainSwiperRef.current?.slideToLoop(
                        idx
                      )
                    }
                    aria-label={`Show ${thumbMovie.thumbLabel}`}
                  >
                    {/* INDEX */}

                    <p className="hero-thumb-index absolute top-0 z-5 text-[2.5rem]">
                      {thumbMovie.thumbIndex}
                    </p>

                    {/* THUMB IMAGE */}

                    <span
                      className="hero-thumb-bg absolute inset-0"
                      style={{
                        backgroundImage: `url(${thumbMovie.thumb})`,
                      }}
                      aria-hidden="true"
                    />

                    {/* OVERLAY */}

                    <span
                      className="hero-thumb-overlay absolute inset-0"
                      aria-hidden="true"
                    />

                    {/* TITLE */}

                    <span className="hero-thumb-title relative z-10 line-clamp-2 text-left">
                      {
                        thumbMovie.thumbLabel
                      }
                    </span>
                  </button>
                </SwiperSlide>
              )
            )}
          </Swiper>

          {/* ==================================
                CAROUSEL CONTROLS
            ================================== */}

          <div
            className="mt-4 flex items-center justify-end gap-2"
            aria-label="Carousel controls"
          >
            <Button
              className="w-10 h-10! p-0! flex items-center justify-center rounded-full hover:bg-primary hover:text-white"
              variant="icon"
              aria-label="Previous movie"
              onClick={() =>
                mainSwiperRef.current?.slidePrev()
              }
            >
              <ChevronLeft size={18} />
            </Button>

            <Button
              className="w-10 h-10! p-0! flex items-center justify-center rounded-full hover:bg-primary hover:text-white"
              variant="icon"
              aria-label="Next movie"
              onClick={() =>
                mainSwiperRef.current?.slideNext()
              }
            >
              <ChevronRight size={18} />
            </Button>
          </div>
        </aside>
      </>
    </section>
  );
};

export default Banner;