export const TMDB_ACCESS_TOKEN =
  process.env.TMDB_ACCESS_TOKEN ||
  process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN ||
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YThiMDUzMjU2OGM3Mjc5NTc5MDg5YmY2NzNjOTZhOCIsIm5iZiI6MTc4NjM2MzA5OC4zODcsInN1YiI6IjZhNzliY2RhZDYyNGEyMTJkMzkwZDZjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wc1lDrmfInbDA57CyFRrDsXMNLtvCpQEeGsORrEy9qk";

export const TMDB_API_KEY =
  process.env.TMDB_API_KEY ||
  process.env.NEXT_PUBLIC_TMDB_API_KEY ||
  "6a8b0532568c7279579089bf673c96a8";

export const TMDB_BASE_URL = "https://api.tmdb.org/3";



export const normalizeTmdbMovie = (movie) => {
  if (!movie || typeof movie !== "object") {
    return movie;
  }

  const titleMain = movie.titleMain || movie.title || movie.original_title || movie.name || movie.original_name || "Untitled";
  const titleSub = movie.titleSub || "";
  const fullTitle = titleSub ? `${titleMain} ${titleSub}`.trim() : titleMain;

  return {
    ...movie,
    id: movie.id || Math.random(),
    title: movie.title || fullTitle,
    original_title: movie.original_title || fullTitle,
    titleMain,
    titleSub,
    overview:
      movie.overview ||
      movie.description ||
      "Discover an unforgettable cinematic experience.",
    vote_average:
      typeof movie.vote_average === "number"
        ? movie.vote_average
        : Number(movie.rating || 0),
    release_date:
      movie.release_date ||
      (movie.year ? `${movie.year}-01-01` : "2026-01-01"),
    backdrop_path: movie.backdrop_path || movie.backdrop || "",
    poster_path: movie.poster_path || movie.thumb || "",
    genre: Array.isArray(movie.genre) ? movie.genre : ["Movie"],
  };
};

