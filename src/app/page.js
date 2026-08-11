import Banner from "@/components/pageComponents/homePage/BannerSec/Banner";
import HomeSections from "@/components/pageComponents/homePage/HomeSections";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-background font-sans text-text">
      <Banner />
      <HomeSections />
    </div>
  );
}
