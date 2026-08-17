import { Play } from "lucide-react";
import Image from "next/image";
import React from "react";

const DrawerEpisodeListItem = ({
    index,
    style,
    episodes,
    posterSrc,
    handlePlayEpisode,
    selectedSeason,
    currentPlayingEpisode,
    currentPlayingSeason
}) => {
  const ep = episodes[index];
  const isCurrent =
    ep.episode_number === currentPlayingEpisode &&
    (ep.season_number || selectedSeason) === currentPlayingSeason;
  const thumb = ep.still_path
    ? `https://image.tmdb.org/t/p/w300${ep.still_path}`
    : posterSrc;

  return (
      <div style={{
          ...style,
          paddingBottom: 6,
    }}>
      <div
        key={`drawer-ep-${ep.id || ep.episode_number}`}
        onClick={() => handlePlayEpisode(ep)}
        className={`group relative flex items-center gap-3 rounded-2xl border p-2.5 transition duration-200 cursor-pointer ${
          isCurrent
            ? "border-primary bg-primary/15 shadow-[0_0_15px_rgba(255,59,48,0.35)]"
            : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.08]"
        }`}
      >
        {/* Thumbnail Container */}
        <div className="relative aspect-video w-24 sm:w-28 shrink-0 overflow-hidden rounded-xl bg-black">
          <Image
            loading="lazy"
            src={thumb}
            alt={ep.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition" />

          {/* Episode number badge */}
          <span className="absolute bottom-1 left-1 rounded-md bg-black/80 px-1.5 py-0.5 text-[9px] font-bold text-white border border-white/10">
            {ep.episode_number}
          </span>

          {/* Play Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/40">
            <Play className="h-4 w-4 text-white fill-white" />
          </div>
        </div>

        {/* Episode Details */}
        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex items-center justify-between gap-1">
            <h4
              className={`text-xs font-bold truncate leading-tight ${
                isCurrent ? "text-primary" : "text-white"
              }`}
            >
              {ep.episode_number}. {ep.name}
            </h4>
          </div>
          <p className="text-[10px] text-white/50 line-clamp-1">
            {ep.runtime || "50 min"} • Season {selectedSeason}
          </p>
          <p className="text-[11px] text-white/60 line-clamp-2 leading-relaxed">
            {ep.overview || "Stream this episode in Ultra HD 4K."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DrawerEpisodeListItem;
