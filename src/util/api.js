import { bannerMovies as fallbackMovies } from "../components/movieData.js";
import {
  normalizeTmdbMovie,
  TMDB_ACCESS_TOKEN,
  TMDB_API_KEY,
  TMDB_BASE_URL,
} from "../constants/config.js";

const getCleanKey = () =>
  TMDB_API_KEY ? TMDB_API_KEY.trim().replace(/^['"]|['"]$/g, "") : "";
const getCleanToken = () =>
  TMDB_ACCESS_TOKEN ? TMDB_ACCESS_TOKEN.trim().replace(/^['"]|['"]$/g, "") : "";

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
    const response = await fetch(`/api/featured-genre?genreId=${id}`, {
      cache: "no-store",
    });
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

export const getTvShows = async (genreId) => {
  if (typeof window !== "undefined") {
    try {
      const query = genreId ? `?genreId=${encodeURIComponent(genreId)}` : "";
      const response = await fetch(`/api/series${query}`, {
        cache: "no-store",
      });
      if (!response.ok) {
        return fallbackMovies.map(normalizeTmdbMovie);
      }

      const data = await response.json();
      return Array.isArray(data) && data.length
        ? data.map(normalizeTmdbMovie)
        : fallbackMovies.map(normalizeTmdbMovie);
    } catch (error) {
      console.error("Client-side getTvShows error:", error);
      return fallbackMovies.map(normalizeTmdbMovie);
    }
  }

  try {
    const apiKey = getCleanKey();
    const token = getCleanToken();
    const path = genreId
      ? `/discover/tv?with_genres=${genreId}`
      : `/trending/tv/week`;
    const url = new URL(`${TMDB_BASE_URL}${path}`);
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
    console.error("getTvShows error:", error);
  }
  return fallbackMovies.map(normalizeTmdbMovie);
};

export const getSeries = async () => {
  return getTvShows(10759); // Action & Adventure Series
};

export const searchMovies = async (query) => {
  if (!query || !query.trim()) return [];
  try {
    const apiKey = getCleanKey();
    const token = getCleanToken();
    const url = new URL(`${TMDB_BASE_URL}/search/multi`);
    url.searchParams.set("query", query.trim());
    if (apiKey) url.searchParams.set("api_key", apiKey);

    const headers = { "Content-Type": "application/json" };
    if (token && !apiKey) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(url.toString(), { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data?.results) && data.results.length) {
        return data.results.map(normalizeTmdbMovie);
      }
    }
  } catch (error) {
    console.error("searchMovies error:", error);
  }
  return fallbackMovies
    .filter((m) =>
      (m.titleMain || m.title || "")
        .toLowerCase()
        .includes(query.toLowerCase()),
    )
    .map(normalizeTmdbMovie);
};

export const getMovieDetails = async (id) => {
  try {
    const apiKey = getCleanKey();
    const token = getCleanToken();
    const url = new URL(`${TMDB_BASE_URL}/movie/${id}`);
    if (apiKey) url.searchParams.set("api_key", apiKey);

    const headers = { "Content-Type": "application/json" };
    if (token && !apiKey) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      return normalizeTmdbMovie(data);
    }
  } catch (error) {
    console.error("getMovieDetails error:", error);
  }
  const found = fallbackMovies.find((m) => String(m.id) === String(id));
  return normalizeTmdbMovie(found || fallbackMovies[0]);
};

export const getMovieVideos = async (id) => {
  try {
    const apiKey = getCleanKey();
    const token = getCleanToken();
    const url = new URL(`${TMDB_BASE_URL}/movie/${id}/videos`);
    if (apiKey) url.searchParams.set("api_key", apiKey);

    const headers = { "Content-Type": "application/json" };
    if (token && !apiKey) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data?.results)) {
        const trailer = data.results.find(
          (v) =>
            v.site === "YouTube" &&
            (v.type === "Trailer" || v.type === "Teaser"),
        );
        return trailer ? trailer.key : data.results[0]?.key || null;
      }
    }
  } catch (error) {
    console.error("getMovieVideos error:", error);
  }
  return "dQw4w9WgXcQ"; // Fallback YouTube key
};

export const getMovieCredits = async (id) => {
  try {
    const apiKey = getCleanKey();
    const token = getCleanToken();
    const url = new URL(`${TMDB_BASE_URL}/movie/${id}/credits`);
    if (apiKey) url.searchParams.set("api_key", apiKey);

    const headers = { "Content-Type": "application/json" };
    if (token && !apiKey) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data?.cast)) {
        return data.cast.slice(0, 12).map((member) => ({
          id: member.id,
          name: member.name,
          character: member.character,
          profile_path: member.profile_path,
        }));
      }
    }
  } catch (error) {
    console.error("getMovieCredits error:", error);
  }
  return [
    {
      id: 1,
      name: "Robert Downey Jr.",
      character: "Tony Stark / Iron Man",
      profile_path: null,
    },
    {
      id: 2,
      name: "Chris Evans",
      character: "Steve Rogers / Captain America",
      profile_path: null,
    },
    {
      id: 3,
      name: "Scarlett Johansson",
      character: "Natasha Romanoff / Black Widow",
      profile_path: null,
    },
    {
      id: 4,
      name: "Chris Hemsworth",
      character: "Thor Odinson",
      profile_path: null,
    },
    {
      id: 5,
      name: "Mark Ruffalo",
      character: "Bruce Banner / Hulk",
      profile_path: null,
    },
  ];
};

export const getSimilarMovies = async (id) => {
  try {
    const apiKey = getCleanKey();
    const token = getCleanToken();
    const url = new URL(`${TMDB_BASE_URL}/movie/${id}/similar`);
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
    console.error("getSimilarMovies error:", error);
  }
  return fallbackMovies.map(normalizeTmdbMovie);
};
