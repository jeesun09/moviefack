"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Share2, X, Link2, Check, CheckCircle2 } from "lucide-react";

export default function ShareFloatingMenu({ title = "Movie", url = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const menuRef = useRef(null);

  const shareUrl =
    url || (typeof window !== "undefined" ? window.location.href : "");
  const shareTitle = `Watch ${title} on MUVI Cinema`;

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 2800);
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      showToast("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleWhatsApp = () => {
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      `${shareTitle} - ${shareUrl}`,
    )}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setIsOpen(false);
    showToast("Opening WhatsApp...");
  };

  const handleFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl,
    )}`;
    window.open(facebookUrl, "_blank", "noopener,noreferrer");
    setIsOpen(false);
    showToast("Opening Facebook...");
  };

  const handleInstagram = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      showToast("Link copied! Paste into your Instagram Story or Bio.");
    }
    window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  // Radial positions placed evenly in a circle arc around the center trigger button (Radius = 66px)
  const shareOptions = [
    {
      id: "copylink",
      label: copied ? "Copied!" : "Copy Link",
      onClick: handleCopyLink,
      bg: copied
        ? "bg-emerald-500 shadow-[0_4px_20px_rgba(16,185,129,0.6)]"
        : "bg-primary shadow-[0_4px_20px_rgba(255,59,48,0.6)]",
      icon: copied ? (
        <Check className="h-4 w-4" />
      ) : (
        <Link2 className="h-4 w-4" />
      ),
      x: 48,
      y: -48,
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      onClick: handleWhatsApp,
      bg: "bg-[#25D366] shadow-[0_4px_20px_rgba(37,211,102,0.55)]",
      icon: (
        <svg
          className="h-4.5 w-4.5 fill-current"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      ),
      x: 0,
      y: -68,
    },
    {
      id: "facebook",
      label: "Facebook",
      onClick: handleFacebook,
      bg: "bg-[#1877F2] shadow-[0_4px_20px_rgba(24,119,242,0.55)]",
      icon: (
        <svg
          className="h-4.5 w-4.5 fill-current"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      x: -48,
      y: -48,
    },
    {
      id: "instagram",
      label: "Instagram",
      onClick: handleInstagram,
      bg: "bg-gradient-to-tr from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] shadow-[0_4px_20px_rgba(220,39,67,0.55)]",
      icon: (
        <svg
          className="h-4.5 w-4.5 fill-current"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      x: -68,
      y: 0,
    },
  ];

  return (
    <div className="relative inline-flex items-center justify-center" ref={menuRef}>
      {/* Floating Circular / Radial Action Icons */}
      <AnimatePresence>
        {isOpen && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
            {shareOptions.map((opt, index) => (
              <motion.div
                key={opt.id}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: opt.x,
                  y: opt.y,
                }}
                exit={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 24,
                  delay: index * 0.03,
                }}
                className="absolute flex items-center justify-center pointer-events-auto group"
              >
                <button
                  type="button"
                  onClick={opt.onClick}
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:scale-115 active:scale-90 cursor-pointer ${opt.bg}`}
                  title={opt.label}
                  aria-label={opt.label}
                >
                  {opt.icon}
                </button>

                {/* Floating Tooltip */}
                <span className="pointer-events-none absolute -top-7 whitespace-nowrap rounded-lg border border-white/10 bg-black/90 px-2 py-0.5 text-[9px] font-bold text-white opacity-0 group-hover:opacity-100 transition shadow-xl">
                  {opt.label}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Center Trigger Share Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`relative z-40 flex h-11 w-11 items-center justify-center rounded-full border text-white backdrop-blur-md transition duration-300 cursor-pointer ${
          isOpen
            ? "border-primary bg-primary text-white shadow-[0_0_25px_rgba(255,59,48,0.7)] scale-105"
            : "border-white/20 bg-white/10 hover:border-white/40 hover:bg-white/20 hover:scale-105"
        }`}
        title={isOpen ? "Close Share" : "Share"}
        aria-label="Share movie or series"
      >
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          {isOpen ? <X className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
        </motion.div>
      </button>

      {/* Toast Feedback Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[999999] flex items-center gap-2.5 rounded-2xl border border-white/20 bg-black/90 px-4 py-3 text-xs font-semibold text-white shadow-[0_10px_35px_rgba(0,0,0,0.8)] backdrop-blur-xl animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
