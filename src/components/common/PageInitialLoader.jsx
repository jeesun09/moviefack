"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { M } from "@/constants/images";

export default function PageInitialLoader() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Smooth 0 to 100% counter timer
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsVisible(false), 250);
          return 100;
        }
        // Random natural increment between 2% and 6% for smooth realistic counting
        const next = prev + Math.floor(Math.random() * 5) + 3;
        return next > 100 ? 100 : next;
      });
    }, 35);

    return () => clearInterval(interval);
  }, []);

  // Prevent scrolling while loading
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="simple-counter-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#080808] text-white select-none"
        >
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

            {/* 0 to 100% Counter Display */}
            <div className="space-y-1">
              <span className="text-4xl sm:text-5xl font-black tracking-tight text-white font-mono">
                {progress}
                <span className="text-primary text-3xl sm:text-4xl ml-0.5">%</span>
              </span>
            </div>

            {/* Minimal Progress Bar */}
            <div className="h-1.5 w-48 sm:w-56 overflow-hidden rounded-full bg-white/10 p-0.5 border border-white/10">
              <div
                className="h-full rounded-full bg-primary shadow-[0_0_15px_rgba(255,59,48,0.8)] transition-all duration-75 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
