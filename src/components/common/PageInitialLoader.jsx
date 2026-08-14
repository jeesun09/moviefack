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
        // Increment between 3% and 7% for natural, fluid progress
        const next = prev + Math.floor(Math.random() * 5) + 3;
        return next > 100 ? 100 : next;
      });
    }, 35);

    return () => clearInterval(interval);
  }, []);

  // Prevent scrolling while initial loading
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
          transition={{ duration: 0.35, ease: "easeOut" }}
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
                loading="eager"
                src={M}
                alt="Logo"
                unoptimized
                width={48}
                height={48}

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

            {/* Animated Progress Bar using Framer Motion */}
            <div className="relative h-2 w-52 sm:w-64 overflow-hidden rounded-full bg-white/10 border border-white/15">
              <motion.div
                className="h-full rounded-full bg-primary shadow-[0_0_20px_rgba(255,59,48,1)]"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.08, ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
