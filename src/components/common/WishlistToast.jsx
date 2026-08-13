"use client";

import { useAuth } from "@/context/AuthContext";
import { Bookmark, X, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

const WishlistToast = () => {
  const { toastOpen, closeToast, toastSuccess } = useAuth();

  return (
    <>
      {/* ── Guest Wishlist Auth Toast Notification ── */}
      <AnimatePresence>
        {toastOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="fixed bottom-6 right-4 left-4 sm:left-auto sm:right-6 z-100 max-w-md w-full rounded-2xl border border-primary/30 bg-[#121212]/95 p-5 shadow-[0_20px_70px_rgba(255,59,48,0.28)] backdrop-blur-2xl text-white"
          >
            {/* Top Bar: Icon + Title + Close Button */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary border border-primary/40 shadow-[0_0_15px_rgba(255,59,48,0.4)]">
                  <Bookmark className="h-5 w-5 fill-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white tracking-wide">
                    Save to Wishlist
                  </h4>
                  <span className="text-[11px] font-medium text-primary uppercase tracking-wider">
                    Account Required
                  </span>
                </div>
              </div>

              <button
                onClick={closeToast}
                className="rounded-full p-1 text-white/50 hover:bg-white/10 hover:text-white transition"
                aria-label="Dismiss toast"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Required Message Text */}
            <p className="mt-3 text-xs sm:text-sm text-white/80 leading-relaxed font-medium">
              Want to save this movie for later? Create an account to add it to your wishlist.
            </p>

            {/* Action Buttons */}
            <div className="mt-4 flex items-center justify-end gap-3 pt-1">
              <button
                onClick={closeToast}
                className="rounded-full px-4 py-2 text-xs font-semibold text-white/60 hover:text-white transition"
              >
                Maybe Later
              </button>

              <Link
                href="/sign-up"
                onClick={closeToast}
                className="group flex items-center gap-1.5 rounded-full bg-primary px-5 py-2 text-xs font-bold text-white shadow-[0_0_20px_rgba(255,59,48,0.4)] transition hover:bg-primary-hover hover:shadow-[0_0_30px_rgba(255,59,48,0.6)]"
              >
                <span>Sign Up</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Success Toast (For Logged In Users) ── */}
      <AnimatePresence>
        {toastSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-6 right-4 sm:right-6 z-100 flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-[#121212]/95 px-4 py-3 shadow-[0_15px_50px_rgba(16,185,129,0.2)] backdrop-blur-xl text-white"
          >
            <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
            <span className="text-xs font-semibold text-white">{toastSuccess}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WishlistToast;
