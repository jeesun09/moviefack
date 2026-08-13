import MovieDetailClientComponent from "@/components/pageComponents/movieDetail/MovieDetailClientComponent";
import { getMovieDetails, getMovieVideos, getMovieCredits, getSimilarMovies } from "@/util/api";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const movie = await getMovieDetails(resolvedParams.id);
  const title = movie?.titleMain || movie?.title || "Movie Details";
  return {
    title: `${title} | Muvi Cinema`,
    description: movie?.overview || "Watch latest movies online on Muvi Cinema.",
  };
}

export default async function MovieDetailPage({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const [movie, trailerKey, cast, similarMovies] = await Promise.all([
    getMovieDetails(id),
    getMovieVideos(id),
    getMovieCredits(id),
    getSimilarMovies(id),
  ]);

  return (
    <MovieDetailClientComponent
      movie={movie}
      trailerKey={trailerKey}
      cast={cast}
      similarMovies={similarMovies}
    />
  );
}
