import {
  normalizeTmdbMovie,
  TMDB_ACCESS_TOKEN,
  TMDB_API_KEY,
  TMDB_BASE_URL,
} from "@/constants/config";
import { bannerMovies as fallbackMovies } from "@/components/movieData";
import { NextResponse } from "next/server";

const apiKey = TMDB_API_KEY
  ? TMDB_API_KEY.trim().replace(/^['"]|['"]$/g, "")
  : "";
const token = TMDB_ACCESS_TOKEN
  ? TMDB_ACCESS_TOKEN.trim().replace(/^['"]|['"]$/g, "")
  : "";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const genreId = searchParams.get("genreId");
  const language = searchParams.get("language");
  const sortBy = searchParams.get("sortBy") || "popularity.desc";
  const page = searchParams.get("page") || "1";

  try {
    const url = new URL(`${TMDB_BASE_URL}/discover/movie`);
    url.searchParams.set("sort_by", sortBy);
    url.searchParams.set("page", page);
    url.searchParams.set("vote_count.gte", "3");

    if (genreId && genreId !== "all") {
      url.searchParams.set("with_genres", genreId);
    }
    if (language && language !== "all") {
      url.searchParams.set("with_original_language", language);
    }

    if (apiKey) {
      url.searchParams.set("api_key", apiKey);
    }

    const headers = {
      "Content-Type": "application/json",
    };

    if (token && !apiKey) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url.toString(), {
      headers,
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`TMDB request failed with ${response.status}`);
    }

    const data = await response.json();
    const results = Array.isArray(data?.results) ? data.results : [];

    return NextResponse.json(
      {
        results: results.map(normalizeTmdbMovie),
        page: data.page || Number(page),
        totalPages: data.total_pages || 1,
        totalResults: data.total_results || results.length,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Movies discover proxy failed:", error);
    return NextResponse.json(
      {
        results: fallbackMovies.map(normalizeTmdbMovie),
        page: 1,
        totalPages: 1,
        totalResults: fallbackMovies.length,
      },
      { status: 200 },
    );
  }
}
