import SeriesDetailClientComponent from "@/components/pageComponents/seriesDetail/SeriesDetailClientComponent";
import {
  getSeriesDetails,
  getSeriesSeasonEpisodes,
  getSeriesVideos,
  getSeriesCredits,
  getSimilarSeries,
} from "@/util/api.js";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const series = await getSeriesDetails(resolvedParams.id);
  const title = series?.titleMain || series?.title || series?.name || "Series Details";
  return {
    title: `${title} | Muvi Cinema`,
    description: series?.overview || "Watch latest TV series online on Muvi Cinema.",
  };
}

export default async function SeriesDetailPage({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const [series, initialEpisodes, trailerKey, cast, similarSeries] = await Promise.all([
    getSeriesDetails(id),
    getSeriesSeasonEpisodes(id, 1),
    getSeriesVideos(id),
    getSeriesCredits(id),
    getSimilarSeries(id),
  ]);

  return (
    <SeriesDetailClientComponent
      series={series}
      initialEpisodes={initialEpisodes}
      trailerKey={trailerKey}
      cast={cast}
      similarSeries={similarSeries}
    />
  );
}