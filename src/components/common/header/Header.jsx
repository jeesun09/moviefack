"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { LOGO, M } from "@/app/constants/images";
import {
  Menu, Search, User, X,
  Home, Film, Tv, Bookmark, Radio, Settings, LogIn, ChevronRight,
} from "lucide-react";

const menus = [
  { name: "Home",     href: "/",        icon: Home     },
  { name: "Movies",   href: "/movies",  icon: Film     },
  { name: "TV Shows", href: "/tv-shows",icon: Tv       },
  { name: "Series",   href: "/series",  icon: Radio    },
  { name: "My List",  href: "/my-list", icon: Bookmark },
];

const navContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.3 } },
};

const navItem = {
  hidden: { opacity: 0, y: -12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 22 },
  },
};

const panelVariants = {
  hidden: { opacity: 0, scale: 0.95, y: -10 },
  show: {
    opacity: 1, scale: 1, y: 0,
    transition: { type: "spring", stiffness: 280, damping: 26 },
  },
  exit: {
    opacity: 0, scale: 0.95, y: -10,
    transition: { duration: 0.18, ease: "easeInOut" },
  },
};

const panelItemVariants = {
  hidden: { opacity: 0, x: -12 },
  show: (i) => ({
    opacity: 1, x: 0,
    transition: { delay: i * 0.055 + 0.1, type: "spring", stiffness: 300, damping: 24 },
  }),
};

const Header = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isHidden,   setIsHidden]   = React.useState(false);
  const [menuOpen,   setMenuOpen]   = React.useState(false);
  const lastScrollY = React.useRef(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 10);
      setIsHidden(currentY > lastScrollY.current && currentY > 60);
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: isHidden && !menuOpen ? "-110%" : 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 26 }}
        className="w-full h-max flex justify-center fixed z-50 px-4 pt-5"
      >
        {/* ── Desktop nav ── */}
        <div className="hidden max-w-[1600px] gap-5 md:flex justify-between items-center">
          {/* pill nav */}
          <div className={`flex items-center w-max py-1.5 px-2.5 backdrop-blur-xl gap-5 rounded-full ${isScrolled ? "activeNav" : ""}`}>
            <motion.div whileHover={{ rotate: 360, scale: 1.1 }} transition={{ duration: 0.55, ease: "easeInOut" }}>
              <Link href="/" className="w-10 h-10 p-2 border border-primary bg-background/80 rounded-full flex items-center justify-center">
                <Image src={M} alt="logo" unoptimized width={1000} height={1000} className="w-full h-full object-contain" />
              </Link>
            </motion.div>
            <motion.div variants={navContainer} initial="hidden" animate="show" className="flex items-center gap-3">
              {menus.map((menu) => (
                <motion.div key={menu.name} variants={navItem} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
                  <Link href={menu.href} className="text-[16px] px-2 py-1 font-bold text-text transition-colors duration-200 hover:text-primary hover:bg-background/80 rounded-full block">
                    {menu.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
          {/* action buttons */}
          <div className={`flex items-center py-1.5 px-2.5 backdrop-blur-xl gap-2 rounded-full ${isScrolled ? "activeNav" : ""}`}>
            <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.85 }} className="w-8 h-8 flex items-center justify-center group rounded-lg bg-background" aria-label="Search">
              <Search className="w-4 h-4 text-text transition-colors group-hover:text-primary" />
            </motion.button>
            <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.85 }}  className="w-8 h-8 flex items-center justify-center group rounded-lg bg-background" aria-label="Menu">
              <User className="w-4 h-4 text-text transition-colors group-hover:text-primary" />
            </motion.button>
          </div>
        </div>

        {/* ── Mobile top bar ── */}
        <div className={`flex md:hidden items-stretch justify-between w-full py-1.5 px-2 backdrop-blur-xl gap-5 rounded-full transition-colors duration-300 ${isScrolled ? "bg-background/40" : "bg-background/20"}`}>
          <Link href="/" className="w-25 h-full py-1 px-2 rounded-full bg-background flex items-center justify-center">
            <Image src={LOGO} alt="logo" unoptimized width={100} height={100} className="w-full h-full object-contain" />
          </Link>
          <div className="flex items-center gap-2">
            <motion.button whileTap={{ scale: 0.85 }} className="w-8 h-8 flex items-center justify-center group rounded-lg bg-background" aria-label="Profile">
              <User className="w-4 h-4 text-text transition-colors group-hover:text-primary" />
            </motion.button>
            <motion.button whileTap={{ scale: 0.85 }} onClick={() => setMenuOpen((v) => !v)} className="w-8 h-8 flex items-center justify-center group rounded-lg bg-background" aria-label="Open menu">
               {menuOpen ? (
                <X className="w-4 h-4 text-text transition-colors group-hover:text-primary" />
              ) : (
                <Menu className="w-4 h-4 text-text transition-colors group-hover:text-primary" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* ── Floating menu panel ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* panel */}
            <motion.div
              key="panel"
              variants={panelVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="fixed top-18 right-4 z-70 w-72 rounded-2xl bg-background/40 backdrop-blur-2xl border border-border/40 overflow-hidden shadow-md origin-top-right"
            >
              {/* user section */}
              <div className="flex items-center gap-3 px-4 py-4 border-b border-border/30">
                <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center border border-border/50 shrink-0">
                  <User className="w-5 h-5 text-text-muted" />
                </div>
                <div className="flex flex-col">
                  <span className="text-text font-semibold text-sm leading-tight">Guest</span>
                  <span className="text-text-muted text-xs">Not signed in</span>
                </div>
              </div>

              {/* search row */}
              <motion.button
                custom={0}
                variants={panelItemVariants}
                initial="hidden"
                animate="show"
                whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                className="w-full flex items-center gap-3 px-4 py-3 border-b border-border transition-colors"
              >
                <Search className="w-4 h-4 text-text-muted" />
                <span className="text-text text-[15px] font-medium flex-1 text-left">Search</span>
                <ChevronRight className="w-4 h-4 text-text-muted" />
              </motion.button>

              {/* nav links */}
              <div className="py-1">
                {menus.map((menu, i) => {
                  const Icon = menu.icon;
                  return (
                    <motion.div key={menu.name} custom={i + 1} variants={panelItemVariants} initial="hidden" animate="show">
                      <Link
                        href={menu.href}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors group"
                      >
                        <Icon className="w-4 h-4 text-text-muted group-hover:text-primary transition-colors" />
                        <span className="text-text/50 text-[15px] font-medium flex-1">{menu.name}</span>
                        <ChevronRight className="w-4 h-4 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* bottom actions */}
              <div className="border-t border-border/30 py-1">
                <motion.div custom={menus.length + 1} variants={panelItemVariants} initial="hidden" animate="show">
                  <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors group">
                    <Settings className="w-4 h-4 text-text-muted group-hover:text-primary transition-colors" />
                    <span className="text-text text-[15px] font-medium flex-1 text-left">Settings</span>
                    <ChevronRight className="w-4 h-4 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </motion.div>
                <motion.div custom={menus.length + 2} variants={panelItemVariants} initial="hidden" animate="show">
                  <Link
                    href="/sign-in"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors group"
                  >
                    <LogIn className="w-4 h-4 text-primary" />
                    <span className="text-primary text-[15px] font-semibold flex-1">Sign in / Create account</span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
