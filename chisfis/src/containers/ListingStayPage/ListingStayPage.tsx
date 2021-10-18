import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionGridAuthorBox from "components/SectionGridAuthorBox/SectionGridAuthorBox";
import SectionHeroArchivePage from "components/SectionHeroArchivePage/SectionHeroArchivePage";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import React, { FC } from "react";
import SectionGridFilterCard from "./SectionGridFilterCard";

import { Helmet } from "react-helmet";

export interface ListingStayPageProps {
  className?: string;
}

const ListingStayPage: FC<ListingStayPageProps> = ({ className = "" }) => {
  return (
    <div
      className={`nc-ListingStayPage relative overflow-hidden ${className}`}
      data-nc-id="ListingStayPage"
    >
      <Helmet>
        <title>Testing Centers</title>
      </Helmet>
      

      <div className="container relative overflow-hidden mt-10">
     
  
        {/* SECTION */}
        <SectionGridFilterCard className="pb-24 lg:pb-32" />

     
      </div>
    </div>
  );
};

export default ListingStayPage;
