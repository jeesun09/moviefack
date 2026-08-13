export default function Loading() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background text-text">
      {/* Dynamic Ambient Glow Backdrops */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/20 blur-[140px] animate-pulse"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-amber-500/15 blur-[140px] animate-pulse"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,59,48,0.08)_0%,transparent_65%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        {/* Main Cinematic Aperture / Lens Container */}
        <div className="relative flex h-32 w-32 items-center justify-center">
          {/* Outer Pulsing Glow Aura */}
          <div
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/30 to-amber-500/20 blur-xl animate-pulse"
            aria-hidden="true"
          />

          {/* Outer Orbiting Lens Ring */}
          <div
            className="absolute inset-0 rounded-full border border-white/10 shadow-[0_0_30px_rgba(255,59,48,0.15)]"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 animate-[spin_4s_linear_infinite] rounded-full border border-transparent border-t-primary border-r-amber-400/80"
            aria-hidden="true"
          />

          {/* Reverse Orbiting Aperture Ring */}
          <div
            className="absolute inset-2 animate-[spin_2.5s_linear_infinite_reverse] rounded-full border-2 border-transparent border-t-amber-500 border-l-primary/90"
            aria-hidden="true"
          />

          {/* Inner Dashed Film Reel Spinner */}
          <div
            className="absolute inset-4 animate-[spin_7s_linear_infinite] rounded-full border-2 border-dashed border-white/20"
            aria-hidden="true"
          />

          {/* Center Glowing Logo Badge */}
          <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-surface/90 text-xl font-extrabold tracking-wider text-white shadow-[0_0_25px_rgba(255,59,48,0.4)] backdrop-blur-md">
            <span className="bg-gradient-to-tr from-white via-white to-primary-light bg-clip-text text-transparent">
              M
            </span>
          </div>
        </div>

        {/* Status Badge */}
        <div className="mt-8 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md shadow-lg">
          <span
            className="h-2 w-2 animate-ping rounded-full bg-primary shadow-[0_0_12px_#ff3b30]"
            aria-hidden="true"
          />
          <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-white/90">
            MUVI CINEMA
          </span>
        </div>

        {/* Equalizer Audio / Film Wave Visualizer */}
        <div className="mt-5 flex items-end gap-1 h-5" aria-hidden="true">
          <span className="w-1 bg-primary/70 rounded-full animate-[bounce_1s_infinite_100ms] h-2" />
          <span className="w-1 bg-amber-500/80 rounded-full animate-[bounce_1s_infinite_300ms] h-4" />
          <span className="w-1 bg-primary/90 rounded-full animate-[bounce_1s_infinite_200ms] h-5" />
          <span className="w-1 bg-amber-400 rounded-full animate-[bounce_1s_infinite_400ms] h-3" />
          <span className="w-1 bg-primary/70 rounded-full animate-[bounce_1s_infinite_150ms] h-2" />
        </div>

        {/* Subtitle / Loading Indicator */}
        <p className="mt-4 text-[10px] uppercase tracking-[0.45em] text-white/50 animate-pulse">
          Loading Cinematic World...
        </p>
      </div>
    </div>
  );
}

