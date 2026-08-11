export const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN
export const TMDB_API_KEY = process.env.TMDB_API_KEY
export const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export const normalizeTmdbMovie = (movie) => {
  if (!movie || typeof movie !== "object") {
    return movie;
  }

  const title = movie.title || movie.original_title || "Untitled";

  return {
    ...movie,
    title,
    original_title: movie.original_title || title,
    overview:
      movie.overview || "Discover an unforgettable cinematic experience.",
    vote_average:
      typeof movie.vote_average === "number" ? movie.vote_average : 0,
    release_date: movie.release_date || "",
    backdrop_path: movie.backdrop_path || "",
    poster_path: movie.poster_path || "",
  };
};
