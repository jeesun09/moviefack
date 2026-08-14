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

      <div className="relative z-10 flex flex-col items-center gap-6 text-center">
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

        {/* Minimal Animated Loading Bar */}
        <div className="h-1.5 w-48 sm:w-56 overflow-hidden rounded-full bg-white/10 p-0.5 border border-white/10 mt-1">
          <div className="h-full w-full rounded-full bg-primary animate-pulse shadow-[0_0_15px_rgba(255,59,48,0.8)]" />
        </div>
      </div>
    </div>
  );
}
