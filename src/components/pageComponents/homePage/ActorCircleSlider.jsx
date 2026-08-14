"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import { Star, Sparkles } from "lucide-react";

import "swiper/css";
import "swiper/css/free-mode";

const TOP_ACTORS = [
  {
    id: "srk",
    name: "Shah Rukh Khan",
    role: "King Khan • Bollywood",
    photo: "https://image.tmdb.org/t/p/w185/nNkbbn2zB7l4hI4VvH3XjUaM7C2.jpg",
    fallback: "https://image.tmdb.org/t/p/w185/8qB9q5BtK4h0d9n0o1d1C0eQ3sF.jpg",
    query: "Shah Rukh Khan",
  },
  {
    id: "leo",
    name: "Leonardo DiCaprio",
    role: "Inception • Titanic",
    photo: "https://image.tmdb.org/t/p/w185/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg",
    query: "Leonardo DiCaprio",
  },
  {
    id: "tom",
    name: "Tom Cruise",
    role: "Mission Impossible • Top Gun",
    photo: "https://image.tmdb.org/t/p/w185/8qB9q5BtK4h0d9n0o1d1C0eQ3sF.jpg",
    query: "Tom Cruise",
  },
  {
    id: "cillian",
    name: "Cillian Murphy",
    role: "Oppenheimer • Peaky Blinders",
    photo: "https://image.tmdb.org/t/p/w185/dm6V2D2L1u2k2K1p2v2L1k1P2v2.jpg",
    fallback: "https://image.tmdb.org/t/p/w185/3m1R1G1L1k1p2v2L1k1P2v2.jpg",
    query: "Cillian Murphy",
  },
  {
    id: "rdj",
    name: "Robert Downey Jr.",
    role: "Iron Man • Avengers",
    photo: "https://image.tmdb.org/t/p/w185/5qHNjhtjMD4YWH3ju0g0WzZ6Sms.jpg",
    query: "Robert Downey Jr.",
  },
  {
    id: "scarlett",
    name: "Scarlett Johansson",
    role: "Black Widow • Lucy",
    photo: "https://image.tmdb.org/t/p/w185/6NsMbJXRlDZuDzatN2akFdGuTvx.jpg",
    query: "Scarlett Johansson",
  },
  {
    id: "ryan",
    name: "Ryan Reynolds",
    role: "Deadpool • Free Guy",
    photo: "https://image.tmdb.org/t/p/w185/4Y8mS9nU9k1P2v2L1k1P2v2.jpg",
    fallback: "https://image.tmdb.org/t/p/w185/h1K4b5BtK4h0d9n0o1d1C0eQ3sF.jpg",
    query: "Ryan Reynolds",
  },
  {
    id: "allu",
    name: "Allu Arjun",
    role: "Pushpa • Tollywood",
    photo: "https://image.tmdb.org/t/p/w185/q8L5b5BtK4h0d9n0o1d1C0eQ3sF.jpg",
    fallback: "https://image.tmdb.org/t/p/w185/8qB9q5BtK4h0d9n0o1d1C0eQ3sF.jpg",
    query: "Allu Arjun",
  },
  {
    id: "prabhas",
    name: "Prabhas",
    role: "Baahubali • Kalki 2898 AD",
    photo: "https://image.tmdb.org/t/p/w185/8qB9q5BtK4h0d9n0o1d1C0eQ3sF.jpg",
    query: "Prabhas",
  },
  {
    id: "prosenjit",
    name: "Prosenjit Chatterjee",
    role: "Bengali Superstar • Tollywood",
    photo: "https://image.tmdb.org/t/p/w185/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg",
    query: "Prosenjit Chatterjee",
  },
  {
    id: "salman",
    name: "Salman Khan",
    role: "Tiger 3 • Sultan",
    photo: "https://image.tmdb.org/t/p/w185/5qHNjhtjMD4YWH3ju0g0WzZ6Sms.jpg",
    query: "Salman Khan",
  },
  {
    id: "christian",
    name: "Christian Bale",
    role: "The Dark Knight • Batman",
    photo: "https://image.tmdb.org/t/p/w185/b7fTC9WFkgqGOv771ttCHxFi9cx.jpg",
    query: "Christian Bale",
  },
  {
    id: "keanu",
    name: "Keanu Reeves",
    role: "John Wick • The Matrix",
    photo: "https://image.tmdb.org/t/p/w185/4D0PpNI0kmP58hgrwGC3wC5GqRy.jpg",
    query: "Keanu Reeves",
  },
  {
    id: "zendaya",
    name: "Zendaya",
    role: "Dune • Euphoria",
    photo: "https://image.tmdb.org/t/p/w185/r3A7dr7emgjG0j3J3G1L1k1P2v2.jpg",
    fallback: "https://image.tmdb.org/t/p/w185/6NsMbJXRlDZuDzatN2akFdGuTvx.jpg",
    query: "Zendaya",
  },
];

export default function ActorCircleSlider() {
  return (
    <section className="my-10 overflow-hidden py-4">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-widest">
            <Sparkles className="h-3.5 w-3.5 fill-primary" />
            <span>LEGENDS & SUPERSTARS</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight">
            Top-Rated Actors & Cinematic Icons
          </h2>
          <p className="text-xs sm:text-sm text-white/60">
            Explore movie collections by Hollywood icons, Bollywood royalty, and Tollywood legends.
          </p>
        </div>
      </div>

      {/* Smooth Marquee Auto-Sliding Swiper */}
      <Swiper
        modules={[Autoplay, FreeMode]}
        slidesPerView="auto"
        spaceBetween={20}
        loop={true}
        freeMode={true}
        speed={6000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        className="w-full !overflow-visible py-3"
      >
        {TOP_ACTORS.map((actor, idx) => (
          <SwiperSlide
            key={`actor-${actor.id}-${idx}`}
            className="!w-[130px] sm:!w-[150px] md:!w-[165px] select-none"
          >
            <Link
              href={`/search?q=${encodeURIComponent(actor.query)}`}
              className="group flex flex-col items-center text-center space-y-2.5 p-2 rounded-2xl transition duration-300 hover:bg-white/[0.04]"
            >
              {/* Round Avatar Container with Glowing Border */}
              <div className="relative h-24 w-24 sm:h-28 sm:w-28 overflow-hidden rounded-full border-2 border-white/20 bg-surface shadow-[0_0_20px_rgba(0,0,0,0.8)] transition-all duration-300 group-hover:scale-110 group-hover:border-primary group-hover:shadow-[0_0_25px_rgba(255,59,48,0.6)]">
                <Image
                  loading="lazy"
                  src={actor.photo || actor.fallback}
                  alt={actor.name}
                  fill
                  sizes="(max-width: 640px) 96px, 112px"
                  className="object-cover transition-transform duration-500 group-hover:scale-115"
                />
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition duration-300" />
              </div>

              {/* Actor Details */}
              <div className="space-y-0.5 max-w-full">
                <h4 className="text-xs sm:text-sm font-extrabold text-white truncate group-hover:text-primary transition">
                  {actor.name}
                </h4>
                <p className="text-[10px] text-white/50 truncate font-medium">
                  {actor.role}
                </p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
