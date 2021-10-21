import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionGridAuthorBox from "components/SectionGridAuthorBox/SectionGridAuthorBox";
import SectionHeroArchivePage from "components/SectionHeroArchivePage/SectionHeroArchivePage";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import React, { FC, useEffect, useState } from "react";
import SectionGridFilterCard from "./SectionGridFilterCard";

import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import FromLocationInput from "components/HeroSearchForm/FromLocationInput";
import { DEMO_STAY_LISTINGS } from "data/listings";
import { StayDataType } from "data/types";
import Heading2 from "components/Heading/Heading2";
import StayCard from "components/StayCard/StayCard";
import WidgetTags from "containers/BlogPage/WidgetTags";
import TabFilters from "containers/ListingExperiencesPage/TabFilters";
import Pagination from "shared/Pagination/Pagination";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

export interface ListingStayPageProps {
  className?: string;
  data?: StayDataType[];
}

const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 8);

const ListingStayPage: FC<ListingStayPageProps> = ({
  className = "",
  data = DEMO_DATA,
}) => {
  const history = useHistory();

  const [showCentres, setShowCentres] = useState(false);
  const [region, setRegion] = useState(null);

  useEffect(() => {
    if (history.location.state) {
      setShowCentres(true);
    }
  }, []);

  const handleRegionChange = (value) => {
    console.log(value);
  };

  const setRegionSel = () => {
    setRegion("Hi");
  };

  const onLocationSelect = (e) => {
    setRegion(e);
    console.log(region);
    setShowCentres(true);
  };

  return (
    <div
      className={`nc-ListingStayPage relative overflow-hidden ${className}`}
      data-nc-id='ListingStayPage'>
      <Helmet>
        <title>Testing Centers</title>
      </Helmet>
      <div className='container relative overflow-hidden mt-10'>
        <Heading2 />

        <GooglePlacesAutocomplete
          apiKey='AIzaSyDNfNT3Ds4oOEXvnzX0LJSDDeJEuzll8ys'
          selectProps={{
            region,
            onChange: onLocationSelect,
          }}
        />
        {!showCentres && (
          <></>

          // <form className='w-full relative flex flex-col border border-neutral-100 md:flex-row md:items-center rounded-3xl lg:rounded-full dark:bg-neutral-900 border-neutral-700 divide-y divide-neutral-200 md:divide-y-0'>
          //   <FromLocationInput
          //     defaultValue=''
          //     // onInputDone={() => setDateFocused("startDate")}
          //     onChange={(value) => handleRegionChange(value)}
          //     searchResults={[]}
          //     onSelect={setRegionSel}
          //   />

          //   <div className='px-4 py-4 lg:py-0'>
          //     <button
          //       type='button'
          //       className='h-14 md:h-16 w-full md:w-16 rounded-full bg-primary-6000 hover:bg-primary-700 flex items-center justify-center text-neutral-50 focus:outline-none'>
          //       <span className='mr-3 md:hidden'>Search</span>
          //       <svg
          //         xmlns='http://www.w3.org/2000/svg'
          //         className='h-6 w-6'
          //         fill='none'
          //         viewBox='0 0 24 24'
          //         stroke='currentColor'>
          //         <path
          //           strokeLinecap='round'
          //           strokeLinejoin='round'
          //           strokeWidth={1.5}
          //           d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
          //         />
          //       </svg>
          //     </button>
          //   </div>
          // </form>
        )}

        <div className='mb-8 lg:mb-11 mt-10'>
          <WidgetTags />
        </div>
      </div>
      <div className='container relative overflow-hidden mt-10'>
        {showCentres && (
          <>
            <div className='mb-8 lg:mb-11'>
              <TabFilters />
            </div>
            <div className='grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {data.map((stay) => (
                <StayCard key={stay.id} data={stay} />
              ))}
            </div>
            <div className='flex mt-16 justify-center items-center'>
              <Pagination />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ListingStayPage;
