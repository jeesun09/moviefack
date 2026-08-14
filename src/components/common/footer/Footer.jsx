"use client";

import Image from "next/image";
import Link from "next/link";
import { M } from "@/constants/images";
import { Info } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative w-full border-t border-white/10 bg-[#080808] py-10 text-text overflow-hidden">
      {/* Subtle Ambient Glow */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-40 w-96 rounded-full bg-primary/10 blur-[100px]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-[1600px] w-full px-5 text-center flex flex-col items-center gap-4">
        {/* Logo Branding */}
        <Link href="/" className="inline-flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-primary/40 bg-surface/90 p-2 shadow-[0_0_25px_rgba(255,59,48,0.3)] transition duration-300 group-hover:scale-105">
            <Image
              loading="lazy"
              src={M}
              alt="MUVI logo"
              unoptimized
              width={36}
              height={36}
              className="h-full w-full object-contain"
            />
          </div>
          <span className="text-xl font-extrabold tracking-widest text-white">
            MUVI
          </span>
        </Link>

        {/* Powerful Concise Content */}
        <p className="max-w-md text-xs sm:text-sm text-white/60 leading-relaxed">
          Stream unlimited trending movies, blockbuster cinema, and exclusive TV
          series in Ultra HD.
        </p>

        {/* Educational Purpose Disclaimer */}
        <div className="mt-2 flex max-w-lg items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70 backdrop-blur-md">
          <Info className="h-4 w-4 shrink-0 text-primary" />
          <span>
            <strong className="font-medium text-white">Educational Notice:</strong> This website is built strictly for educational purposes and non-commercial project demonstration.
          </span>
        </div>

        {/* Copyright Bar */}
        <div className="pt-2 text-[11px] uppercase tracking-[0.25em] text-white/40">
          © {new Date().getFullYear()} MUVI CINEMA. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
