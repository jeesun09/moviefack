import { NextResponse } from "next/server";

import { bannerMovies as fallbackMovies } from "@/components/movieData";

const TMDB_ACCESS_TOKEN =
  process.env.TMDB_ACCESS_TOKEN ||
  process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN;
const TMDB_API_KEY =
  process.env.TMDB_API_KEY ||
  process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const normalizeTmdbMovie = (movie) => {
  if (!movie || typeof movie !== "object") {
    return movie;
  }

  const title =
    movie.title ||
    movie.original_title ||
    "Untitled";

  return {
    ...movie,
    title,
    original_title: movie.original_title || title,
    overview:
      movie.overview ||
      "Discover an unforgettable cinematic experience.",
    vote_average:
      typeof movie.vote_average === "number"
        ? movie.vote_average
        : 0,
    release_date: movie.release_date || "",
    backdrop_path: movie.backdrop_path || "",
    poster_path: movie.poster_path || "",
  };
};

export async function GET() {
  if (!TMDB_ACCESS_TOKEN && !TMDB_API_KEY) {
    return NextResponse.json(
      fallbackMovies.map(normalizeTmdbMovie),
      { status: 200 }
    );
  }

  try {
    const url = new URL(`${TMDB_BASE_URL}/trending/movie/week`);

    if (TMDB_API_KEY) {
      url.searchParams.set("api_key", TMDB_API_KEY);
    }

    const headers = {
      "Content-Type": "application/json",
    };

    if (TMDB_ACCESS_TOKEN && !TMDB_API_KEY) {
      headers.Authorization = `Bearer ${TMDB_ACCESS_TOKEN}`;
    }

    const response = await fetch(url, {
      headers,
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(
        `TMDB request failed with ${response.status}`
      );
    }

    const data = await response.json();
    const results = Array.isArray(data?.results)
      ? data.results
      : [];

    return NextResponse.json(
      results.length
        ? results.map(normalizeTmdbMovie)
        : fallbackMovies.map(normalizeTmdbMovie),
      { status: 200 }
    );
  } catch (error) {
    console.error("TMDB proxy request failed:", error);

    return NextResponse.json(
      fallbackMovies.map(normalizeTmdbMovie),
      { status: 200 }
    );
  }
}
