"use client";

import Image from "next/image";
import Link from "next/link";
import { M } from "@/app/constants/images";
import {
  Globe,
  Sparkles,
  Share2,
  Send,
} from "lucide-react";

const footerLinks = {
  navigation: [
    { name: "Home", href: "/" },
    { name: "Movies", href: "/movies" },
    { name: "TV Shows", href: "/tv-shows" },
    { name: "Series", href: "/series" },
    { name: "My List", href: "/my-list" },
  ],
  genres: [
    { name: "Action & Blockbusters", href: "/#action" },
    { name: "Epic Adventures", href: "/#adventure" },
    { name: "Animation & Family", href: "/#animation" },
    { name: "Comedy & Laughs", href: "/#comedy" },
    { name: "Sci-Fi & Cyberpunk", href: "/#scifi" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Cookie Preferences", href: "#" },
    { name: "Help Center", href: "#" },
  ],
};

const Footer = () => {
  return (
    <footer className="relative w-full border-t border-white/10 bg-[#0a0a0a] text-text">
      {/* Background Decorative Glow */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-64 w-[600px] rounded-full bg-primary/5 blur-[120px]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-5 pt-16 pb-12 sm:px-8 lg:px-12">
        {/* Main Grid Section */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          {/* Brand Column (Col 1-4) */}
          <div className="space-y-5 lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/40 bg-surface/80 p-2 shadow-[0_0_20px_rgba(255,59,48,0.25)] transition duration-300 group-hover:scale-105">
                <Image
                  src={M}
                  alt="MUVI logo"
                  unoptimized
                  width={40}
                  height={40}
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="text-2xl font-black tracking-widest text-white">
                MUVI
              </span>
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-white/60">
              Stream the latest trending movies, blockbuster hits, and exclusive series in HD. Your ultimate destination for cinema and entertainment.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#"
                aria-label="Share"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition duration-300 hover:border-primary hover:bg-primary hover:text-white"
              >
                <Share2 className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Send"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition duration-300 hover:border-primary hover:bg-primary hover:text-white"
              >
                <Send className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Globe"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition duration-300 hover:border-primary hover:bg-primary hover:text-white"
              >
                <Globe className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation (Col 5-6) */}
          <div className="space-y-4 lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-white">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/60 transition duration-200 hover:text-primary"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Genres (Col 7-9) */}
          <div className="space-y-4 lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-white">
              Popular Genres
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.genres.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/60 transition duration-200 hover:text-primary"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / App Info (Col 10-12) */}
          <div className="space-y-4 lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-white">
              Stay Connected
            </h3>
            <p className="text-xs leading-relaxed text-white/60">
              Get notified about new releases and trending cinema directly in your inbox.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Enter email..."
                className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white placeholder-white/40 focus:border-primary focus:outline-none"
              />
              <button
                type="submit"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white transition hover:bg-primary-hover"
                aria-label="Subscribe"
              >
                <Sparkles className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Bottom Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs text-white/50">
          <p>© {new Date().getFullYear()} MUVI Cinema. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-6">
            {footerLinks.legal.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="transition duration-200 hover:text-white"
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-1.5 text-white/60">
            <Globe className="h-3.5 w-3.5" />
            <span>English (US)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;