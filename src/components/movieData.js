const bannerMovies = [
  {
    id: 1,
    titleMain: "Obsession:",
    titleSub: "One Wish",
    description:
      "A desperate romantic gets exactly what he wishes for, only to discover that every desire comes with a dark and terrifying price.",
    rating: "8.3",
    year: "2026",
    runtime: "1h 42m",
    genre: ["Horror", "Thriller"],
    age: "16+",
    sessionTimes: ["13:20", "16:45", "19:30", "22:40"],
    backdrop:
      "https://image.tmdb.org/t/p/original/r013C8Me2bZ0pUi0OWJRh0h7MzT.jpg",
    thumb:
      "https://image.tmdb.org/t/p/w500/bRwnj8WEKBCvmfeUNOukJPwB43K.jpg",
    thumbLabel: "Obsession",
    thumbIndex: "01",
  },

  {
    id: 2,
    titleMain: "Toy Story",
    titleSub: "5",
    description:
      "Woody, Buzz and Jessie face their biggest challenge yet when a new piece of technology threatens to completely change playtime.",
    rating: "7.4",
    year: "2026",
    runtime: "1h 45m",
    genre: ["Animation", "Adventure", "Comedy"],
    age: "PG",
    sessionTimes: ["12:10", "15:00", "18:20", "21:10"],
    backdrop:
      "https://image.tmdb.org/t/p/original/qjTqY5coNiz6sVtPng40IzltsoN.jpg",
    thumb:
      "https://image.tmdb.org/t/p/w500/sfQtVlIHljToOwYjhe21KPGzZWK.jpg",
    thumbLabel: "Toy Story 5",
    thumbIndex: "02",
  },

  {
    id: 3,
    titleMain: "Moana:",
    titleSub: "Live Action",
    description:
      "Moana answers the call of the ocean and begins an extraordinary journey beyond the reef to save her people.",
    rating: "7.5",
    year: "2026",
    runtime: "1h 55m",
    genre: ["Adventure", "Fantasy", "Family"],
    age: "PG",
    sessionTimes: ["13:00", "16:15", "19:40", "22:15"],
    backdrop:
      "https://image.tmdb.org/t/p/original/mMkJq4dkQwfDieB9wRC9yPxDWv9.jpg",
    thumb:
      "https://image.tmdb.org/t/p/w500/zKVgiv5qHCvCLT4A2ymJi5QeXDH.jpg",
    thumbLabel: "Moana",
    thumbIndex: "03",
  },

  {
    id: 4,
    titleMain: "Backrooms:",
    titleSub: "The Unknown",
    description:
      "A strange doorway hidden beneath a furniture showroom leads a group of people into a terrifying world with no obvious way out.",
    rating: "7.0",
    year: "2026",
    runtime: "1h 51m",
    genre: ["Horror", "Mystery", "Sci-Fi"],
    age: "16+",
    sessionTimes: ["14:10", "17:35", "20:50", "23:30"],
    backdrop:
      "https://image.tmdb.org/t/p/original/dqmMWNWfLnExDRpMtIMqI97GQFR.jpg",
    thumb:
      "https://image.tmdb.org/t/p/w500/br10hK3TWoky1v7gw9jYwIfjDjv.jpg",
    thumbLabel: "Backrooms",
    thumbIndex: "04",
  },

  {
    id: 5,
    titleMain: "The",
    titleSub: "Odyssey",
    description:
      "Odysseus begins a perilous journey home after the Trojan War, facing gods, monsters and trials that test his courage and humanity.",
    rating: "7.8",
    year: "2026",
    runtime: "2h 58m",
    genre: ["Adventure", "Action", "Fantasy"],
    age: "PG-13",
    sessionTimes: ["12:30", "16:00", "19:45", "23:00"],
    backdrop:
      "https://image.tmdb.org/t/p/original/r57L2UBLPKcHdZQYg8tagv9XqK2.jpg",
    thumb:
      "https://image.tmdb.org/t/p/w500/5rhTDKUhPYvpdQIijFIs5VoWsON.jpg",
    thumbLabel: "The Odyssey",
    thumbIndex: "05",
  },

  {
    id: 6,
    titleMain: "Project",
    titleSub: "Hail Mary",
    description:
      "A lone astronaut wakes up light-years from Earth with no memory of his mission and discovers that humanity's survival depends on him.",
    rating: "8.7",
    year: "2026",
    runtime: "2h 16m",
    genre: ["Sci-Fi", "Adventure", "Drama"],
    age: "PG-13",
    sessionTimes: ["13:40", "17:10", "20:30", "23:20"],
    backdrop:
      "https://image.tmdb.org/t/p/original/8Tfys3mDZVp4tNoH2ktm06a0Tau.jpg",
    thumb:
      "https://image.tmdb.org/t/p/w500/gATQxXU9tPj2DwHARCIL9YpDym7.jpg",
    thumbLabel: "Project Hail Mary",
    thumbIndex: "06",
  },

  {
    id: 7,
    titleMain: "Evil Dead",
    titleSub: "Burn",
    description:
      "After a devastating loss, a woman seeks refuge with her in-laws only to discover that something demonic has taken over the family.",
    rating: "6.8",
    year: "2026",
    runtime: "1h 37m",
    genre: ["Horror", "Thriller"],
    age: "R",
    sessionTimes: ["15:15", "18:25", "21:20", "23:55"],
    backdrop:
      "https://image.tmdb.org/t/p/original/A5Tz6ogGt4VV8NESG9oWVct5bo1.jpg",
    thumb:
      "https://image.tmdb.org/t/p/w500/ztadKzIIR0ERYqpHteaPFtk7inP.jpg",
    thumbLabel: "Evil Dead Burn",
    thumbIndex: "07",
  },

  {
    id: 8,
    titleMain: "Spider-Man:",
    titleSub: "Brand New Day",
    description:
      "Peter Parker embraces a new life as Spider-Man, but a strange pattern of crimes threatens to pull him into a conflict unlike anything he has faced before.",
    rating: "8.2",
    year: "2026",
    runtime: "2h 16m",
    genre: ["Action", "Adventure", "Sci-Fi"],
    age: "PG-13",
    sessionTimes: ["12:50", "16:20", "19:35", "22:45"],
    backdrop:
      "https://image.tmdb.org/t/p/original/jenQoCLJ4FEfFGZS13op91jlxjy.jpg",
    thumb:
      "https://image.tmdb.org/t/p/w500/ucQ0QBXXQPSxeUmWfh4YQenIuB9.jpg",
    thumbLabel: "Spider-Man",
    thumbIndex: "08",
  },

  {
    id: 9,
    titleMain: "Is",
    titleSub: "God Is",
    description:
      "Two sisters embark on an intense quest for revenge, confronting a painful family history that pushes them beyond their limits.",
    rating: "7.2",
    year: "2026",
    runtime: "1h 48m",
    genre: ["Drama", "Thriller"],
    age: "16+",
    sessionTimes: ["14:00", "17:25", "20:15", "22:50"],
    backdrop:
      "https://image.tmdb.org/t/p/original/kmS3arkEsybCEw0ddWhDVQxCXf5.jpg",
    thumb:
      "https://image.tmdb.org/t/p/w500/rCYQGHdoz7qwYsb6wXETJfUfDLX.jpg",
    thumbLabel: "Is God Is",
    thumbIndex: "09",
  },

  {
    id: 10,
    titleMain: "The",
    titleSub: "Furious",
    description:
      "When a criminal network takes everything from him, a determined man uncovers a deadly conspiracy and fights back before it is too late.",
    rating: "8.7",
    year: "2026",
    runtime: "2h 05m",
    genre: ["Action", "Adventure", "Thriller"],
    age: "16+",
    sessionTimes: ["13:30", "16:50", "20:05", "23:15"],
    backdrop:
      "https://image.tmdb.org/t/p/original/8Tfys3mDZVp4tNoH2ktm06a0Tau.jpg",
    thumb:
      "https://image.tmdb.org/t/p/w500/yihdXomYb5kTeSivtFndMy5iDmf.jpg",
    thumbLabel: "The Furious",
    thumbIndex: "10",
  },
];

export { bannerMovies };