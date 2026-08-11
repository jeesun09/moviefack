"use client";

import { LOGO, M } from "@/app/constants/images";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.documentElement.scrollHeight - 220;
      setIsVisible(scrollPosition >= threshold);
    };

    toggleVisibility();
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    window.addEventListener("resize", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
      window.removeEventListener("resize", toggleVisibility);
    };
  }, []);

  return (
    <footer
      className={`fixed inset-x-0 bottom-4 z-40 px-4 pb-4 pt-6 transition-all duration-300 sm:px-6 lg:px-8 ${
        isVisible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-6 opacity-0"
      }`}
      aria-hidden={!isVisible}
    >
      <div className="footer-shell mx-auto max-w-5xl rounded-3xl border border-white/15 bg-black/70 px-5 py-5 shadow-[0_20px_70px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
                <Link href="#" className="w-10 h-10 p-2 border border-primary bg-background/80 rounded-full flex items-center justify-center">
          <Image src={M} alt="logo" unoptimized width={1000} height={1000} className="w-full h-full object-contain" />
          </Link>
            <div>
              <h4 className="text-base font-semibold text-white">MUVI</h4>
              <p className="text-sm text-white/60">A simple movie discovery experience.</p>
            </div>
          </div>

          <div className="text-right text-xs text-white/50">
            <p>© {new Date().getFullYear()} MUVI</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;