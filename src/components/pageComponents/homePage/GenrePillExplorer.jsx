"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import {
  Flame,
  Globe,
  Sparkles,
  Tv,
  Film,
  Zap,
  Compass,
  Ghost,
  Heart,
  Smile,
  ShieldAlert,
  Award,
  Clapperboard,
} from "lucide-react";

import "swiper/css";
import "swiper/css/free-mode";

const CATEGORIES = [
  { id: "hollywood", name: "Hollywood", icon: Film, color: "hover:border-blue-500 hover:text-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]" },
  { id: "bollywood", name: "Bollywood", icon: Sparkles, color: "hover:border-amber-500 hover:text-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]" },
  { id: "bengali", name: "বাংলা সিনেমা", icon: Heart, color: "hover:border-emerald-500 hover:text-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]" },
  { id: "tollywood", name: "Tollywood & South", icon: Zap, color: "hover:border-orange-500 hover:text-orange-400 hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]" },
  { id: "marvel", name: "Marvel & MCU", icon: ShieldAlert, color: "hover:border-red-500 hover:text-red-400 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]" },
  { id: "kdrama", name: "K-Drama & Asian", icon: Tv, color: "hover:border-pink-500 hover:text-pink-400 hover:shadow-[0_0_20px_rgba(236,72,153,0.4)]" },
  { id: "anime", name: "Anime & Cartoon", icon: Flame, color: "hover:border-purple-500 hover:text-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]" },
  { id: "action", name: "Action & Thriller", icon: Clapperboard, color: "hover:border-red-500 hover:text-red-400 hover:shadow-[0_0_20px_rgba(255,59,48,0.4)]" },
  { id: "scifi", name: "Sci-Fi & Cyberpunk", icon: Compass, color: "hover:border-cyan-500 hover:text-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]" },
  { id: "horror", name: "Horror Nights", icon: Ghost, color: "hover:border-teal-500 hover:text-teal-400 hover:shadow-[0_0_20px_rgba(20,184,166,0.4)]" },
  { id: "toprated", name: "Oscar & Top Rated", icon: Award, color: "hover:border-yellow-400 hover:text-yellow-300 hover:shadow-[0_0_20px_rgba(250,204,21,0.4)]" },
  { id: "comedy", name: "Comedy & Laughs", icon: Smile, color: "hover:border-yellow-500 hover:text-yellow-400 hover:shadow-[0_0_20px_rgba(234,179,8,0.4)]" },
  { id: "world", name: "World Cinema", icon: Globe, color: "hover:border-indigo-500 hover:text-indigo-400 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]" },
];

export default function GenrePillExplorer() {
  return (
    <section className="relative my-8 overflow-hidden py-1">
      {/* Side Edge Fade Gradients */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-background to-transparent z-10" />

      {/* Infinite Smooth Auto-Sliding Marquee */}
      <Swiper
        modules={[Autoplay, FreeMode]}
        slidesPerView="auto"
        spaceBetween={14}
        loop={true}
        freeMode={true}
        speed={5000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        className="w-full !overflow-visible py-2"
      >
        {CATEGORIES.map((cat, index) => {
          const Icon = cat.icon;
          return (
            <SwiperSlide
              key={`pill-${cat.id}-${index}`}
              className="!w-auto select-none"
            >
              <Link
                href="/movies"
                className={`flex shrink-0 items-center gap-2 rounded-2xl border border-white/10 bg-surface/80 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white/80 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/10 active:scale-95 shadow-md ${cat.color}`}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                <span className="whitespace-nowrap">{cat.name}</span>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
