import { getFeaturedActionMovies } from "@/util/api";
import SectionSlider from "./SectionSlider";
import { homeSections } from "./sectionsData";

const HomeSections = async () => {
  const [actionMovies] = await Promise.allSettled([
    getFeaturedActionMovies(28),
  ]);

  const ActionMovies = actionMovies.value;
  return (
    <div className="space-y-16 px-4 pb-16 pt-12 sm:px-6 lg:px-8">
      {/* Action Movies  */}
      <SectionSlider
        title={"Action Movies"}
        subtitle={"Big worlds, bigger battles and unforgettable journeys."}
        movies={ActionMovies}
      />
    </div>
  );
};

export default HomeSections;
