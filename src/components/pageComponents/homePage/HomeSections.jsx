import { getFeaturedActionMovies } from "@/util/api";
import SectionSlider from "./SectionSlider";


const HomeSections = async () => {
  const [actionMovies, adventureMovies] = await Promise.allSettled([
    getFeaturedActionMovies(28),  getFeaturedActionMovies(12)
  ]);
console.log(adventureMovies.value)
  const ActionMovies = actionMovies.value;
    const AdventureMovies = adventureMovies.value;
  return (
    <div className="space-y-16 px-4 pb-16 pt-12 sm:px-6 lg:px-8">
      {/* Action Movies  */}
      <SectionSlider
        title={"Action Movies"}
        subtitle={"Big worlds, bigger battles and unforgettable journeys."}
        movies={ActionMovies}
      />
       <SectionSlider
        title={"Adventure Movies"}
        subtitle={"Big worlds, bigger battles and unforgettable journeys."}
        movies={AdventureMovies}
      />
      <div className="h-5000"></div>
    </div>
  );
};

export default HomeSections;
