import { normalizeTmdbMovie, TMDB_ACCESS_TOKEN, TMDB_API_KEY, TMDB_BASE_URL } from "@/app/constants/config";
import { NextResponse } from "next/server";

export async function GET() {
  if (!TMDB_ACCESS_TOKEN && !TMDB_API_KEY) {
    return NextResponse.json(fallbackMovies.map(normalizeTmdbMovie), {
      status: 200,
    });
  }

  try {
    const url = new URL(`${TMDB_BASE_URL}/discover/movie?with_genres=28`);

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
      throw new Error(`TMDB request failed with ${response.status}`);
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
    console.error("TMDB proxy request failed:", error);

    return NextResponse.json(fallbackMovies.map(normalizeTmdbMovie), {
      status: 200,
    });
  }
}
