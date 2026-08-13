import { NextResponse } from "next/server";
import { bannerMovies as fallbackMovies } from "@/components/movieData";
import { normalizeTmdbMovie, TMDB_ACCESS_TOKEN, TMDB_API_KEY, TMDB_BASE_URL } from "@/app/constants/config";

const apiKey = TMDB_API_KEY ? TMDB_API_KEY.trim().replace(/^['"]|['"]$/g, "") : "";
const token = TMDB_ACCESS_TOKEN ? TMDB_ACCESS_TOKEN.trim().replace(/^['"]|['"]$/g, "") : "";

export async function GET() {
  try {
    const url = new URL(`${TMDB_BASE_URL}/trending/movie/week`);
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


