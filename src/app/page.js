import { Suspense } from "react";
import Banner from "@/components/pageComponents/homePage/BannerSec/Banner";
import HomeSections from "@/components/pageComponents/homePage/HomeSections";
import HomeSectionsSkeleton from "@/components/pageComponents/homePage/HomeSectionsSkeleton";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-background font-sans text-text">
      <Banner />
      <Suspense fallback={<HomeSectionsSkeleton />}>
        <HomeSections />
      </Suspense>
    </div>
  );
}

