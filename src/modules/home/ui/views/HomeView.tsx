import React from "react";
import { CategoriesSection } from "../sections/CategoriesSection";
import { HomeVideosSection } from "../sections/HomeVideosSection";

interface HomeViewProps {
  categoryId?: string;
}

const HomeView = ({ categoryId }: HomeViewProps) => {
  return (
    <div className="max-w-[2400px] mx-auto mb-10 px-4 pt-2.5 flex flex-col gap-y-6">
      <CategoriesSection categoryId={categoryId}></CategoriesSection>
      <HomeVideosSection categoryId={categoryId}></HomeVideosSection>
    </div>
  );
};

export default HomeView;
