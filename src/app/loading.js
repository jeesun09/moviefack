import Image from "next/image";
import { M } from "@/constants/images";

export default function Loading() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-background text-text overflow-hidden">
      {/* Ambient Red Background Glow */}
      <div
        className="pointer-events-none absolute h-64 w-64 rounded-full bg-primary/15 blur-[120px] animate-pulse"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center justify-center text-center gap-5">
        {/* Animated Logo Container */}
        <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl border border-primary/40 bg-surface/90 p-4 shadow-[0_0_35px_rgba(255,59,48,0.35)] transition duration-500 hover:scale-105">
          <div
            className="absolute inset-0 rounded-3xl bg-primary/10 blur-md animate-pulse"
            aria-hidden="true"
          />
          <Image
            src={M}
            alt="MUVI logo"
            unoptimized
            width={56}
            height={56}
            className="h-full w-full object-contain relative z-10"
          />
        </div>

        {/* Brand Name & Animated Typography */}
        <div className="space-y-1">
          <h2 className="text-2xl font-black tracking-[0.35em] text-white">
            MUVI
          </h2>
          <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-white/50 animate-pulse">
            CINEMA
          </p>
        </div>

        {/* Minimal Animated Loading Bar */}
        <div className="h-1 w-24 overflow-hidden rounded-full bg-white/10 mt-1">
          <div className="h-full w-full bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}
