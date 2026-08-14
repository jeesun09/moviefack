import {
  getFeaturedMovies,
  getFeaturedActionMovies,
  getMoviesByLanguage,
  getTopRatedMovies,
  getTvShowsByLanguage,
  getTvShows,
  getMarvelMovies,
  getAllTimeFavourites,
} from "@/util/api";
import SectionSlider from "./SectionSlider";
import EarlyAccessBannerSlider from "./EarlyAccessBannerSlider";
import Top10RankedSlider from "./Top10RankedSlider";
import CinemaSpotlightBanner from "./CinemaSpotlightBanner";
import WideBackdropSeriesSlider from "./WideBackdropSeriesSlider";
import GenrePillExplorer from "./GenrePillExplorer";
import CinemaHeroCarousel from "./CinemaHeroCarousel";

const HomeSections = async () => {
  const [
    featuredRes,
    topRatedRes,
    allTimeFavRes,
    hollywoodRes,
    bollywoodRes,
    hindiSeriesRes,
    bengaliRes,
    bengaliSeriesRes,
    tollywoodRes,
    koreanRes,
    animeRes,
    multiLangRes,
    marvelRes,
    actionRes,
    adventureRes,
    animationRes,
    comedyRes,
    crimeRes,
    dramaRes,
    horrorRes,
    scifiRes,
    mysteryRes,
    familyRes,
    romanceRes,
    topTvRes,
  ] = await Promise.allSettled([
    getFeaturedMovies(),
    getTopRatedMovies(),
    getAllTimeFavourites(), // All-Time Favourites (Top voted classics)
    getMoviesByLanguage("en"), // Hollywood
    getMoviesByLanguage("hi"), // Bollywood Movies
    getTvShowsByLanguage("hi"), // Hindi Web Series (Mirzapur, Panchayat, etc.)
    getMoviesByLanguage("bn"), // Bengali Movies
    getTvShowsByLanguage("bn"), // Bengali Series
    getMoviesByLanguage("te|ta|ml|kn"), // Tollywood & South Indian
    getMoviesByLanguage("ko"), // Korean Drama & Cinema
    getMoviesByLanguage("ja"), // Japanese & Anime
    getMoviesByLanguage("ko|ja|es|fr|it"), // Multi-Language World Cinema
    getMarvelMovies(), // Marvel Cinematic Universe (MCU)
    getFeaturedActionMovies(28), // Action
    getFeaturedActionMovies(12), // Adventure
    getFeaturedActionMovies(16), // Animation
    getFeaturedActionMovies(35), // Comedy
    getFeaturedActionMovies(80), // Crime
    getFeaturedActionMovies(18), // Drama
    getFeaturedActionMovies(27), // Horror
    getFeaturedActionMovies(878), // Sci-Fi
    getFeaturedActionMovies(9648), // Mystery
    getFeaturedActionMovies(10751), // Family
    getFeaturedActionMovies(10749), // Romance
    getTvShows(10759), // Top Action TV Shows
  ]);

  // Extract arrays safely
  const getArray = (res) =>
    res.status === "fulfilled" && Array.isArray(res.value) ? res.value : [];

  const featuredMovies = getArray(featuredRes);
  const topRatedMovies = getArray(topRatedRes);
  const allTimeFavMovies = getArray(allTimeFavRes);
  const hollywoodMovies = getArray(hollywoodRes);
  const bollywoodMovies = getArray(bollywoodRes);
  const hindiSeries = getArray(hindiSeriesRes);
  const bengaliMovies = getArray(bengaliRes);
  const bengaliSeries = getArray(bengaliSeriesRes);
  const tollywoodMovies = getArray(tollywoodRes);
  const koreanMovies = getArray(koreanRes);
  const animeMovies = getArray(animeRes);
  const multiLangMovies = getArray(multiLangRes);
  const marvelMovies = getArray(marvelRes);
  const actionMovies = getArray(actionRes);
  const adventureMovies = getArray(adventureRes);
  const animationMovies = getArray(animationRes);
  const comedyMovies = getArray(comedyRes);
  const crimeMovies = getArray(crimeRes);
  const dramaMovies = getArray(dramaRes);
  const horrorMovies = getArray(horrorRes);
  const scifiMovies = getArray(scifiRes);
  const mysteryMovies = getArray(mysteryRes);
  const familyMovies = getArray(familyRes);
  const romanceMovies = getArray(romanceRes);
  const topTvShows = getArray(topTvRes);

  // Spotlight movie selections
  const spotlightMovie1 =
    topRatedMovies[0] || hollywoodMovies[0] || featuredMovies[0];
  const spotlightMovie2 =
    bollywoodMovies[0] || tollywoodMovies[0] || bengaliMovies[0];

  return (
    <div className="space-y-16 px-4 pb-28 pt-6 sm:px-6 lg:px-12 max-w-[1720px] mx-auto">
      {/* ── 1. QUICK GENRE & LANGUAGE PILLS ── */}
      <GenrePillExplorer />

      {/* ── 2. EARLY ACCESS CINEMA BANNER SLIDER (MATCHING USER REFERENCE) ── */}
      <EarlyAccessBannerSlider
        title="CINEMA-LIKE EXPERIENCE AT HOME."
        subtitle="Rent and stream your favorite new releases & blockbuster premieres in 4K Ultra HD."
        badge="EARLY ACCESS"
        movies={featuredMovies.length ? featuredMovies : hollywoodMovies}
      />

      {/* ── 3. TOP 10 RANKED MOVIES TODAY (#1 TO #10) ── */}
      {featuredMovies.length > 0 && (
        <Top10RankedSlider
          title="Top 10 Movies Today"
          subtitle="The most popular and watched blockbusters across the globe right now."
          movies={featuredMovies}
        />
      )}

      {/* ── 4. ALL-TIME FAVOURITES • TIMELESS CLASSICS ── */}
      {allTimeFavMovies.length > 0 && (
        <SectionSlider
          title="All-Time Favourites • Timeless Cinema Classics"
          subtitle="The highest-rated cinematic masterpieces, fan-favourite blockbusters, and timeless legends."
          movies={allTimeFavMovies}
        />
      )}

      {/* ── 5. POPULAR HINDI WEB SERIES & OTT ORIGINALS (16:9 WIDE LANDSCAPE) ── */}
      {hindiSeries.length > 0 && (
        <WideBackdropSeriesSlider
          title="Popular Hindi Series"
          subtitle="Critically acclaimed Indian OTT originals, binge-worthy crime thrillers, and village comedies."
          seriesList={hindiSeries}
        />
      )}

      {/* ── 6. MARVEL CINEMATIC UNIVERSE (MCU) & AVENGERS ── */}
      {marvelMovies.length > 0 && (
        <SectionSlider
          title="Marvel Cinematic Universe (MCU) • Avengers Saga"
          subtitle="Epic superhero sagas, Multiverse battles, and legendary Marvel Studios blockbusters."
          movies={marvelMovies}
        />
      )}

      {/* ── 7. HOLLYWOOD TOP BLOCKBUSTERS ── */}
      {hollywoodMovies.length > 0 && (
        <SectionSlider
          title="Hollywood Top Hits"
          subtitle="World-class American blockbusters, global franchises, and cinematic milestones."
          movies={hollywoodMovies}
        />
      )}

      {/* ── 8. BOLLYWOOD & HINDI CINEMA ── */}
      {bollywoodMovies.length > 0 && (
        <SectionSlider
          title="Bollywood & Hindi Blockbusters"
          subtitle="High-voltage drama, romantic blockbusters, and chart-topping Hindi cinema."
          movies={bollywoodMovies}
        />
      )}

      {/* ── 9. BENGALI CINEMA • বাংলা সিনেমা ── */}
      {bengaliMovies.length > 0 && (
        <SectionSlider
          title="Bengali Cinema • বাংলা সিনেমা"
          subtitle="Captivating Bengali masterpieces, acclaimed thrillers, and Kolkata classics."
          movies={bengaliMovies}
        />
      )}

      {/* ── 10. BENGALI WEB SERIES & DRAMAS (16:9 WIDE LANDSCAPE SLIDER) ── */}
      {bengaliSeries.length > 0 && (
        <WideBackdropSeriesSlider
          title="Bengali Web Series & Thrillers • বাংলা সিরিজ"
          subtitle="Binge-watch acclaimed original Bengali dramas, detective mysteries, and suspense series."
          seriesList={bengaliSeries}
        />
      )}

      {/* ── 11. CINEMA SPOTLIGHT BANNER #1 (WITH FLOATING POSTER CARD) ── */}
      {spotlightMovie1 && (
        <CinemaSpotlightBanner
          movie={spotlightMovie1}
          badge="CRITICS' CHOICE"
          tagline="Global Masterpiece of the Week"
        />
      )}

      {/* ── 12. TOLLYWOOD & SOUTH INDIAN CINEMA ── */}
      {tollywoodMovies.length > 0 && (
        <SectionSlider
          title="Tollywood & South Indian Cinema"
          subtitle="Action-packed Telugu, Tamil, Kannada, and Malayalam pan-India phenomena."
          movies={tollywoodMovies}
        />
      )}

      {/* ── 13. SINGLE-SLIDE AUTO-SMOOTH HERO CAROUSEL (SLIDE PER 1) ── */}
      {topRatedMovies.length > 0 && (
        <CinemaHeroCarousel
          title="Curated Hall of Fame Premieres"
          subtitle="All-time critically acclaimed masterpieces sliding smoothly in Ultra HD 4K."
          movies={topRatedMovies}
        />
      )}

      {/* ── 14. K-DRAMA & KOREAN CINEMA ── */}
      {koreanMovies.length > 0 && (
        <SectionSlider
          title="K-Drama & Korean Cinema"
          subtitle="Intense thrillers, captivating romances, and viral Korean sensations."
          movies={koreanMovies}
        />
      )}

      {/* ── 15. ANIME & JAPANESE ANIMATION ── */}
      {animeMovies.length > 0 && (
        <SectionSlider
          title="Anime & Japanese Animation"
          subtitle="Epic shonen adventures, fantastical anime movies, and studio masterworks."
          movies={animeMovies}
        />
      )}

      {/* ── 16. TOP 10 GLOBAL TV SHOWS RANKING (#1 TO #10) ── */}
      {topTvShows.length > 0 && (
        <Top10RankedSlider
          title="Top 10 TV Shows & Series"
          subtitle="The highest-rated and most streamed television series of the week."
          movies={topTvShows}
        />
      )}

      {/* ── 17. ACTION & HIGH-OCTANE THRILLERS ── */}
      <SectionSlider
        title="Action & Blockbusters"
        subtitle="High-octane excitement, pulse-pounding battles, and iconic heroes."
        movies={actionMovies}
      />

      {/* ── 18. SCI-FI & CYBERPUNK REALITIES ── */}
      <SectionSlider
        title="Sci-Fi & Cyberpunk"
        subtitle="Futuristic technology, cosmic wonders, and mind-bending realities."
        movies={scifiMovies}
      />

      {/* ── 19. CINEMA SPOTLIGHT BANNER #2 (WITH FLOATING POSTER CARD) ── */}
      {spotlightMovie2 && (
        <CinemaSpotlightBanner
          movie={spotlightMovie2}
          badge="MUST WATCH"
          tagline="Blockbuster Entertainment for Tonight"
        />
      )}

      {/* ── 20. HORROR & DARK THRILLERS ── */}
      <SectionSlider
        title="Horror & Dark Thrillers"
        subtitle="Spine-chilling tales, supernatural frights, and terrifying encounters."
        movies={horrorMovies}
      />

      {/* ── 21. CRIME, MAFIA & UNDERWORLD HEISTS ── */}
      <SectionSlider
        title="Crime & Underworld"
        subtitle="Gritty mob thrillers, detective mysteries, and high-stakes heists."
        movies={crimeMovies}
      />

      {/* ── 22. ROMANTIC DRAMAS & HEARTWARMERS ── */}
      {romanceMovies.length > 0 && (
        <SectionSlider
          title="Romantic Tales & Heartwarmers"
          subtitle="Heartfelt love stories, romantic comedies, and emotional journeys."
          movies={romanceMovies}
        />
      )}

      {/* ── 23. EPIC ADVENTURES ── */}
      <SectionSlider
        title="Epic Adventures"
        subtitle="Explore uncharted realms, mythical journeys, and timeless quests."
        movies={adventureMovies}
      />

      {/* ── 24. COMEDY & LAUGHS ── */}
      <SectionSlider
        title="Comedy & Laughs"
        subtitle="Hilarious comedies, feel-good stories, and non-stop laughter."
        movies={comedyMovies}
      />

      {/* ── 25. DRAMA & MASTERPIECES ── */}
      <SectionSlider
        title="Drama & Masterpieces"
        subtitle="Emotional journeys, powerful performances, and critically acclaimed cinema."
        movies={dramaMovies}
      />

      {/* ── 26. MYSTERY & MIND-BENDERS ── */}
      <SectionSlider
        title="Mystery & Mind-Benders"
        subtitle="Twisted puzzles, unexpected reveals, and psychological thrillers."
        movies={mysteryMovies}
      />

      {/* ── 27. ANIMATION & CARTOONS ── */}
      <SectionSlider
        title="Animation & Cartoons"
        subtitle="Stunning visuals, beloved characters, and magic for all ages."
        movies={animationMovies}
      />

      {/* ── 28. FAMILY & KIDS FAVORITES ── */}
      <SectionSlider
        title="Family & Kids Favorites"
        subtitle="Wholesome entertainment, heartwarming stories, and fun for everyone."
        movies={familyMovies}
      />

      {/* ── 29. MULTI-LANGUAGE & WORLD CINEMA ── */}
      {multiLangMovies.length > 0 && (
        <SectionSlider
          title="Multi-Language & World Cinema"
          subtitle="Award-winning international films, European cinema, and multi-language gems."
          movies={multiLangMovies}
        />
      )}

      {/* ── 30. CLASSIC MASTERPIECES & HALL OF FAME ── */}
      {topRatedMovies.length > 0 && (
        <SectionSlider
          title="All-Time Top Rated & Hall of Fame"
          subtitle="The highest-rated cinematic masterpieces in cinema history."
          movies={topRatedMovies}
        />
      )}
    </div>
  );
};

export default HomeSections;
