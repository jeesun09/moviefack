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
  const lang = searchParams.get("lang") || "hi";
  const sortBy = searchParams.get("sortBy") || "popularity.desc";
  const page = searchParams.get("page") || "1";

  try {
    const url = new URL(
      `${TMDB_BASE_URL}/discover/movie?with_original_language=${encodeURIComponent(
        lang,
      )}&sort_by=${sortBy}&vote_count.gte=5&page=${page}`,
    );

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
      throw new Error(`TMDB request failed with status: ${response.status}`);
    }

    const data = await response.json();
    const results = Array.isArray(data?.results) ? data.results : [];

    return NextResponse.json(
      results.length
        ? results.map(normalizeTmdbMovie)
        : fallbackMovies.map(normalizeTmdbMovie),
      { status: 200 },
    );
  } catch (error) {
    console.error("TMDB featured-language proxy failed:", error);
    return NextResponse.json(fallbackMovies.map(normalizeTmdbMovie), {
      status: 200,
    });
  }
}
