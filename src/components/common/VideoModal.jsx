"use client";

import { motion, AnimatePresence } from "motion/react";
import { X, Film } from "lucide-react";

const VideoModal = ({ isOpen, onClose, id, title }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-xl"
            aria-hidden="true"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="relative z-10 w-full max-w-4xl overflow-hidden rounded-3xl border border-white/15 bg-[#0f0f0f] shadow-[0_25px_80px_rgba(0,0,0,0.9)]"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <div className="flex items-center gap-2">
                <Film className="h-5 w-5 text-primary" />
                {title && (
                  <h3 className="text-base font-bold text-white truncate max-w-md">
                    {title}
                  </h3>
                )}
              </div>
              <button
                onClick={onClose}
                className="rounded-full border border-white/10 bg-white/5 p-2 text-white/70 hover:bg-white/10 hover:text-white transition"
                aria-label="Close trailer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Video Player iFrame Container */}
            <div className="relative w-full aspect-video bg-black">
              {id ? (
             
                <iframe
                  src={`https://www.vidking.net/embed/movie/${id}?color=e50914&autoPlay=true`}
                  width="100%"
                  height="600"
                  allowFullScreen
                >
                  {" "}
                </iframe>
              ) : (
                <div className="flex h-full w-full items-center justify-center text-white/50">
                  Trailer currently unavailable.
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default VideoModal;
