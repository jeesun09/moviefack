import { getFeaturedActionMovies } from "@/util/api";
import SectionSlider from "./SectionSlider";

const HomeSections = async () => {
  const [
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
  ] = await Promise.allSettled([
    getFeaturedActionMovies(28),
    getFeaturedActionMovies(12),
    getFeaturedActionMovies(16),
    getFeaturedActionMovies(35),
    getFeaturedActionMovies(80),
    getFeaturedActionMovies(18),
    getFeaturedActionMovies(27),
    getFeaturedActionMovies(878),
    getFeaturedActionMovies(9648),
    getFeaturedActionMovies(10751),
  ]);

  const actionMovies = actionRes.status === "fulfilled" && Array.isArray(actionRes.value) ? actionRes.value : [];
  const adventureMovies = adventureRes.status === "fulfilled" && Array.isArray(adventureRes.value) ? adventureRes.value : [];
  const animationMovies = animationRes.status === "fulfilled" && Array.isArray(animationRes.value) ? animationRes.value : [];
  const comedyMovies = comedyRes.status === "fulfilled" && Array.isArray(comedyRes.value) ? comedyRes.value : [];
  const crimeMovies = crimeRes.status === "fulfilled" && Array.isArray(crimeRes.value) ? crimeRes.value : [];
  const dramaMovies = dramaRes.status === "fulfilled" && Array.isArray(dramaRes.value) ? dramaRes.value : [];
  const horrorMovies = horrorRes.status === "fulfilled" && Array.isArray(horrorRes.value) ? horrorRes.value : [];
  const scifiMovies = scifiRes.status === "fulfilled" && Array.isArray(scifiRes.value) ? scifiRes.value : [];
  const mysteryMovies = mysteryRes.status === "fulfilled" && Array.isArray(mysteryRes.value) ? mysteryRes.value : [];
  const familyMovies = familyRes.status === "fulfilled" && Array.isArray(familyRes.value) ? familyRes.value : [];

  return (
    <div className="space-y-16 px-4 pb-20 pt-12 sm:px-6 lg:px-12">
      {/* Action Movies */}
      <SectionSlider
        title="Action & Blockbusters"
        subtitle="High-octane excitement, pulse-pounding battles, and iconic heroes."
        movies={actionMovies}
      />

      {/* Adventure Movies */}
      <SectionSlider
        title="Epic Adventures"
        subtitle="Explore uncharted realms, mythical journeys, and timeless quests."
        movies={adventureMovies}
      />

      {/* Animation Movies */}
      <SectionSlider
        title="Animation & Cartoons"
        subtitle="Stunning visuals, beloved characters, and magic for all ages."
        movies={animationMovies}
      />

      {/* Comedy Movies */}
      <SectionSlider
        title="Comedy & Laughs"
        subtitle="Hilarious comedies, feel-good stories, and non-stop laughter."
        movies={comedyMovies}
      />

      {/* Crime Movies */}
      <SectionSlider
        title="Crime & Underworld"
        subtitle="Gritty mob thrillers, detective mysteries, and high-stakes heists."
        movies={crimeMovies}
      />

      {/* Drama Movies */}
      <SectionSlider
        title="Drama & Masterpieces"
        subtitle="Emotional journeys, powerful performances, and critically acclaimed cinema."
        movies={dramaMovies}
      />

      {/* Horror Movies */}
      <SectionSlider
        title="Horror & Dark Thrillers"
        subtitle="Spine-chilling tales, supernatural frights, and terrifying encounters."
        movies={horrorMovies}
      />

      {/* Sci-Fi Movies */}
      <SectionSlider
        title="Sci-Fi & Cyberpunk"
        subtitle="Futuristic technology, cosmic wonders, and mind-bending realities."
        movies={scifiMovies}
      />

      {/* Mystery Movies */}
      <SectionSlider
        title="Mystery & Mind-Benders"
        subtitle="Twisted puzzles, unexpected reveals, and psychological thrillers."
        movies={mysteryMovies}
      />

      {/* Family Movies */}
      <SectionSlider
        title="Family & Kids Favorites"
        subtitle="Wholesome entertainment, heartwarming stories, and fun for everyone."
        movies={familyMovies}
      />
    </div>
  );
};

export default HomeSections;
