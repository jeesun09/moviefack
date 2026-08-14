"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { M } from "@/constants/images";
import { LogIn, Mail, Lock, ArrowRight, Sparkles } from "lucide-react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    login(email, password);
    router.push("/");
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#080808] px-4 py-24 text-text overflow-hidden">
      {/* Background Decorative Glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[140px]"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-md space-y-8 rounded-3xl border border-white/10 bg-surface/80 p-8 shadow-[0_25px_80px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
        {/* Header Branding */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/40 bg-surface/90 p-2.5 shadow-[0_0_25px_rgba(255,59,48,0.3)] transition duration-300 group-hover:scale-105">
              <Image
               loading="lazy"
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

          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Welcome Back
          </h1>
          <p className="text-xs sm:text-sm text-white/60">
            Sign in to access your saved movies, watchlist, and personalized
            recommendations.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 pt-2">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-white/70">
              Email Address
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-4 h-4 w-4 text-white/40" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full rounded-2xl border border-white/10 bg-white/5 pl-11 pr-4 py-3 text-sm text-white placeholder-white/40 focus:border-primary focus:outline-none transition"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-white/70">
                Password
              </label>
              <a href="#" className="text-xs text-primary hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative flex items-center">
              <Lock className="absolute left-4 h-4 w-4 text-white/40" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-2xl border border-white/10 bg-white/5 pl-11 pr-4 py-3 text-sm text-white placeholder-white/40 focus:border-primary focus:outline-none transition"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 text-xs text-white/70 cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="rounded border-white/20 bg-white/5 text-primary focus:ring-0"
              />
              <span>Remember me</span>
            </label>
          </div>

          <button
            type="submit"
            className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-sm font-bold text-white shadow-[0_0_30px_rgba(255,59,48,0.4)] transition hover:bg-primary-hover hover:shadow-[0_0_40px_rgba(255,59,48,0.6)]"
          >
            <LogIn className="h-4 w-4" />
            <span>Sign In</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </form>

        {/* Footer Navigation */}
        <div className="border-t border-white/10 pt-6 text-center text-xs text-white/60">
          <span>Don&apos;t have an account? </span>
          <Link
            href="/sign-up"
            className="font-bold text-primary hover:underline inline-flex items-center gap-1"
          >
            <span>Create an Account</span>
            <Sparkles className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
