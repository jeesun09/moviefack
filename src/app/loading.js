import Image from "next/image";
import { M } from "@/constants/images";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#080808] text-text select-none">
      {/* Subtle Ambient Red Glow */}
      <div
        className="pointer-events-none absolute h-72 w-72 rounded-full bg-primary/20 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center gap-5 text-center">
        {/* Brand Logo */}
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/40 bg-surface/90 p-3 shadow-[0_0_30px_rgba(255,59,48,0.35)]">
          <Image
            src={M}
            alt="Logo"
            unoptimized
            width={48}
            height={48}
            priority
            className="h-full w-full object-contain drop-shadow-[0_0_10px_rgba(255,59,48,0.7)]"
          />
        </div>

        {/* Brand Name & Typography */}
        <div className="space-y-1">
          <h2 className="text-lg font-black tracking-[0.35em] text-white uppercase">
            MUVI
          </h2>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
            CINEMA
          </p>
        </div>

        {/* Active Animated Traveling Progress Bar */}
        <div className="relative h-1.5 w-52 sm:w-64 overflow-hidden rounded-full bg-white/10 border border-white/15 mt-2">
          <div className="absolute inset-y-0 w-1/2 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_20px_rgba(255,59,48,1)] animate-loading-bar" />
        </div>
      </div>
    </div>
  );
}
