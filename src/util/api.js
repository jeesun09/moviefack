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

export const getMoviesByLanguage = async (
  languageCode = "hi",
  sortBy = "popularity.desc",
  page = 1,
) => {
  if (typeof window === "undefined") {
    try {
      const apiKey = getCleanKey();
      const token = getCleanToken();
      const url = new URL(
        `${TMDB_BASE_URL}/discover/movie?with_original_language=${encodeURIComponent(
          languageCode,
        )}&sort_by=${sortBy}&vote_count.gte=5&page=${page}`,
      );
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
      console.error(
        `Server-side getMoviesByLanguage (${languageCode}) error:`,
        error,
      );
    }
    return fallbackMovies.map(normalizeTmdbMovie);
  }

  try {
    const response = await fetch(
      `/api/featured-language?lang=${encodeURIComponent(
        languageCode,
      )}&sortBy=${sortBy}&page=${page}`,
      { cache: "no-store" },
    );
    if (!response.ok) {
      return fallbackMovies.map(normalizeTmdbMovie);
    }

    const data = await response.json();
    return Array.isArray(data) && data.length
      ? data.map(normalizeTmdbMovie)
      : fallbackMovies.map(normalizeTmdbMovie);
  } catch (error) {
    console.error(
      `Client-side getMoviesByLanguage (${languageCode}) error:`,
      error,
    );
    return fallbackMovies.map(normalizeTmdbMovie);
  }
};

export const getTopRatedMovies = async (page = 1) => {
  if (typeof window === "undefined") {
    try {
      const apiKey = getCleanKey();
      const token = getCleanToken();
      const url = new URL(`${TMDB_BASE_URL}/movie/top_rated?page=${page}`);
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
      console.error("Server-side getTopRatedMovies error:", error);
    }
    return fallbackMovies.map(normalizeTmdbMovie);
  }

  try {
    const response = await fetch(`/api/featured-genre?genreId=top_rated`, {
      cache: "no-store",
    });
    if (!response.ok) return fallbackMovies.map(normalizeTmdbMovie);
    const data = await response.json();
    return Array.isArray(data) && data.length
      ? data.map(normalizeTmdbMovie)
      : fallbackMovies.map(normalizeTmdbMovie);
  } catch (error) {
    return fallbackMovies.map(normalizeTmdbMovie);
  }
};

export const getAllTimeFavourites = async (page = 1) => {
  if (typeof window === "undefined") {
    try {
      const apiKey = getCleanKey();
      const token = getCleanToken();
      const url = new URL(
        `${TMDB_BASE_URL}/discover/movie?sort_by=vote_average.desc&vote_count.gte=2500&page=${page}`,
      );
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
      console.error("Server-side getAllTimeFavourites error:", error);
    }
  }
  return getTopRatedMovies(page);
};

export const getTvShowsByLanguage = async (languageCode = "bn", page = 1) => {
  if (typeof window === "undefined") {
    try {
      const apiKey = getCleanKey();
      const token = getCleanToken();
      const url = new URL(
        `${TMDB_BASE_URL}/discover/tv?with_original_language=${encodeURIComponent(
          languageCode,
        )}&sort_by=popularity.desc&vote_count.gte=1&page=${page}`,
      );
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
      console.error(
        `Server-side getTvShowsByLanguage (${languageCode}) error:`,
        error,
      );
    }
    return fallbackMovies.map(normalizeTmdbMovie);
  }
  return fallbackMovies.map(normalizeTmdbMovie);
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

export const getActorMovies = async (personId = "5344", page = 1) => {
  if (typeof window === "undefined") {
    try {
      const apiKey = getCleanKey();
      const token = getCleanToken();
      const url = new URL(
        `${TMDB_BASE_URL}/discover/movie?with_cast=${personId}&sort_by=popularity.desc&page=${page}`,
      );
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
      console.error("getActorMovies error:", error);
    }
  }
  return fallbackMovies.map(normalizeTmdbMovie);
};

export const getMarvelMovies = async (page = 1) => {
  if (typeof window === "undefined") {
    try {
      const apiKey = getCleanKey();
      const token = getCleanToken();
      // Marvel Studios company ID is 420
      const url = new URL(
        `${TMDB_BASE_URL}/discover/movie?with_companies=420&sort_by=popularity.desc&page=${page}`,
      );
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
      console.error("getMarvelMovies error:", error);
    }
  }
  return fallbackMovies.map(normalizeTmdbMovie);
};

export const getSeries = async () => {
  return getTvShows(10759); // Action & Adventure Series
};

export const searchMovies = async (query, controller) => {
  if (!query || !query.trim()) return [];
  try {
    const apiKey = getCleanKey();
    const token = getCleanToken();
    const url = new URL(`${TMDB_BASE_URL}/search/multi`);
    url.searchParams.set("query", query.trim());
    if (apiKey) url.searchParams.set("api_key", apiKey);

    const headers = { "Content-Type": "application/json" };
    if (token && !apiKey) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(url.toString(), { cache: "no-store", signal: controller.signal });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data?.results) && data.results.length) {
        return data.results.map(normalizeTmdbMovie);
      }
    }
  } catch (error) {
    if (error.name === "AbortError") return [];
      console.log("searchMovies error:", error);
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
        return data.results.map((item) => normalizeTmdbMovie({ ...item, media_type: "movie" }));
      }
    }
  } catch (error) {
    console.error("getSimilarMovies error:", error);
  }
  return fallbackMovies.map(normalizeTmdbMovie);
};

// =====================================================
// TV SERIES & EPISODES API FUNCTIONS
// =====================================================

export const getSeriesDetails = async (id) => {
  try {
    const apiKey = getCleanKey();
    const token = getCleanToken();
    const url = new URL(`${TMDB_BASE_URL}/tv/${id}`);
    if (apiKey) url.searchParams.set("api_key", apiKey);

    const headers = { "Content-Type": "application/json" };
    if (token && !apiKey) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      const normalized = normalizeTmdbMovie({ ...data, media_type: "tv", isSeries: true });
      return {
        ...normalized,
        number_of_seasons: data.number_of_seasons || (data.seasons ? data.seasons.length : 1),
        number_of_episodes: data.number_of_episodes || 16,
        seasons: data.seasons || [
          { season_number: 1, name: "Season 1", episode_count: 8 },
          { season_number: 2, name: "Season 2", episode_count: 8 },
        ],
        genre: Array.isArray(data.genres) ? data.genres.map((g) => g.name) : normalized.genre,
      };
    }
  } catch (error) {
    console.error("getSeriesDetails error:", error);
  }

  // Fallback Mock Series (Reacher / House of Dragon style)
  const found = fallbackMovies.find((m) => String(m.id) === String(id));
  const base = found || fallbackMovies[0];

  return {
    ...normalizeTmdbMovie(base),
    id: id || base.id || 108978,
    isSeries: true,
    media_type: "tv",
    titleMain: base.titleMain || base.title || "REACHER",
    titleSub: base.titleSub || "",
    overview:
      base.description ||
      base.overview ||
      "Jack Reacher, a veteran military police investigator, enters civilian life with no ties and travels the country exploring the nation he once served, uncovering deep-rooted conspiracies.",
    vote_average: Number(base.rating) || 8.4,
    rating: base.rating || "8.4",
    year: base.year || "2024",
    release_date: "2024-02-04",
    number_of_seasons: 3,
    number_of_episodes: 24,
    backdrop_path:
      base.backdrop ||
      "https://image.tmdb.org/t/p/original/r013C8Me2bZ0pUi0OWJRh0h7MzT.jpg",
    poster_path:
      base.thumb ||
      "https://image.tmdb.org/t/p/w500/yihdXomYb5kTeSivtFndMy5iDmf.jpg",
    genre: ["Action", "Crime", "Drama", "Thriller"],
    seasons: [
      { season_number: 1, name: "Season 1", episode_count: 8 },
      { season_number: 2, name: "Season 2", episode_count: 8 },
      { season_number: 3, name: "Season 3", episode_count: 8 },
    ],
  };
};

export const getSeriesSeasonEpisodes = async (id, seasonNumber = 1) => {
  try {
    const apiKey = getCleanKey();
    const token = getCleanToken();
    const url = new URL(`${TMDB_BASE_URL}/tv/${id}/season/${seasonNumber}`);
    if (apiKey) url.searchParams.set("api_key", apiKey);

    const headers = { "Content-Type": "application/json" };
    if (token && !apiKey) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data?.episodes) && data.episodes.length > 0) {
        return data.episodes.map((ep) => ({
          id: ep.id,
          episode_number: ep.episode_number,
          season_number: ep.season_number || seasonNumber,
          name: ep.name || `Episode ${ep.episode_number}`,
          overview: ep.overview || "No overview available for this episode.",
          still_path: ep.still_path || null,
          runtime: ep.runtime ? `${ep.runtime} min` : "48 min",
          air_date: ep.air_date || "2024",
          vote_average: ep.vote_average || 8.0,
        }));
      }
    }
  } catch (error) {
    console.error("getSeriesSeasonEpisodes error:", error);
  }

  // Realistic Fallback Episode Playlists per Season
  const fallbackThumb = "https://image.tmdb.org/t/p/w500/r013C8Me2bZ0pUi0OWJRh0h7MzT.jpg";

  if (Number(seasonNumber) === 2) {
    return [
      {
        id: 201,
        episode_number: 1,
        season_number: 2,
        name: "ATM",
        runtime: "50 min",
        still_path: null,
        overview:
          "Reacher is pulled back into action when a member of his former U.S. Army 110th MP Special Investigations unit is mysteriously murdered.",
      },
      {
        id: 202,
        episode_number: 2,
        season_number: 2,
        name: "What Happens in Atlantic City",
        runtime: "48 min",
        still_path: null,
        overview:
          "The team travels to Atlantic City to track down a key witness in the conspiracy surrounding the defense contractor.",
      },
      {
        id: 203,
        episode_number: 3,
        season_number: 2,
        name: "Picture Says a Thousand Words",
        runtime: "52 min",
        still_path: null,
        overview:
          "Reacher and Neagley investigate a defense company with suspicious ties to illegal military hardware shipments.",
      },
      {
        id: 204,
        episode_number: 4,
        season_number: 2,
        name: "A Night at the Symphony",
        runtime: "51 min",
        still_path: null,
        overview:
          "A high-stakes undercover operation at an elite gala reveals powerful corrupt officials and dangerous new enemies.",
      },
      {
        id: 205,
        episode_number: 5,
        season_number: 2,
        name: "Burial",
        runtime: "55 min",
        still_path: null,
        overview:
          "With tension rising to breaking point, Reacher and the team prepare for a deadly ambush in the mountains.",
      },
      {
        id: 206,
        episode_number: 6,
        season_number: 2,
        name: "New York's Finest",
        runtime: "49 min",
        still_path: null,
        overview:
          "Reacher makes a risky deal with NYPD detectives to secure evidence before the mercenary hit squad arrives.",
      },
      {
        id: 207,
        episode_number: 7,
        season_number: 2,
        name: "The Man Goes Through",
        runtime: "53 min",
        still_path: null,
        overview:
          "Reacher sets a trap to rescue hostages and force the mastermind behind the murders into the open.",
      },
      {
        id: 208,
        episode_number: 8,
        season_number: 2,
        name: "Fly Boy",
        runtime: "56 min",
        still_path: null,
        overview:
          "Reacher launches an explosive final assault on the conspirators' helicopter base to settle the score once and for all.",
      },
    ];
  }

  if (Number(seasonNumber) === 3) {
    return [
      {
        id: 301,
        episode_number: 1,
        season_number: 3,
        name: "Persuader",
        runtime: "54 min",
        still_path: null,
        overview:
          "Reacher goes undercover into a fortress estate on the Maine coast to rescue an informant trapped inside.",
      },
      {
        id: 302,
        episode_number: 2,
        season_number: 3,
        name: "Cold Harbor",
        runtime: "52 min",
        still_path: null,
        overview:
          "Deep inside the estate, Reacher must navigate high-tech surveillance while trying to gain the trust of his target.",
      },
      {
        id: 303,
        episode_number: 3,
        season_number: 3,
        name: "Eye for an Eye",
        runtime: "49 min",
        still_path: null,
        overview:
          "A deadly game of cat and mouse unfolds as an old adversary threatens to expose Reacher's real identity.",
      },
      {
        id: 304,
        episode_number: 4,
        season_number: 3,
        name: "Shadow of the Dock",
        runtime: "50 min",
        still_path: null,
        overview:
          "Night falls over Cold Harbor as a clandestine shipment arrives, forcing Reacher into immediate action.",
      },
    ];
  }

  // Season 1 Fallback List (matching reference image!)
  return [
    {
      id: 101,
      episode_number: 1,
      season_number: 1,
      name: "Welcome to Margrave",
      runtime: "54 min",
      still_path: fallbackThumb,
      overview:
        "Reacher is wrongly accused of murder while visiting the small town of Margrave, GA.",
    },
    {
      id: 102,
      episode_number: 2,
      season_number: 1,
      name: "First Dance",
      runtime: "53 min",
      still_path: null,
      overview:
        "When more victims are discovered, Reacher attempts to get answers but is set up. Roscoe receives a threatening message.",
    },
    {
      id: 103,
      episode_number: 3,
      season_number: 1,
      name: "Spoonful",
      runtime: "47 min",
      still_path: null,
      overview:
        "Reacher and Finlay's investigation into the missing Spivey leads them into a confrontation with Kliner Sr. Roscoe learns unsettling info.",
    },
    {
      id: 104,
      episode_number: 4,
      season_number: 1,
      name: "In a Tree",
      runtime: "48 min",
      still_path: null,
      overview:
        "As the danger ratchets up, Reacher and Roscoe grow closer and make plans to meet their contact in Atlanta.",
    },
    {
      id: 105,
      episode_number: 5,
      season_number: 1,
      name: "No Apologies",
      runtime: "51 min",
      still_path: null,
      overview:
        "As the mystery deepens, Reacher teams up with an old colleague and Finlay makes a shocking discovery.",
    },
    {
      id: 106,
      episode_number: 6,
      season_number: 1,
      name: "Papier",
      runtime: "52 min",
      still_path: null,
      overview:
        "As the town unravels, Reacher sets a clever trap to expose the corrupt conspiracy at its core.",
    },
    {
      id: 107,
      episode_number: 7,
      season_number: 1,
      name: "Reacher Said Nothing",
      runtime: "49 min",
      still_path: null,
      overview:
        "Reacher leads a dangerous raid on the counterfeit ring's hidden warehouse.",
    },
    {
      id: 108,
      episode_number: 8,
      season_number: 1,
      name: "Pie",
      runtime: "55 min",
      still_path: null,
      overview:
        "Reacher executes a desperate rescue mission at the warehouse leading to an explosive final climax.",
    },
  ];
};

export const getSeriesVideos = async (id) => {
  try {
    const apiKey = getCleanKey();
    const token = getCleanToken();
    const url = new URL(`${TMDB_BASE_URL}/tv/${id}/videos`);
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
    console.error("getSeriesVideos error:", error);
  }
  return "dQw4w9WgXcQ";
};

export const getSeriesCredits = async (id) => {
  try {
    const apiKey = getCleanKey();
    const token = getCleanToken();
    const url = new URL(`${TMDB_BASE_URL}/tv/${id}/credits`);
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
    console.error("getSeriesCredits error:", error);
  }
  return [
    { id: 1, name: "Alan Ritchson", character: "Jack Reacher", profile_path: null },
    { id: 2, name: "Maria Sten", character: "Frances Neagley", profile_path: null },
    { id: 3, name: "Malcolm Goodwin", character: "Oscar Finlay", profile_path: null },
    { id: 4, name: "Willa Fitzgerald", character: "Roscoe Conklin", profile_path: null },
    { id: 5, name: "Serinda Swan", character: "Karla Dixon", profile_path: null },
  ];
};

export const getSimilarSeries = async (id) => {
  try {
    const apiKey = getCleanKey();
    const token = getCleanToken();
    const url = new URL(`${TMDB_BASE_URL}/tv/${id}/similar`);
    if (apiKey) url.searchParams.set("api_key", apiKey);

    const headers = { "Content-Type": "application/json" };
    if (token && !apiKey) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data?.results) && data.results.length) {
        return data.results.map((item) => normalizeTmdbMovie({ ...item, media_type: "tv", isSeries: true }));
      }
    }
  } catch (error) {
    console.error("getSimilarSeries error:", error);
  }
  return fallbackMovies.map((item) => normalizeTmdbMovie({ ...item, media_type: "tv", isSeries: true }));
};

