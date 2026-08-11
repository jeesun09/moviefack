"use client";

import { getImageUrl } from "@/util/helper";
import { PlayCircle } from "lucide-react";
import Image from "next/image";

const MovieCard = ({ movie }) => {
  return (
    <article className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-surface shadow-[0_18px_60px_rgba(0,0,0,0.22)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(0,0,0,0.32)]">
      <div className="relative overflow-hidden rounded-[28px] bg-white/5">
        <Image
          height={1000}
          width={1000}
          src={getImageUrl(movie.poster_path)}
          placeholder="blur"
          blurDataURL={getImageUrl(movie.backdrop_path)}
          alt={movie.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-90 transition duration-300 group-hover:opacity-100" />

        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
          <div className="mb-3 flex items-center justify-between text-[11px] uppercase tracking-[0.24em] text-white/60">
            <span>{movie.release_date.split("-")[0] || "2026"}</span>
            <span className="rounded-full border border-white/10 bg-white/10 px-2 py-1 text-[10px] uppercase text-white/80">
              {movie.adult ? "18+" : "PG-13"}
            </span>
          </div>

          <h3 className="text-[0.95rem] font-semibold leading-5 text-white line-clamp-2">
            {movie.title}
          </h3>

          <div className="mt-3 flex items-center justify-between text-[11px] text-white/60">
            <span>
              {movie.vote_average
                ? `${movie.vote_average.toFixed(1)}/10`
                : "N/A"}
            </span>
            <span>{movie.genre?.[0] || "Movie"}</span>
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/70 text-white shadow-[0_0_30px_rgba(255,255,255,0.16)]">
            <PlayCircle className="h-8 w-8" />
          </div>
        </div>
      </div>
    </article>
  );
};

export default MovieCard;
