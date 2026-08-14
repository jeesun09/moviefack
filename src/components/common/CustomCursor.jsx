"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";
import { Play } from "lucide-react";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState("default"); // "default", "hover", "play", "text"
  const [isClicked, setIsClicked] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  // Mouse Coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth Springs for outer ring (fluid trailing physics)
  const ringX = useSpring(mouseX, { damping: 26, stiffness: 280, mass: 0.45 });
  const ringY = useSpring(mouseY, { damping: 26, stiffness: 280, mass: 0.45 });

  // Fast Springs for inner dot (near-instant tracking)
  const dotX = useSpring(mouseX, { damping: 35, stiffness: 750, mass: 0.1 });
  const dotY = useSpring(mouseY, { damping: 35, stiffness: 750, mass: 0.1 });

  useEffect(() => {
    // Detect if device has a precise pointer (mouse/trackpad)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsTouchDevice(!mediaQuery.matches);

    const handleMediaChange = (e) => {
      setIsTouchDevice(!e.matches);
    };
    mediaQuery.addEventListener("change", handleMediaChange);

    if (!mediaQuery.matches) return;

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      // Check for Play Cards / Media
      if (
        target.closest('[data-cursor="play"]') ||
        target.closest(".group\\/card") ||
        target.closest(".aspect-video") ||
        target.closest(".aspect-\\[2\\/3\\]")
      ) {
        setCursorType("play");
        return;
      }

      // Check for Interactive Clickable Elements
      if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest('input[type="submit"]') ||
        target.closest('input[type="button"]') ||
        target.closest('[role="button"]') ||
        target.closest(".cursor-pointer") ||
        target.closest("select") ||
        target.closest("textarea") ||
        target.closest("input")
      ) {
        setCursorType("hover");
        return;
      }

      // Default
      setCursorType("default");
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouchDevice || !isVisible) return null;

  // Variants for Outer Halo Ring
  const getRingVariants = () => {
    if (isClicked) {
      return {
        width: 32,
        height: 32,
        backgroundColor: "rgba(255, 59, 48, 0.25)",
        borderColor: "rgba(255, 59, 48, 0.9)",
        scale: 0.85,
      };
    }
    switch (cursorType) {
      case "hover":
        return {
          width: 52,
          height: 52,
          backgroundColor: "rgba(255, 59, 48, 0.12)",
          borderColor: "rgba(255, 59, 48, 0.75)",
          scale: 1.15,
        };
      case "play":
        return {
          width: 68,
          height: 68,
          backgroundColor: "rgba(20, 20, 20, 0.85)",
          borderColor: "rgba(255, 59, 48, 0.85)",
          scale: 1.1,
        };
      default:
        return {
          width: 36,
          height: 36,
          backgroundColor: "rgba(255, 59, 48, 0.04)",
          borderColor: "rgba(255, 255, 255, 0.35)",
          scale: 1,
        };
    }
  };

  const ringStyles = getRingVariants();

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999999] overflow-hidden select-none">
      {/* Outer Fluid Trailing Ring / Halo */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center rounded-full border shadow-[0_0_20px_rgba(255,59,48,0.25)] backdrop-blur-[1px] -translate-x-1/2 -translate-y-1/2"
        style={{
          x: ringX,
          y: ringY,
        }}
        animate={ringStyles}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 28,
        }}
      >
        {/* Play Badge Icon Inside Ring When Hovering Playables */}
        <AnimatePresence>
          {cursorType === "play" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-1 text-[9px] font-extrabold uppercase tracking-wider text-primary"
            >
              <Play className="h-3 w-3 fill-primary" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Inner Precision Red Dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full bg-primary shadow-[0_0_10px_rgba(255,59,48,0.9)] -translate-x-1/2 -translate-y-1/2"
        style={{
          x: dotX,
          y: dotY,
        }}
        animate={{
          width: cursorType === "hover" ? 6 : cursorType === "play" ? 0 : 7,
          height: cursorType === "hover" ? 6 : cursorType === "play" ? 0 : 7,
          opacity: cursorType === "play" ? 0 : 1,
          scale: isClicked ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      />
    </div>
  );
}
