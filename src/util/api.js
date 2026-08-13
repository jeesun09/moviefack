import { bannerMovies as fallbackMovies } from "../components/movieData.js";
import { normalizeTmdbMovie, TMDB_ACCESS_TOKEN, TMDB_API_KEY, TMDB_BASE_URL } from "../app/constants/config.js";



const getCleanKey = () => (TMDB_API_KEY ? TMDB_API_KEY.trim().replace(/^['"]|['"]$/g, "") : "");
const getCleanToken = () => (TMDB_ACCESS_TOKEN ? TMDB_ACCESS_TOKEN.trim().replace(/^['"]|['"]$/g, "") : "");

export const getFeaturedMovies = async () => {
  if (typeof window === "undefined") {
    try {
      const apiKey = getCleanKey();
      const token = getCleanToken();
      const url = new URL(`${TMDB_BASE_URL}/trending/movie/week`);
      if (apiKey) url.searchParams.set("api_key", apiKey);

      const headers = { "Content-Type": "application/json" };
      if (token && !apiKey) headers.Authorization = `Bearer ${token}`;

      const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data?.results) && data.results.length) {
          return data.results.map(normalizeTmdbMovie);
        }
      }
    } catch (error) {
      console.error("Server-side getFeaturedMovies error:", error);
    }
    return fallbackMovies.map(normalizeTmdbMovie);
  }

  try {
    const response = await fetch("/api/featured-movies", { cache: "no-store" });
    if (!response.ok) {
      return fallbackMovies.map(normalizeTmdbMovie);
    }

    const data = await response.json();
    return Array.isArray(data) && data.length
      ? data.map(normalizeTmdbMovie)
      : fallbackMovies.map(normalizeTmdbMovie);
  } catch (error) {
    console.error("Client-side getFeaturedMovies error:", error);
    return fallbackMovies.map(normalizeTmdbMovie);
  }
};

export const getFeaturedActionMovies = async (id = 28) => {
  if (typeof window === "undefined") {
    try {
      const apiKey = getCleanKey();
      const token = getCleanToken();
      const url = new URL(`${TMDB_BASE_URL}/discover/movie?with_genres=${id}`);
      if (apiKey) url.searchParams.set("api_key", apiKey);

      const headers = { "Content-Type": "application/json" };
      if (token && !apiKey) headers.Authorization = `Bearer ${token}`;

      const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data?.results) && data.results.length) {
          return data.results.map(normalizeTmdbMovie);
        }
      }
    } catch (error) {
      console.error("Server-side getFeaturedActionMovies error:", error);
    }
    return fallbackMovies.map(normalizeTmdbMovie);
  }

  try {
    const response = await fetch(`/api/featured-genre?genreId=${id}`, { cache: "no-store" });
    if (!response.ok) {
      return fallbackMovies.map(normalizeTmdbMovie);
    }

    const data = await response.json();
    return Array.isArray(data) && data.length
      ? data.map(normalizeTmdbMovie)
      : fallbackMovies.map(normalizeTmdbMovie);
  } catch (error) {
    console.error("Client-side getFeaturedActionMovies error:", error);
    return fallbackMovies.map(normalizeTmdbMovie);
  }
};
