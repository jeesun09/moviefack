export default function Loading() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background text-text">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,120,90,0.2),transparent_35%),radial-gradient(circle_at_bottom,_rgba(255,191,75,0.14),transparent_28%)]" />

      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <div className="mb-4 flex items-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.38em] text-white/70">
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#ff3b30] shadow-[0_0_16px_rgba(255,59,48,0.95)]" aria-hidden="true" />
          <span>Loading</span>
        </div>

        <div className="relative flex h-24 w-24 items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-white/10" aria-hidden="true" />
          <div className="absolute inset-2 animate-spin rounded-full border-2 border-transparent border-t-[#ff6b5d] border-r-[#f4b33e]" aria-hidden="true" />
          <div className="absolute inset-5 rounded-full border border-white/10" aria-hidden="true" />

          <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-lg font-bold tracking-[0.18em] text-white shadow-[0_10px_30px_rgba(255,95,80,0.2)]">
            M
          </div>
        </div>

        <p className="mt-6 text-[0.7rem] uppercase tracking-[0.44em] text-white/60">
          Muvi Cinema
        </p>
      </div>
    </div>
  );
}
