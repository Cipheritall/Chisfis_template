import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionGridAuthorBox from "components/SectionGridAuthorBox/SectionGridAuthorBox";
import SectionHeroArchivePage from "components/SectionHeroArchivePage/SectionHeroArchivePage";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import React, { FC, Fragment, useEffect, useState } from "react";
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
import Geocode from "react-geocode";
import { query, collection, getDocs } from "@firebase/firestore";
import { db } from "firebase";
import { Popover, Transition } from "@headlessui/react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonThird from "shared/Button/ButtonThird";
import Checkbox from "shared/Checkbox/Checkbox";

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
  const [latLon, setLatLon] = useState({});

  const [testCentres, setAllTestCentres] = useState([]);
  const [testProviders, setAllTestProviders] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getAllTestCentres();
    if (history.location.state) {
      setShowCentres(true);
    }
  }, []);

  const getAllTestCentres = async () => {
    setIsLoaded(true);
    const q1 = query(collection(db, "testCentres"));
    const q2 = query(collection(db, "testProviders"));
    const querySnapshot1 = await getDocs(q1);
    const querySnapshot2 = await getDocs(q2);
    let testCen = [];
    let testPro = [];
    querySnapshot1.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      testCen.push(doc.data());
    });
    querySnapshot2.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      testPro.push(doc.data());
    });
    setAllTestCentres(testCen);
    setAllTestProviders(testPro);
    console.log(testCen);
    setIsLoaded(false);
  };

  const onLocationSelect = (e) => {
    setRegion(e);
    console.log(region);
    setShowCentres(true);
    Geocode.setApiKey("AIzaSyDNfNT3Ds4oOEXvnzX0LJSDDeJEuzll8ys");
    Geocode.setLanguage("en");
    Geocode.enableDebug();
    Geocode.fromAddress(e.label).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setLatLon({ lat, lng });
        console.log(lat, lng);
        findNearTest(19.0759837, 72.8776559);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  const testCentress = [
    {
      name: "t1",
      lat: 19.090326792232343,
      lng: 72.83746502202662,
    },
    {
      name: "t1",
      lat: 19.08070130222621,
      lng: 72.8701366333966,
    },
    {
      name: "t2",
      lat: 28.70089677183948,
      lng: 77.2154385236084,
    },
  ];
  const findNearTest = (lat, lng) => {
    let arr = [];
    testCentres.map((tc) =>
      arr.push(getDistanceBetween(lat, lng, tc.latitude, tc.longitude, "Km"))
    );
    console.log(arr);
  };

  const getDistanceBetween = (lat1, lon1, lat2, lon2, unit) => {
    var p = 0.017453292519943295; // Math.PI / 180
    var c = Math.cos;
    var a =
      0.5 -
      c((lat2 - lat1) * p) / 2 +
      (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km

    // let theta = lng1 - lng2;
    // let distance =
    //   Math.sin((lat1 * Math.PI) / 180) * Math.sin((lat2 * Math.PI) / 180) +
    //   Math.cos((lat1 * Math.PI) / 180) *
    //     Math.cos((lat2 * Math.PI) / 180) *
    //     Math.cos((theta * Math.PI) / 180);
    // distance = Math.acos(distance);
    // distance = (distance * Math.PI) / 180;
    // distance = distance * 60 * 1.515 * 1.609344;
    // return distance;
  };

  const renderXClear = () => {
    return (
      <span className='w-4 h-4 rounded-full bg-primary-500 text-white flex items-center justify-center ml-3 cursor-pointer'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-3 w-3'
          viewBox='0 0 20 20'
          fill='currentColor'>
          <path
            fillRule='evenodd'
            d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
            clipRule='evenodd'
          />
        </svg>
      </span>
    );
  };
  const renderTabsPriceRage = () => {
    return (
      <>
        {testProviders.map((pro) => (
          <Popover className='relative'>
            {({ open, close }) => (
              <>
                <Popover.Button
                  className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-primary-500 bg-primary-50 text-primary-700 focus:outline-none `}>
                  <span>{pro.providerName}</span>
                  {renderXClear()}
                </Popover.Button>
              </>
            )}
          </Popover>
        ))}
      </>
    );
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
              {/* <TabFilters /> */}
              <div className='flex lg:space-x-4'>
                <div className='hidden lg:flex space-x-4'>
                  {renderTabsPriceRage()}
                </div>
              </div>
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
