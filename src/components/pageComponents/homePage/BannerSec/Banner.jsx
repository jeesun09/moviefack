"use client";

import { useEffect, useRef, useState } from "react";

import {
  ChevronLeft,
  ChevronRight,
  PlayCircleIcon,
} from "lucide-react";

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

const Banner = () => {
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
      const title =
        movie.title ||
        movie.original_title ||
        movie.titleMain ||
        "Untitled";

      return {
        id: movie.id,

        // ------------------------------
        // TITLE
        // ------------------------------

        titleMain: title,

        titleSub: "",

        // ------------------------------
        // DESCRIPTION
        // ------------------------------

        description:
          movie.overview ||
          "Discover an unforgettable cinematic experience.",

        // ------------------------------
        // RATING
        // ------------------------------

        rating:
          typeof movie.vote_average === "number"
            ? movie.vote_average.toFixed(1)
            : "N/A",

        // ------------------------------
        // YEAR
        // ------------------------------

        year: movie.release_date
          ? movie.release_date.slice(0, 4)
          : "N/A",

        // ------------------------------
        // TEMP RUNTIME
        // ------------------------------
        // Trending API does not return runtime.
        // We will add it later using /movie/{id}

        runtime: "2h 10m",

        // ------------------------------
        // TEMP GENRE
        // ------------------------------
        // Trending API gives genre_ids.
        // We can map these later.

        genre: ["Movie"],

        // ------------------------------
        // TEMP AGE
        // ------------------------------

        age: "PG-13",

        // ------------------------------
        // BACKDROP
        // ------------------------------

        backdrop: getImageUrl(
          movie.backdrop_path || movie.backdrop,
          "original"
        ),

        // ------------------------------
        // POSTER / THUMB
        // ------------------------------

        thumb: getImageUrl(
          movie.poster_path || movie.thumb,
          "w500"
        ),

        // ------------------------------
        // INDEX
        // ------------------------------

        thumbIndex: String(index + 1).padStart(
          2,
          "0"
        ),

        // ------------------------------
        // THUMB TITLE
        // ------------------------------

        thumbLabel: title,
      };
    }
  );

  // ==========================================
  // LOADING STATE
  // ==========================================

  if (isLoading) {
    return (
      <section className="movie-hero relative h-dvh w-full overflow-hidden bg-background">
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-background">
          <div className="flex flex-col items-center gap-4">
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/5">
              <div
                className="absolute inset-1 animate-spin rounded-full border-2 border-transparent border-t-[#ff6b5d] border-r-[#f59e0b]"
                aria-hidden="true"
              />

              <span className="relative text-lg font-bold tracking-[0.2em] text-white">
                M
              </span>
            </div>

            <p className="text-[0.7rem] uppercase tracking-[0.42em] text-white/60">
              Loading movies
            </p>
          </div>
        </div>
      </section>
    );
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
              // loop=true হলে realIndex ব্যবহার করা উচিত
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

                  <div className="hero-shell relative z-5 mx-auto flex h-full w-full flex-col px-5 pb-5 pt-22 sm:px-8 sm:pb-9 lg:px-14 lg:pt-8">
                    <div className="hero-grid mt-auto">
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

                        <div className="hero-actions">
                          <Button
                            icon={PlayCircleIcon}
                            iconPosition="right"
                            variant="primary"
                            size="md"
                          >
                            watch now
                          </Button>

                          <Button
                            variant="secondary"
                            size="md"
                          >
                            More info
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

          <aside className="hero-side absolute bottom-0 right-4 z-20 hidden w-[min(100vw,700px)] md:bottom-6 md:block">
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
                420: {
                  slidesPerView: 2,
                },

                640: {
                  slidesPerView: 2,
                },

                900: {
                  slidesPerView: 3,
                },

                1200: {
                  slidesPerView: 3,
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
                      className={`hero-thumb group relative rounded-lg ${
                        activeIndex === idx
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
                variant="icon"
                aria-label="Previous movie"
                onClick={() =>
                  mainSwiperRef.current?.slidePrev()
                }
              >
                <ChevronLeft size={18} />
              </Button>

              <Button
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