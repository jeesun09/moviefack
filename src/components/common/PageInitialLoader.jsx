"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { M } from "@/constants/images";

export default function PageInitialLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 750);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#080808] text-text transition-all duration-500 ${
        loading
          ? "opacity-100 pointer-events-auto scale-100"
          : "opacity-0 pointer-events-none scale-105"
      }`}
    >
      {/* Ambient Red Background Glow */}
      <div
        className="pointer-events-none absolute h-72 w-72 rounded-full bg-primary/20 blur-[130px] animate-pulse"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center justify-center text-center gap-5">
        {/* Animated Logo Container */}
        <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl border border-primary/40 bg-surface/90 p-4 shadow-[0_0_40px_rgba(255,59,48,0.45)] transition duration-500 animate-[bounce_1.5s_infinite]">
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
