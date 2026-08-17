"use client";

import { PlayCircle } from "lucide-react";
import Image from "next/image";
import React, { memo } from "react";

const SeriesEpisodeListItem = ({
  index,
  style,
  episodes,
  posterSrc,
  handlePlayEpisode,
}) => {
  const ep = episodes[index];

  const epThumb = ep.still_path
    ? `https://image.tmdb.org/t/p/w500${ep.still_path}`
    : posterSrc;

  return (
    <div
      style={{
        ...style,
        paddingBottom: 12,
      }}
    >
      <div
        //   key={ep.id || ep.episode_number}
        onClick={() => handlePlayEpisode(ep)}
        className="group relative flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl border border-white/10 bg-surface/50 p-3.5 sm:p-4 backdrop-blur-md transition duration-300 hover:border-white/25 hover:bg-surface/80 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] cursor-pointer"
      >
        {/* Episode Thumbnail */}
        <div className="relative aspect-video w-full sm:w-56 shrink-0 overflow-hidden rounded-xl bg-surface">
          <Image
            loading="lazy"
            src={epThumb}
            alt={ep.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent sm:hidden" />

          {/* Episode Number Badge */}
          <span className="absolute bottom-2 left-2 rounded-lg bg-black/80 border border-white/10 px-2 py-0.5 text-xs font-bold text-white shadow">
            EP {ep.episode_number}
          </span>

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 bg-black/40">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-[0_0_20px_rgba(255,59,48,0.7)] transition-transform duration-300 group-hover:scale-110">
              <PlayCircle className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Episode Content */}
        <div className="flex-1 min-w-0 space-y-1.5">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-base sm:text-lg font-bold text-white truncate group-hover:text-primary transition">
              {ep.name}
            </h3>
            <span className="shrink-0 text-xs font-medium text-white/50">
              {ep.runtime || "50 min"}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-white/70 line-clamp-2 leading-relaxed">
            {ep.overview ||
              "Reacher discovers crucial evidence that forces him into an explosive confrontation."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default memo(SeriesEpisodeListItem); // SeriesEpisodeListItem
