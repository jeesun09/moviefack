const bannerMovies = [
  // =====================================================
  // 01
  // =====================================================
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

  // =====================================================
  // 02
  // =====================================================
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

  // =====================================================
  // 03
  // =====================================================
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

  // =====================================================
  // 04
  // =====================================================
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

  // =====================================================
  // 05
  // =====================================================
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

  // =====================================================
  // 06
  // =====================================================
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

  // =====================================================
  // 07
  // =====================================================
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

  // =====================================================
  // 08
  // =====================================================
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

  // =====================================================
  // 09
  // =====================================================
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

  // =====================================================
  // 10
  // =====================================================
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

  // =====================================================
  // 11
  // =====================================================
  {
    id: 11,
    titleMain: "Avatar:",
    titleSub: "The Way of Water",
    description:
      "Jake Sully and Neytiri build a new family while protecting their home from an old enemy returning with greater force.",
    rating: "8.1",
    year: "2022",
    runtime: "3h 12m",
    genre: ["Sci-Fi", "Adventure", "Fantasy"],
    age: "PG-13",
    sessionTimes: ["12:00", "16:00", "20:00", "23:30"],
    backdrop:
      "https://image.tmdb.org/t/p/original/s16H6tpK2utj6M8mQW4bM5M7m3X.jpg",
    thumb:
      "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
    thumbLabel: "Avatar",
    thumbIndex: "11",
  },

  // =====================================================
  // 12
  // =====================================================
  {
    id: 12,
    titleMain: "Dune:",
    titleSub: "Part Two",
    description:
      "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    rating: "8.7",
    year: "2024",
    runtime: "2h 46m",
    genre: ["Sci-Fi", "Adventure", "Drama"],
    age: "PG-13",
    sessionTimes: ["13:15", "16:40", "20:10", "23:25"],
    backdrop:
      "https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
    thumb:
      "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    thumbLabel: "Dune Part Two",
    thumbIndex: "12",
  },

  // =====================================================
  // 13
  // =====================================================
  {
    id: 13,
    titleMain: "Oppenheimer",
    titleSub: "",
    description:
      "A brilliant scientist leads the secret project that changes warfare forever while struggling with the consequences of his creation.",
    rating: "8.6",
    year: "2023",
    runtime: "3h 00m",
    genre: ["Drama", "History", "Biography"],
    age: "R",
    sessionTimes: ["12:30", "16:30", "20:30", "23:45"],
    backdrop:
      "https://image.tmdb.org/t/p/original/rLb2cwF3Pazuxaj0sRXQ037tGI1.jpg",
    thumb:
      "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    thumbLabel: "Oppenheimer",
    thumbIndex: "13",
  },

  // =====================================================
  // 14
  // =====================================================
  {
    id: 14,
    titleMain: "Interstellar",
    titleSub: "",
    description:
      "A former pilot joins a dangerous mission through a wormhole to find a new home for humanity before Earth becomes uninhabitable.",
    rating: "8.7",
    year: "2014",
    runtime: "2h 49m",
    genre: ["Sci-Fi", "Drama", "Adventure"],
    age: "PG-13",
    sessionTimes: ["12:15", "16:00", "19:45", "23:10"],
    backdrop:
      "https://image.tmdb.org/t/p/original/xJHokMbljvjADYdit5fK5nWQf1p.jpg",
    thumb:
      "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    thumbLabel: "Interstellar",
    thumbIndex: "14",
  },

  // =====================================================
  // 15
  // =====================================================
  {
    id: 15,
    titleMain: "Inception",
    titleSub: "",
    description:
      "A skilled thief enters people's dreams to steal secrets and is offered one impossible mission that could change his life forever.",
    rating: "8.8",
    year: "2010",
    runtime: "2h 28m",
    genre: ["Action", "Sci-Fi", "Thriller"],
    age: "PG-13",
    sessionTimes: ["13:00", "16:20", "19:40", "22:55"],
    backdrop:
      "https://image.tmdb.org/t/p/original/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
    thumb:
      "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
    thumbLabel: "Inception",
    thumbIndex: "15",
  },

  // =====================================================
  // 16
  // =====================================================
  {
    id: 16,
    titleMain: "The Dark",
    titleSub: "Knight",
    description:
      "Batman faces a criminal mastermind whose reign of chaos pushes Gotham and its heroes to their limits.",
    rating: "9.0",
    year: "2008",
    runtime: "2h 32m",
    genre: ["Action", "Crime", "Drama"],
    age: "PG-13",
    sessionTimes: ["12:45", "16:15", "19:50", "23:00"],
    backdrop:
      "https://image.tmdb.org/t/p/original/hqkIcbrOHL86UncnHIsHVcVmzue.jpg",
    thumb:
      "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    thumbLabel: "The Dark Knight",
    thumbIndex: "16",
  },

  // =====================================================
  // 17
  // =====================================================
  {
    id: 17,
    titleMain: "Interstellar",
    titleSub: "Beyond",
    description:
      "A mysterious signal leads a crew beyond known space where they uncover secrets that could redefine humanity's future.",
    rating: "8.4",
    year: "2026",
    runtime: "2h 21m",
    genre: ["Sci-Fi", "Mystery", "Adventure"],
    age: "PG-13",
    sessionTimes: ["13:10", "16:35", "20:00", "23:20"],
    backdrop:
      "https://image.tmdb.org/t/p/original/xJHokMbljvjADYdit5fK5nWQf1p.jpg",
    thumb:
      "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    thumbLabel: "Beyond",
    thumbIndex: "17",
  },

  // =====================================================
  // 18
  // =====================================================
  {
    id: 18,
    titleMain: "John Wick:",
    titleSub: "Chapter 4",
    description:
      "John Wick discovers a path to defeating the High Table, but freedom comes with one final and brutal confrontation.",
    rating: "7.6",
    year: "2023",
    runtime: "2h 49m",
    genre: ["Action", "Thriller", "Crime"],
    age: "R",
    sessionTimes: ["14:00", "17:30", "21:00", "23:50"],
    backdrop:
      "https://image.tmdb.org/t/p/original/h8gHn0OzBoaefsYseUByqsmEDMY.jpg",
    thumb:
      "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
    thumbLabel: "John Wick 4",
    thumbIndex: "18",
  },

  // =====================================================
  // 19
  // =====================================================
  {
    id: 19,
    titleMain: "Guardians",
    titleSub: "of the Galaxy",
    description:
      "The Guardians embark on a dangerous mission that forces them to confront Rocket's painful past and protect their family.",
    rating: "8.0",
    year: "2023",
    runtime: "2h 30m",
    genre: ["Action", "Adventure", "Comedy"],
    age: "PG-13",
    sessionTimes: ["12:20", "15:40", "19:00", "22:30"],
    backdrop:
      "https://image.tmdb.org/t/p/original/5YZbUmjbMa3ClvSW1Wj3D6XGO7S.jpg",
    thumb:
      "https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg",
    thumbLabel: "Guardians",
    thumbIndex: "19",
  },

  // =====================================================
  // 20
  // =====================================================
  {
    id: 20,
    titleMain: "The",
    titleSub: "Batman",
    description:
      "A young Batman investigates a series of brutal crimes and uncovers corruption buried deep within Gotham City.",
    rating: "7.7",
    year: "2022",
    runtime: "2h 56m",
    genre: ["Crime", "Mystery", "Thriller"],
    age: "PG-13",
    sessionTimes: ["13:00", "16:30", "20:00", "23:20"],
    backdrop:
      "https://image.tmdb.org/t/p/original/b0PlSFdDwbyK0cf5a7pW0VgK3s3.jpg",
    thumb:
      "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    thumbLabel: "The Batman",
    thumbIndex: "20",
  },

  // =====================================================
  // 21
  // =====================================================
  {
    id: 21,
    titleMain: "Gladiator",
    titleSub: "II",
    description:
      "Years after the fall of Rome's greatest general, a new warrior rises to fight for freedom and honor inside the Colosseum.",
    rating: "7.0",
    year: "2024",
    runtime: "2h 28m",
    genre: ["Action", "Drama", "Adventure"],
    age: "R",
    sessionTimes: ["12:30", "16:00", "19:30", "22:50"],
    backdrop:
      "https://image.tmdb.org/t/p/original/euM8fJvfH28xhjGy25LiygxfkWc.jpg",
    thumb:
      "https://image.tmdb.org/t/p/w500/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg",
    thumbLabel: "Gladiator II",
    thumbIndex: "21",
  },

  // =====================================================
  // 22
  // =====================================================
  {
    id: 22,
    titleMain: "Mission:",
    titleSub: "Impossible",
    description:
      "Ethan Hunt races across the world to stop a powerful artificial intelligence before it falls into the wrong hands.",
    rating: "7.6",
    year: "2023",
    runtime: "2h 43m",
    genre: ["Action", "Adventure", "Thriller"],
    age: "PG-13",
    sessionTimes: ["13:30", "17:00", "20:30", "23:40"],
    backdrop:
      "https://image.tmdb.org/t/p/original/628Dep6AxEtDxjZoGP78TsOxYbK.jpg",
    thumb:
      "https://image.tmdb.org/t/p/w500/NNxYkU70HPurnNCSiCjYAmacwm.jpg",
    thumbLabel: "Mission Impossible",
    thumbIndex: "22",
  },

  // =====================================================
  // 23
  // =====================================================
  {
    id: 23,
    titleMain: "Everything",
    titleSub: "Everywhere",
    description:
      "A woman discovers countless versions of herself across parallel universes and must learn to embrace every possibility.",
    rating: "7.7",
    year: "2022",
    runtime: "2h 19m",
    genre: ["Action", "Comedy", "Fantasy"],
    age: "R",
    sessionTimes: ["14:00", "17:15", "20:30", "23:15"],
    backdrop:
      "https://image.tmdb.org/t/p/original/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg",
    thumb:
      "https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg",
    thumbLabel: "Everything Everywhere",
    thumbIndex: "23",
  },

  // =====================================================
  // 24
  // =====================================================
  {
    id: 24,
    titleMain: "The",
    titleSub: "Martian",
    description:
      "An astronaut stranded on Mars must use science, creativity and determination to survive until help can reach him.",
    rating: "8.0",
    year: "2015",
    runtime: "2h 21m",
    genre: ["Sci-Fi", "Drama", "Adventure"],
    age: "PG-13",
    sessionTimes: ["12:15", "15:40", "19:10", "22:35"],
    backdrop:
      "https://image.tmdb.org/t/p/original/5BHuvQ6pYy1J0F0gZ0Y2WZ3r4.jpg",
    thumb:
      "https://image.tmdb.org/t/p/w500/5BHuvQ6pYy1J0F0gZ0Y2WZ3r4.jpg",
    thumbLabel: "The Martian",
    thumbIndex: "24",
  },

  // =====================================================
  // 25
  // =====================================================
  {
    id: 25,
    titleMain: "Mad Max:",
    titleSub: "Fury Road",
    description:
      "In a ruined wasteland, a warrior and a rebellious group flee across the desert while being hunted by a ruthless tyrant.",
    rating: "8.1",
    year: "2015",
    runtime: "2h 00m",
    genre: ["Action", "Adventure", "Sci-Fi"],
    age: "R",
    sessionTimes: ["13:00", "16:15", "19:40", "22:45"],
    backdrop:
      "https://image.tmdb.org/t/p/original/8yACtz3oE2F5qW1j6J8eJ7V3w0O.jpg",
    thumb:
      "https://image.tmdb.org/t/p/w500/hA2ple9q4qnwxp3hKVNhroipsir.jpg",
    thumbLabel: "Fury Road",
    thumbIndex: "25",
  },

  // =====================================================
  // 26
  // =====================================================
  {
    id: 26,
    titleMain: "The",
    titleSub: "Matrix",
    description:
      "A computer hacker discovers that reality is not what it seems and joins a rebellion against machines controlling humanity.",
    rating: "8.7",
    year: "1999",
    runtime: "2h 16m",
    genre: ["Action", "Sci-Fi", "Thriller"],
    age: "R",
    sessionTimes: ["12:00", "15:30", "19:00", "22:30"],
    backdrop:
      "https://image.tmdb.org/t/p/original/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    thumb:
      "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    thumbLabel: "The Matrix",
    thumbIndex: "26",
  },

  // =====================================================
  // 27
  // =====================================================
  {
    id: 27,
    titleMain: "Jurassic",
    titleSub: "World",
    description:
      "A dinosaur theme park descends into chaos when a genetically engineered predator escapes containment.",
    rating: "6.9",
    year: "2015",
    runtime: "2h 04m",
    genre: ["Adventure", "Action", "Sci-Fi"],
    age: "PG-13",
    sessionTimes: ["13:20", "16:50", "20:10", "23:00"],
    backdrop:
      "https://image.tmdb.org/t/p/original/5GbkL9DDRzqD4Jg7Xf2w7W2QJ0G.jpg",
    thumb:
      "https://image.tmdb.org/t/p/w500/A0QZ7j8v4mJ0Jw5pJ0s0X5z2.jpg",
    thumbLabel: "Jurassic World",
    thumbIndex: "27",
  },

  // =====================================================
  // 28
  // =====================================================
  {
    id: 28,
    titleMain: "The Hunger",
    titleSub: "Games",
    description:
      "A young woman volunteers to enter a deadly televised competition where survival means defeating opponents from across the nation.",
    rating: "7.2",
    year: "2012",
    runtime: "2h 22m",
    genre: ["Action", "Adventure", "Drama"],
    age: "PG-13",
    sessionTimes: ["12:40", "16:00", "19:20", "22:40"],
    backdrop:
      "https://image.tmdb.org/t/p/original/yXCbOiVDCxO71ZfZ9zYzL3s5H6S.jpg",
    thumb:
      "https://image.tmdb.org/t/p/w500/yXCbOiVDCxO71ZfZ9zYzL3s5H6S.jpg",
    thumbLabel: "The Hunger Games",
    thumbIndex: "28",
  },

  // =====================================================
  // 29
  // =====================================================
  {
    id: 29,
    titleMain: "A Quiet",
    titleSub: "Place",
    description:
      "A family survives in silence while hiding from mysterious creatures that hunt anything that makes a sound.",
    rating: "7.5",
    year: "2018",
    runtime: "1h 30m",
    genre: ["Horror", "Drama", "Sci-Fi"],
    age: "PG-13",
    sessionTimes: ["14:20", "17:30", "20:40", "23:10"],
    backdrop:
      "https://image.tmdb.org/t/p/original/roYyPiQDQKmIKUEhO912693tSja.jpg",
    thumb:
      "https://image.tmdb.org/t/p/w500/nAU74GmpUk7t5iklEp3bufwDq4N.jpg",
    thumbLabel: "A Quiet Place",
    thumbIndex: "29",
  },

  // =====================================================
  // 30
  // =====================================================
  {
    id: 30,
    titleMain: "Black",
    titleSub: "Panther",
    description:
      "A newly crowned king must defend his hidden kingdom while confronting an enemy connected to his family's past.",
    rating: "7.3",
    year: "2018",
    runtime: "2h 14m",
    genre: ["Action", "Adventure", "Sci-Fi"],
    age: "PG-13",
    sessionTimes: ["13:10", "16:30", "19:50", "23:00"],
    backdrop:
      "https://image.tmdb.org/t/p/original/b6ZJZHUdMEFECvGiDpJjlfUWela.jpg",
    thumb:
      "https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg",
    thumbLabel: "Black Panther",
    thumbIndex: "30",
  },

  // =====================================================
  // 31
  // =====================================================
  {
    id: 31,
    titleMain: "Spider-Man:",
    titleSub: "No Way Home",
    description:
      "Peter Parker's secret identity is exposed, forcing him to seek help from Doctor Strange and face threats from other worlds.",
    rating: "8.2",
    year: "2021",
    runtime: "2h 28m",
    genre: ["Action", "Adventure", "Sci-Fi"],
    age: "PG-13",
    sessionTimes: ["12:20", "15:45", "19:10", "22:30"],
    backdrop:
      "https://image.tmdb.org/t/p/original/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg",
    thumb:
      "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    thumbLabel: "Spider-Man No Way Home",
    thumbIndex: "31",
  },

  // =====================================================
  // 32
  // =====================================================
  {
    id: 32,
    titleMain: "Iron",
    titleSub: "Man",
    description:
      "A billionaire inventor builds an advanced armored suit and becomes a hero after escaping from captivity.",
    rating: "7.9",
    year: "2008",
    runtime: "2h 06m",
    genre: ["Action", "Sci-Fi", "Adventure"],
    age: "PG-13",
    sessionTimes: ["13:30", "16:45", "20:00", "23:15"],
    backdrop:
      "https://image.tmdb.org/t/p/original/cyecB7godJ6kNHGONFjUyVN9f5W.jpg",
    thumb:
      "https://image.tmdb.org/t/p/w500/78lPtwv72eTNqFW9COBYI0dWDJa.jpg",
    thumbLabel: "Iron Man",
    thumbIndex: "32",
  },

  // =====================================================
  // 33
  // =====================================================
  {
    id: 33,
    titleMain: "Doctor",
    titleSub: "Strange",
    description:
      "A brilliant surgeon discovers the hidden world of magic after a devastating accident changes his life.",
    rating: "7.5",
    year: "2016",
    runtime: "1h 55m",
    genre: ["Action", "Fantasy", "Adventure"],
    age: "PG-13",
    sessionTimes: ["12:50", "16:10", "19:30", "22:50"],
    backdrop:
      "https://image.tmdb.org/t/p/original/5mKZ0s7Z0z7z2W5q5f7q7r0.jpg",
    thumb:
      "https://image.tmdb.org/t/p/w500/uGBVj3bEbCoqZa0Wk6z9t7Zq.jpg",
    thumbLabel: "Doctor Strange",
    thumbIndex: "33",
  },

  // =====================================================
  // 34
  // =====================================================
  {
    id: 34,
    titleMain: "Black",
    titleSub: "Adam",
    description:
      "An ancient champion awakens in the modern world and must decide whether to become a protector or a destroyer.",
    rating: "6.2",
    year: "2022",
    runtime: "2h 05m",
    genre: ["Action", "Fantasy", "Adventure"],
    age: "PG-13",
    sessionTimes: ["13:40", "17:00", "20:20", "23:20"],
    backdrop:
      "https://image.tmdb.org/t/p/original/bQXAqRx2Fgc46uCVWgoZ3o2wM.jpg",
    thumb:
      "https://image.tmdb.org/t/p/w500/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg",
    thumbLabel: "Black Adam",
    thumbIndex: "34",
  },

  // =====================================================
  // 35
  // =====================================================
  {
    id: 35,
    titleMain: "Fantastic",
    titleSub: "Beasts",
    description:
      "A magical zoologist arrives in New York with a suitcase full of extraordinary creatures that soon escape.",
    rating: "7.2",
    year: "2016",
    runtime: "2h 13m",
    genre: ["Fantasy", "Adventure", "Family"],
    age: "PG-13",
    sessionTimes: ["12:15", "15:35", "18:55", "22:15"],
    backdrop:
      "https://image.tmdb.org/t/p/original/6I2tF0f2j5r2t6h8y8j0q0.jpg",
    thumb:
      "https://image.tmdb.org/t/p/w500/h6NYfVUyM6CDURtZSn4g6c3J7.jpg",
    thumbLabel: "Fantastic Beasts",
    thumbIndex: "35",
  },

  // =====================================================
  // 36
  // =====================================================
  {
    id: 36,
    titleMain: "Wonka",
    titleSub: "",
    description:
      "A young chocolatier arrives in a magical town determined to open his own shop and change the world one sweet at a time.",
    rating: "7.1",
    year: "2023",
    runtime: "1h 56m",
    genre: ["Fantasy", "Family", "Comedy"],
    age: "PG",
    sessionTimes: ["13:00", "16:20", "19:40", "22:45"],
    backdrop:
      "https://image.tmdb.org/t/p/original/yyFc8Iclt2c2wYh8j2.jpg",
    thumb:
      "https://image.tmdb.org/t/p/w500/qhb1qOilapbapxWQnZ4X7x.jpg",
    thumbLabel: "Wonka",
    thumbIndex: "36",
  },

  // =====================================================
  // 37
  // =====================================================
  {
    id: 37,
    titleMain: "Inside",
    titleSub: "Out 2",
    description:
      "Riley enters her teenage years as new emotions arrive and completely transform the headquarters inside her mind.",
    rating: "7.6",
    year: "2024",
    runtime: "1h 36m",
    genre: ["Animation", "Family", "Comedy"],
    age: "PG",
    sessionTimes: ["12:00", "14:40", "17:20", "20:00"],
    backdrop:
      "https://image.tmdb.org/t/p/original/p5ozvmdgsmbWe0H8X3N2.jpg",
    thumb:
      "https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
    thumbLabel: "Inside Out 2",
    thumbIndex: "37",
  },

  // =====================================================
  // 38
  // =====================================================
  {
    id: 38,
    titleMain: "The Wild",
    titleSub: "Robot",
    description:
      "A robot stranded on an uninhabited island slowly learns to communicate with animals and becomes part of their world.",
    rating: "8.2",
    year: "2024",
    runtime: "1h 42m",
    genre: ["Animation", "Family", "Adventure"],
    age: "PG",
    sessionTimes: ["12:30", "15:20", "18:10", "21:00"],
    backdrop:
      "https://image.tmdb.org/t/p/original/v9acaWVVFDtu2k1qEQJ4.jpg",
    thumb:
      "https://image.tmdb.org/t/p/w500/wTnV3PCVW5O92JMrFvvrRcV39.jpg",
    thumbLabel: "The Wild Robot",
    thumbIndex: "38",
  },

  // =====================================================
  // 39
  // =====================================================
  {
    id: 39,
    titleMain: "How to Train",
    titleSub: "Your Dragon",
    description:
      "A young Viking forms an unlikely friendship with a wounded dragon and discovers that everything he knows about dragons is wrong.",
    rating: "8.1",
    year: "2010",
    runtime: "1h 38m",
    genre: ["Animation", "Adventure", "Family"],
    age: "PG",
    sessionTimes: ["12:10", "15:00", "17:50", "20:40"],
    backdrop:
      "https://image.tmdb.org/t/p/original/6O9nkCMZBiUMFZlK9e7Z3n.jpg",
    thumb:
      "https://image.tmdb.org/t/p/w500/ygGmAO60t8GyqLGS1AY4oZ.jpg",
    thumbLabel: "How to Train Your Dragon",
    thumbIndex: "39",
  },

  // =====================================================
  // 40
  // =====================================================
  {
    id: 40,
    titleMain: "The Super",
    titleSub: "Mario Bros.",
    description:
      "Two brothers are transported to a magical kingdom and must work together to rescue a princess from a powerful enemy.",
    rating: "7.0",
    year: "2023",
    runtime: "1h 32m",
    genre: ["Animation", "Adventure", "Comedy"],
    age: "PG",
    sessionTimes: ["11:50", "14:20", "17:00", "19:40"],
    backdrop:
      "https://image.tmdb.org/t/p/original/9n2tJBplPbgR2ca05h.jpg",
    thumb:
      "https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6m.jpg",
    thumbLabel: "Super Mario Bros.",
    thumbIndex: "40",
  },

  // =====================================================
  // 41
  // =====================================================
  {
    id: 41,
    titleMain: "A Quiet",
    titleSub: "Place: Day One",
    description:
      "As terrifying creatures arrive in New York, an ordinary woman fights to survive the first day of a world gone silent.",
    rating: "6.7",
    year: "2024",
    runtime: "1h 40m",
    genre: ["Horror", "Sci-Fi", "Thriller"],
    age: "R",
    sessionTimes: ["14:15", "17:30", "20:45", "23:30"],
    backdrop:
      "https://image.tmdb.org/t/p/original/2Nti3gYAX513wvhp8iow.jpg",
    thumb:
      "https://image.tmdb.org/t/p/w500/yrpPYKijwdMHyTGIOd1iK1.jpg",
    thumbLabel: "A Quiet Place Day One",
    thumbIndex: "41",
  },

  // =====================================================
  // 42
  // =====================================================
  {
    id: 42,
    titleMain: "Alien:",
    titleSub: "Romulus",
    description:
      "A group of young space colonists explore an abandoned station and encounter one of the universe's most terrifying lifeforms.",
    rating: "7.1",
    year: "2024",
    runtime: "1h 59m",
    genre: ["Horror", "Sci-Fi", "Thriller"],
    age: "R",
    sessionTimes: ["13:20", "16:40", "20:00", "23:15"],
    backdrop:
      "https://image.tmdb.org/t/p/original/2h8w8e1z0.jpg",
    thumb:
      "https://image.tmdb.org/t/p/w500/b33nnKl1GSFbao4l3fZDDqsx5.jpg",
    thumbLabel: "Alien Romulus",
    thumbIndex: "42",
  },

  // =====================================================
  // 43
  // =====================================================
  {
    id: 43,
    titleMain: "Talk to",
    titleSub: "Me",
    description:
      "A group of friends discover an embalmed hand that lets them communicate with spirits, but they soon unleash something much darker.",
    rating: "7.0",
    year: "2023",
    runtime: "1h 35m",
    genre: ["Horror", "Thriller", "Mystery"],
    age: "R",
    sessionTimes: ["15:00", "18:10", "21:20", "23:50"],
    backdrop:
      "https://image.tmdb.org/t/p/original/5ik4ATKmNtmJU6AYD0bLm56BC.jpg",
    thumb:
      "https://image.tmdb.org/t/p/w500/kdPMUMJzyYAc4roD52qavX0n.jpg",
    thumbLabel: "Talk to Me",
    thumbIndex: "43",
  },

  // =====================================================
  // 44
  // =====================================================
  {
    id: 44,
    titleMain: "Smile",
    titleSub: "",
    description:
      "After witnessing a terrifying incident, a psychiatrist begins experiencing a series of disturbing supernatural events.",
    rating: "6.5",
    year: "2022",
    runtime: "1h 55m",
    genre: ["Horror", "Mystery", "Thriller"],
    age: "R",
    sessionTimes: ["14:30", "17:45", "21:00", "23:35"],
    backdrop:
      "https://image.tmdb.org/t/p/original/8YFL5QQVPy3Mrs3.jpg",
    thumb:
      "https://image.tmdb.org/t/p/w500/aPqcQwu4VGEewPhag.jpg",
    thumbLabel: "Smile",
    thumbIndex: "44",
  },

  // =====================================================
  // 45
  // =====================================================
  {
    id: 45,
    titleMain: "The Conjuring",
    titleSub: "",
    description:
      "Paranormal investigators help a family terrorized by a dark presence inside their isolated farmhouse.",
    rating: "7.5",
    year: "2013",
    runtime: "1h 52m",
    genre: ["Horror", "Mystery", "Thriller"],
    age: "R",
    sessionTimes: ["15:10", "18:20", "21:30", "23:55"],
    backdrop:
      "https://image.tmdb.org/t/p/original/5x3Q1.jpg",
    thumb:
      "https://image.tmdb.org/t/p/w500/wVYREutTvI2tmxuFKm5fr.jpg",
    thumbLabel: "The Conjuring",
    thumbIndex: "45",
  },

  // =====================================================
  // 46
  // =====================================================
  {
    id: 46,
    titleMain: "Knives",
    titleSub: "Out",
    description:
      "A brilliant detective investigates a wealthy family's secrets after their patriarch is mysteriously found dead.",
    rating: "7.8",
    year: "2019",
    runtime: "2h 10m",
    genre: ["Mystery", "Comedy", "Crime"],
    age: "PG-13",
    sessionTimes: ["12:40", "16:00", "19:20", "22:40"],
    backdrop:
      "https://image.tmdb.org/t/p/original/mF9t2.jpg",
    thumb:
      "https://image.tmdb.org/t/p/w500/pThyQovXQrw2m0.jpg",
    thumbLabel: "Knives Out",
    thumbIndex: "46",
  },

  // =====================================================
  // 47
  // =====================================================
  {
    id: 47,
    titleMain: "The Grand",
    titleSub: "Budapest Hotel",
    description:
      "A legendary hotel concierge and his young protégé become involved in a mysterious inheritance and a missing painting.",
    rating: "8.0",
    year: "2014",
    runtime: "1h 40m",
    genre: ["Comedy", "Drama", "Adventure"],
    age: "R",
    sessionTimes: ["13:00", "16:15", "19:30", "22:45"],
    backdrop:
      "https://image.tmdb.org/t/p/original/nX5XotM9yprCKarRH4fz.jpg",
    thumb:
      "https://image.tmdb.org/t/p/w500/eWdyYQreja.jpg",
    thumbLabel: "Grand Budapest Hotel",
    thumbIndex: "47",
  },

  // =====================================================
  // 48
  // =====================================================
  {
    id: 48,
    titleMain: "La La",
    titleSub: "Land",
    description:
      "A jazz musician and an aspiring actress fall in love while pursuing their dreams in Los Angeles.",
    rating: "8.0",
    year: "2016",
    runtime: "2h 08m",
    genre: ["Drama", "Romance", "Music"],
    age: "PG-13",
    sessionTimes: ["12:30", "15:45", "19:00", "22:15"],
    backdrop:
      "https://image.tmdb.org/t/p/original/n1mvYtV5s.jpg",
    thumb:
      "https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg",
    thumbLabel: "La La Land",
    thumbIndex: "48",
  },

  // =====================================================
  // 49
  // =====================================================
  {
    id: 49,
    titleMain: "The Wolf",
    titleSub: "of Wall Street",
    description:
      "A young stockbroker builds a life of extreme wealth and excess before his reckless ambitions attract federal investigators.",
    rating: "8.2",
    year: "2013",
    runtime: "3h 00m",
    genre: ["Crime", "Drama", "Comedy"],
    age: "R",
    sessionTimes: ["13:15", "17:00", "20:45", "23:45"],
    backdrop:
      "https://image.tmdb.org/t/p/original/63m.jpg",
    thumb:
      "https://image.tmdb.org/t/p/w500/34m2.jpg",
    thumbLabel: "The Wolf of Wall Street",
    thumbIndex: "49",
  },

  // =====================================================
  // 50
  // =====================================================
  {
    id: 50,
    titleMain: "The",
    titleSub: "Prestige",
    description:
      "Two rival magicians become obsessed with creating the ultimate illusion, sacrificing everything in their escalating battle.",
    rating: "8.5",
    year: "2006",
    runtime: "2h 10m",
    genre: ["Drama", "Mystery", "Thriller"],
    age: "PG-13",
    sessionTimes: ["12:50", "16:10", "19:30", "22:50"],
    backdrop:
      "https://image.tmdb.org/t/p/original/5fT8c.jpg",
    thumb:
      "https://image.tmdb.org/t/p/w500/5MXyQO7.jpg",
    thumbLabel: "The Prestige",
    thumbIndex: "50",
  },
];

export { bannerMovies };