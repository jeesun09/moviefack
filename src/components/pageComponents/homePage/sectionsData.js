import { bannerMovies } from "@/components/movieData";

const shuffle = (items) =>
  [...items].sort(() => 0.5 - Math.random());

const selectMovies = (items, limit = 12) =>
  items.slice(0, limit);

const thrillerMovies = bannerMovies.filter((movie) =>
  movie.genre?.includes("Thriller")
);

const familyMovies = bannerMovies.filter((movie) =>
  movie.genre?.includes("Family")
);

const actionMovies = bannerMovies.filter((movie) =>
  movie.genre?.includes("Action")
);

const sciFiMovies = bannerMovies.filter((movie) =>
  movie.genre?.includes("Sci-Fi")
);

const horrorMovies = bannerMovies.filter((movie) =>
  movie.genre?.includes("Horror")
);

const animationMovies = bannerMovies.filter((movie) =>
  movie.genre?.includes("Animation")
);

const adventureMovies = bannerMovies.filter((movie) =>
  movie.genre?.includes("Adventure")
);

const dramaMovies = bannerMovies.filter((movie) =>
  movie.genre?.includes("Drama")
);

export const homeSections = [
  {
    title: "Trending Movies",
    subtitle: "Top picks for your next watch.",
    movies: selectMovies(shuffle(bannerMovies), 12),
  },

  {
    title: "Popular Movies",
    subtitle: "Movies everyone is watching right now.",
    movies: selectMovies(shuffle(bannerMovies), 12),
  },

  {
    title: "Top Rated Movies",
    subtitle: "Highest scoring films by audience favorites.",
    movies: selectMovies(
      [...bannerMovies].sort(
        (a, b) => Number(b.rating) - Number(a.rating)
      ),
      12
    ),
  },

  {
    title: "Action & Adventure",
    subtitle: "Big worlds, bigger battles and unforgettable journeys.",
    movies: selectMovies(
      actionMovies.length ? shuffle(actionMovies) : shuffle(bannerMovies),
      12
    ),
  },

  {
    title: "Psychological Thrillers",
    subtitle: "Mind-bending stories with intense twists.",
    movies: selectMovies(
      thrillerMovies.length
        ? shuffle(thrillerMovies)
        : shuffle(bannerMovies),
      12
    ),
  },

  {
    title: "Sci-Fi Universe",
    subtitle: "Explore strange worlds, future technology and the unknown.",
    movies: selectMovies(
      sciFiMovies.length ? shuffle(sciFiMovies) : shuffle(bannerMovies),
      12
    ),
  },

  {
    title: "Horror Nights",
    subtitle: "Dark stories for those who love a good scare.",
    movies: selectMovies(
      horrorMovies.length ? shuffle(horrorMovies) : shuffle(bannerMovies),
      12
    ),
  },

  {
    title: "Family Picks",
    subtitle: "Heartfelt stories for every family movie night.",
    movies: selectMovies(
      familyMovies.length ? shuffle(familyMovies) : shuffle(bannerMovies),
      12
    ),
  },

  {
    title: "Animation Favorites",
    subtitle: "Colorful adventures for audiences of every age.",
    movies: selectMovies(
      animationMovies.length
        ? shuffle(animationMovies)
        : shuffle(bannerMovies),
      12
    ),
  },

  {
    title: "Drama Collection",
    subtitle: "Powerful performances and unforgettable stories.",
    movies: selectMovies(
      dramaMovies.length ? shuffle(dramaMovies) : shuffle(bannerMovies),
      12
    ),
  },

  {
    title: "Adventure Picks",
    subtitle: "Epic journeys waiting to be discovered.",
    movies: selectMovies(
      adventureMovies.length
        ? shuffle(adventureMovies)
        : shuffle(bannerMovies),
      12
    ),
  },
];