"use client";

import SectionSliderSkeleton from "@/components/shared/SectionSliderSkeleton";

const HomeSectionsSkeleton = () => {
  return (
    <div className="space-y-16 px-4 pb-20 pt-12 sm:px-6 lg:px-12">
      <SectionSliderSkeleton count={5} />
      <SectionSliderSkeleton count={5} />
      <SectionSliderSkeleton count={5} />
    </div>
  );
};

export default HomeSectionsSkeleton;
