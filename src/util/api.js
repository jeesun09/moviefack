import { bannerMovies as fallbackMovies } from "../components/movieData.js";

const normalizeFallbackMovie = (movie) => {
  if (!movie || typeof movie !== "object") {
    return movie;
  }

  const title =
    movie.title ||
    movie.original_title ||
    movie.titleMain ||
    "Untitled";

  const titleMain = movie.titleMain || title;
  const description =
    movie.overview ||
    movie.description ||
    "Discover an unforgettable cinematic experience.";

  return {
    ...movie,
    title,
    original_title: movie.original_title || title,
    overview: description,
    vote_average:
      typeof movie.vote_average === "number"
        ? movie.vote_average
        : Number(movie.rating || 0),
    release_date:
      movie.release_date ||
      (movie.year ? `${movie.year}-01-01` : ""),
    backdrop_path:
      movie.backdrop_path ||
      movie.backdrop ||
      "",
    poster_path:
      movie.poster_path ||
      movie.thumb ||
      "",
    titleMain,
  };
};

export const getFeaturedMovies = async () => {
  const apiUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/api/featured-movies`
      : "http://localhost:3000/api/featured-movies";

  try {
    const response = await fetch(apiUrl, {
      cache: "no-store",
    });

    if (!response.ok) {
      return fallbackMovies.map(normalizeFallbackMovie);
    }

    const data = await response.json();
    return Array.isArray(data) && data.length
      ? data
      : fallbackMovies.map(normalizeFallbackMovie);
  } catch (error) {
    console.error(
      "Failed to fetch featured movies:",
      error
    );

    return fallbackMovies.map(normalizeFallbackMovie);
  }
};

// Get Action movies list
export const getFeaturedActionMovies = async (id) => {
  const apiUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/api/featured-genre?genreId=${id}`
      : `http://localhost:3000/api/featured-genre?genreId=${id}`;

  try {
    const response = await fetch(apiUrl, {
      cache: "no-store",
    });

    if (!response.ok) {
      return fallbackMovies.map(normalizeFallbackMovie);
    }

    const data = await response.json();
    return Array.isArray(data) && data.length
      ? data
      : fallbackMovies.map(normalizeFallbackMovie);
  } catch (error) {
    console.error("Failed to fetch featured movies:", error);

    return fallbackMovies.map(normalizeFallbackMovie);
  }
}