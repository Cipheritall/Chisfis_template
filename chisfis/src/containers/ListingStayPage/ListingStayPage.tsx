import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionGridAuthorBox from "components/SectionGridAuthorBox/SectionGridAuthorBox";
import SectionHeroArchivePage from "components/SectionHeroArchivePage/SectionHeroArchivePage";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import React, { FC, Fragment, useEffect, useState } from "react";
import SectionGridFilterCard from "./SectionGridFilterCard";

import { Helmet } from "react-helmet";
import { Link, useHistory } from "react-router-dom";
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
import { ClockIcon } from "@heroicons/react/solid";
import { title } from "process";
import WidgetHeading1 from "containers/BlogPage/WidgetHeading1";
import Tag from "shared/Tag/Tag";
import { NONAME } from "dns";

export interface ListingStayPageProps {
  className?: string;
  data?: StayDataType[];
  testCentres?: [];
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
  const [filteredTestCentres, setFilteredTestCentres] = useState([]);
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
    setFilteredTestCentres(testCen);
    setAllTestProviders(testPro);
    console.log(testCen);
    setIsLoaded(false);
  };

  const onLocationSelect = (e) => {
    setRegion(e);
  };

  const searchRegion = () => {
    setIsLoaded(true);
    setShowCentres(true);
    Geocode.setApiKey("AIzaSyDNfNT3Ds4oOEXvnzX0LJSDDeJEuzll8ys");
    Geocode.setLanguage("en");
    Geocode.enableDebug();
    Geocode.fromAddress(region.label).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setLatLon({ lat, lng });
        console.log(lat, lng);
        findNearTest(lat, lng);
      },
      (error) => {
        console.error(error);
      }
    );
    setIsLoaded(false);
    setShowCentres(true);
  };

  const findNearTest = (lat, lng) => {
    let arr = [];
    testCentres.map((tc) =>
      arr.push(getDistanceBetween(lat, lng, tc.latitude, tc.longitude, "Km"))
    );

    let filteredTests = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] < 500) {
        filteredTests.push(testCentres[i]);
      }
    }

    setFilteredTestCentres(filteredTests);

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

  const [activeFilters, setActiveFilters] = useState([]);
  const [filTest, setFilTest] = useState([]);

  const handleFilter = (e) => {
    let fil = activeFilters;
    let filteredTests = [];
    if (fil.includes(e.target.value)) {
      let ind = fil.indexOf(e.target.value);
      console.log(ind);
      fil.splice(ind, 1);
      filteredTests = filteredTests.filter(
        (f) => f.provider !== e.target.value
      );
    } else {
      fil.push(e.target.value);
    }
    if (fil.length < 1) {
      setFilTest(filteredTests);
    } else {
      for (let i = 0; i < filteredTestCentres.length; i++) {
        if (fil.includes(filteredTestCentres[i].provider)) {
          console.log(testCentres[i].provider);
          filteredTests.push(filteredTestCentres[i]);
        }
      }

      setFilTest(filteredTests);
      setActiveFilters(fil);
    }
  };

  return (
    <div
      className={`nc-ListingStayPage relative overflow-hidden ${className} mb-10`}
      data-nc-id='ListingStayPage'>
      <Helmet>
        <title>Testing Centers</title>
      </Helmet>
      <div className='container relative mt-10'>
        <Heading2 />

        <form className='w-full relative flex flex-col border border-neutral-100 md:flex-row md:items-center rounded-3xl lg:rounded-full dark:bg-neutral-900 border-neutral-700 divide-y divide-neutral-200 md:divide-y-0'>
          <div className='relative flex nc-flex-1.5'>
            <div className='flex flex-1 relative [ nc-hero-field-padding ] flex-shrink-0 items-center space-x-3 cursor-pointer focus:outline-none text-left'>
              <div className='flex-grow'>
                <GooglePlacesAutocomplete
                  apiKey='AIzaSyDNfNT3Ds4oOEXvnzX0LJSDDeJEuzll8ys'
                  selectProps={{
                    value: region,
                    onChange: onLocationSelect,
                    className:
                      "block w-full border-none xl:text-lg font-semibold placeholder-neutral-800 dark:placeholder-neutral-200",
                    placeholder: "Search...",
                    styles: {
                      boxShadow: "none",
                      control: (styles) => ({
                        ...styles,
                        border: "0",
                        // boxShadow: "0",
                        boxShadow: "none",
                      }),
                      option: (base) => ({
                        ...base,
                        boxShadow: "none",
                        border: "0",

                        overflowY: "auto",
                        fontDisplay: "Poppins",
                        fontBody: "Poppins",
                        fontSize: "16px",
                        fontWeight: "500",
                        marginLeft: "5px",
                        paddingTop: "1.25em",
                        paddingBottom: "1.25em",
                      }),
                    },
                  }}
                />
              </div>
            </div>
          </div>

          <div className='px-4 py-4 lg:py-0'>
            <button
              type='button'
              onClick={searchRegion}
              className='h-14 md:h-16 w-full md:w-16 rounded-full bg-primary-6000 hover:bg-primary-700 flex items-center justify-center text-neutral-50 focus:outline-none'>
              <span className='mr-3 md:hidden'>Search</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1.5}
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
            </button>
          </div>
        </form>

        {/* <GooglePlacesAutocomplete
          apiKey='AIzaSyDNfNT3Ds4oOEXvnzX0LJSDDeJEuzll8ys'
          selectProps={{
            region,
            onChange: onLocationSelect,
          }}
        /> */}

        <div className='mb-20 lg:mb-11 mt-10'>
          <div className='mt-10'></div>
        </div>
        {!isLoaded ? (
          showCentres ? (
            <div className='mb-8 lg:mb-11 mt-10'>
              <div
                className={`nc-WidgetTags rounded-3xl overflow-hidden bg-neutral-100 dark:bg-neutral-800`}
                data-nc-id='WidgetTags'>
                <WidgetHeading1
                  title='🏷 Filter By Providers'
                  viewAll={{ label: "View all", href: "/#" }}
                />
                <div className='flex flex-wrap p-4 xl:p-5'>
                  {testProviders.map((tp) => (
                    <button
                      onClick={handleFilter}
                      key={tp.providerName}
                      value={tp.providerName}
                      className={
                        !activeFilters.includes(tp.providerName)
                          ? `nc-Tag inline-block bg-white text-sm text-neutral-600 py-2 px-3 rounded-lg border border-neutral-100 md:py-2.5 md:px-4 
                        dark:bg-neutral-700 dark:border-neutral-700 hover:border-neutral-200 dark:hover:border-neutral-6000 mr-2 mb-2`
                          : `nc-Tag inline-block bg-primary-6000 text-neutral-50 text-sm py-2 px-3 rounded-lg border border-neutral-100 md:py-2.5 md:px-4 
                          dark:bg-neutral-700 dark:border-neutral-700 hover:border-neutral-200 dark:hover:border-neutral-6000 mr-2 mb-2`
                      }
                      data-nc-id='Tag'>
                      {tp.providerName}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : null
        ) : null}
      </div>

      {!isLoaded ? (
        showCentres ? (
          <div className='container relative overflow-hidden mt-10'>
            <>
              <div className='mb-8 lg:mb-11'>
                <div className='flex lg:space-x-4'>
                  <div className='hidden lg:flex space-x-4'>
                    {/* {renderTabsPriceRage()} */}
                    <TabFilters />
                  </div>
                </div>
              </div>
              <div className='grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {activeFilters.length > 0 ? (
                  filTest.length > 0 ? (
                    filTest.map((tc) => (
                      <Link
                        to='/booking-page'
                        className={`nc-StayCard group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow ${className}`}
                        data-nc-id='StayCard'>
                        <div className={"p-4 space-y-4"}>
                          <div className='space-y-2'>
                            <span className='text-sm text-neutral-500 dark:text-neutral-400'>
                              Provider - {tc.provider}
                            </span>
                            <div className='flex items-center space-x-2'>
                              {/* {isAds && <Badge name='ADS' color='green' />} */}
                              <h2
                                className={` font-medium capitalize ${"text-lg"}`}>
                                <span className='line-clamp-1'>
                                  {tc.testCentreName}
                                </span>
                              </h2>
                            </div>
                            <div className='flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2'>
                              <span className=''>{tc.location}</span>
                            </div>
                          </div>
                          <div className='w-14 border-b border-neutral-100 dark:border-neutral-800'></div>
                          <div
                            className='listingSection__wrap'
                            style={{
                              border: "0px",
                              margin: "0px",
                              padding: "0px",
                            }}>
                            <div className='w-14'></div>
                            <div className='grid gap-3 text-sm text-neutral-700 dark:text-neutral-300 '>
                              {tc.properties.map((item) => (
                                <div
                                  key={item}
                                  className='flex items-center space-x-3'>
                                  <i className='las la-check-circle text-2xl'></i>
                                  <span>{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className='flex justify-between items-center pt-3'>
                            <span className='text-base font-semibold'>
                              <div className='flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2'>
                                <span className='text-sm text-neutral-500 dark:text-neutral-400 font-normal'>
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='h-5 w-5'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'>
                                    <path
                                      strokeLinecap='round'
                                      strokeLinejoin='round'
                                      strokeWidth={1.5}
                                      d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                                    />
                                    <path
                                      strokeLinecap='round'
                                      strokeLinejoin='round'
                                      strokeWidth={1.5}
                                      d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                                    />
                                  </svg>
                                </span>

                                <span className='text-sm text-neutral-500 dark:text-neutral-400 font-normal'>
                                  Open in Map
                                </span>
                              </div>
                            </span>
                            {/* {!!reviewStart && (
                          <StartRating reviewCount={reviewCount} point={reviewStart} />
                        )} */}

                            <div
                              className={`nc-StartRating flex items-center space-x-1 text-sm  ${className}`}
                              data-nc-id='StartRating'>
                              <ClockIcon className='w-5 h-5 text-gray-500' />
                              <span className='text-neutral-500 dark:text-neutral-400'>
                                {tc.openingTime} - {tc.closingTime}
                              </span>
                            </div>
                          </div>

                          <div className='flex justify-between items-center pt-3'>
                            <ButtonThird
                              className='ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50'
                              sizeClass='px-4 py-2 sm:px-5'>
                              Book Now
                            </ButtonThird>
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <h2 className='text-lg text-neutral-900 dark:text-neutral-100 font-semibold flex-grow'>
                      No test centres near you
                    </h2>
                  )
                ) : filteredTestCentres.length > 0 ? (
                  filteredTestCentres.map((tc) => (
                    <Link
                      to='/booking-page'
                      className={`nc-StayCard group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow ${className}`}
                      data-nc-id='StayCard'>
                      <div className={"p-4 space-y-4"}>
                        <div className='space-y-2'>
                          <span className='text-sm text-neutral-500 dark:text-neutral-400'>
                            Provider - {tc.provider}
                          </span>
                          <div className='flex items-center space-x-2'>
                            {/* {isAds && <Badge name='ADS' color='green' />} */}
                            <h2
                              className={` font-medium capitalize ${"text-lg"}`}>
                              <span className='line-clamp-1'>
                                {tc.testCentreName}
                              </span>
                            </h2>
                          </div>
                          <div className='flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2'>
                            <span className=''>{tc.location}</span>
                          </div>
                        </div>
                        <div className='w-14 border-b border-neutral-100 dark:border-neutral-800'></div>
                        <div
                          className='listingSection__wrap'
                          style={{
                            border: "0px",
                            margin: "0px",
                            padding: "0px",
                          }}>
                          <div className='w-14'></div>
                          <div className='grid gap-3 text-sm text-neutral-700 dark:text-neutral-300 '>
                            {tc.properties.map((item) => (
                              <div
                                key={item}
                                className='flex items-center space-x-3'>
                                <i className='las la-check-circle text-2xl'></i>
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className='flex justify-between items-center pt-3'>
                          <span className='text-base font-semibold'>
                            <div className='flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2'>
                              <span className='text-sm text-neutral-500 dark:text-neutral-400 font-normal'>
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  className='h-5 w-5'
                                  fill='none'
                                  viewBox='0 0 24 24'
                                  stroke='currentColor'>
                                  <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={1.5}
                                    d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                                  />
                                  <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={1.5}
                                    d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                                  />
                                </svg>
                              </span>

                              <span className='text-sm text-neutral-500 dark:text-neutral-400 font-normal'>
                                Open in Map
                              </span>
                            </div>
                          </span>
                          {/* {!!reviewStart && (
                          <StartRating reviewCount={reviewCount} point={reviewStart} />
                        )} */}

                          <div
                            className={`nc-StartRating flex items-center space-x-1 text-sm  ${className}`}
                            data-nc-id='StartRating'>
                            <ClockIcon className='w-5 h-5 text-gray-500' />
                            <span className='text-neutral-500 dark:text-neutral-400'>
                              {tc.openingTime} - {tc.closingTime}
                            </span>
                          </div>
                        </div>

                        <div className='flex justify-between items-center pt-3'>
                          <ButtonThird
                            className='ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50'
                            sizeClass='px-4 py-2 sm:px-5'>
                            Book Now
                          </ButtonThird>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <h2 className='text-lg text-neutral-900 dark:text-neutral-100 font-semibold flex-grow'>
                    No test centres near you
                  </h2>
                )}
              </div>
              {filteredTestCentres.length > 0 && (
                <div className='flex mt-16 justify-center items-center'>
                  <Pagination />
                </div>
              )}
            </>
          </div>
        ) : null
      ) : (
        <div style={{ marginLeft: "50%" }} className='py-6'>
          <svg
            className='animate-spin -ml-1 mr-3 h-5 w-5'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'>
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='3'></circle>
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
          </svg>
        </div>
      )}
    </div>
  );
};

export default ListingStayPage;
