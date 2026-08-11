"use client";

import SectionSlider from "./SectionSlider";
import { homeSections } from "./sectionsData";

const HomeSections = () => {
  return (
    <div className="space-y-16 px-4 pb-16 pt-12 sm:px-6 lg:px-8">
      {homeSections.map((section) => (
        <SectionSlider key={section.title} {...section} />
      ))}
    </div>
  );
};

export default HomeSections;
