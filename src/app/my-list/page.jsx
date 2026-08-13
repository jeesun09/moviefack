"use client";

import { useAuth } from "@/context/AuthContext";
import MovieCard from "@/components/shared/MovieCard";
import Link from "next/link";
import { Bookmark, UserPlus, LogIn, Film } from "lucide-react";

export default function MyListPage() {
  const { user, wishlist } = useAuth();

  return (
    <div className="min-h-screen w-full bg-background lg:pt-50 pt-25 pb-20 text-text px-4 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1920px] space-y-4 text-center flex flex-col justify-center items-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 backdrop-blur-md">
          <Bookmark className="h-4 w-4 text-primary fill-primary" />
          <span className="text-xs font-semibold uppercase tracking-widest text-white">
            Personal Collection
          </span>
        </div>
        <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl text-white tracking-tight">
          My Saved Wishlist
        </h1>
        <p className="max-w-2xl text-sm sm:text-base text-white/60">
          Your personal library of saved movies and series to watch whenever you want.
        </p>
      </div>

      <div className="mx-auto max-w-[1920px] pt-10">
        {user ? (
          wishlist.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-6">
              {wishlist.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center space-y-4 rounded-3xl border border-white/10 bg-white/[0.02] p-8">
              <Film className="h-12 w-12 text-white/30 mx-auto" />
              <h3 className="text-xl font-bold text-white">Your Wishlist is Empty</h3>
              <p className="text-sm text-white/60 max-w-md mx-auto">
                Explore our catalog and click the bookmark button on any movie card to save it here.
              </p>
              <Link
                href="/movies"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-xs font-bold text-white shadow-[0_0_20px_rgba(255,59,48,0.4)] transition hover:bg-primary-hover"
              >
                Browse Movies
              </Link>
            </div>
          )
        ) : (
          /* Guest Empty State */
          <div className="py-20 text-center space-y-6 rounded-3xl border border-white/10 bg-surface/80 p-8 sm:p-12 shadow-[0_20px_70px_rgba(0,0,0,0.5)] max-w-xl mx-auto backdrop-blur-xl">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/40 bg-primary/10 text-primary mx-auto shadow-[0_0_30px_rgba(255,59,48,0.3)]">
              <Bookmark className="h-8 w-8 fill-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-white">
                Account Required for Wishlist
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Create a free account or sign in to save movies to your wishlist and access them anytime on any device.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/sign-up"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-xs font-bold text-white shadow-[0_0_25px_rgba(255,59,48,0.4)] transition hover:bg-primary-hover"
              >
                <UserPlus className="h-4 w-4" />
                <span>Create Account</span>
              </Link>
              <Link
                href="/sign-in"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3 text-xs font-bold text-white transition hover:bg-white/10"
              >
                <LogIn className="h-4 w-4" />
                <span>Sign In</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
