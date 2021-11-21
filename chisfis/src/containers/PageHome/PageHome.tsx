import SectionHeroArchivePage from "components/SectionHeroArchivePage/SectionHeroArchivePage";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import React, { Fragment, useEffect, useState } from "react";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import SectionOurFeatures from "components/SectionOurFeatures/SectionOurFeatures";
import SectionGridFeaturePlaces from "./SectionGridFeaturePlaces";
import SectionHowItWork from "components/SectionHowItWork/SectionHowItWork";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import { TaxonomyType } from "data/types";
import SectionGridAuthorBox from "components/SectionGridAuthorBox/SectionGridAuthorBox";
import SectionGridCategoryBox from "components/SectionGridCategoryBox/SectionGridCategoryBox";
import SectionBecomeAnAuthor from "components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
import SectionVideos from "./SectionVideos";
import SectionClientSay from "components/SectionClientSay/SectionClientSay";
import carUtilities1 from "../../images/carUtilities/1.png";
import carUtilities2 from "../../images/carUtilities/2.png";
import carUtilities3 from "../../images/carUtilities/3.png";
import carUtilities4 from "../../images/carUtilities/4.png";
import carUtilities5 from "../../images/carUtilities/5.png";
import carUtilities6 from "../../images/carUtilities/6.png";
import carUtilities7 from "../../images/carUtilities/7.png";
import carUtilities8 from "../../images/carUtilities/8.png";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";

import Label from "components/Label/Label";
import Avatar from "shared/Avatar/Avatar";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
import Textarea from "shared/Textarea/Textarea";
import CommonLayout from "../../../src/containers/AccountPage/CommonLayout";

import { Popover, Tab, Transition } from "@headlessui/react";
import mastercardPng from "images/mastercard.svg";
import visaPng from "images/vis.png";
import { Helmet } from "react-helmet";

import HIW1img from "images/HIW1.png";
import HIW2img from "images/HIW2.png";
import HIW3img from "images/HIW3.png";
import HeroSearchForm from "components/HeroSearchForm/HeroSearchForm";
import StaySearchForm, {
  DateRage,
} from "../../components/HeroSearchForm/StaySearchForm";
import {
  query,
  collection,
  where,
  getDocs,
  orderBy,
} from "@firebase/firestore";
import FromLocationInput from "components/HeroSearchForm/FromLocationInput";
import LocationInput from "components/HeroSearchForm/LocationInput";
import StayDatesRangeInput from "components/HeroSearchForm/StayDatesRangeInput";
import { db } from "firebase";
import { FocusedInputShape } from "react-dates";
import Checkbox from "shared/Checkbox/Checkbox";
import AirportJson from "../../airports.json";
import Heading from "components/Heading/Heading";
import { count } from "console";
import { Link } from "react-router-dom";
import Badge from "shared/Badge/Badge";
import NcImage from "shared/NcImage/NcImage";
import convertNumbThousand from "utils/convertNumbThousand";

const DEMO_CATS_2: TaxonomyType[] = [
  {
    id: "1",
    href: "#",
    name: "Enjoy the great cold",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/5764100/pexels-photo-5764100.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  },
  {
    id: "222",
    href: "#",
    name: "Sleep in a floating way",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/2869499/pexels-photo-2869499.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "3",
    href: "#",
    name: "In the billionaire's house",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/7031413/pexels-photo-7031413.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "4",
    href: "#",
    name: "Cool in the deep forest",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/247532/pexels-photo-247532.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "5",
    href: "#",
    name: "In the billionaire's house",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/7031413/pexels-photo-7031413.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
];

const Amenities_demos = [
  { name: "Exit from India may be restricted ", icon: carUtilities1 },
  {
    name: "Travel is allowed with restrictions ",
    icon: carUtilities2,
  },
  {
    name: "Mandatory COVID-19 testing on day 2 and day 8 in England for unvaccinated travelers",
    icon: carUtilities3,
  },
  {
    name: "Mandatory 10-day quarantine for England for unvaccinated travelers",
    icon: carUtilities4,
  },
  { name: "8-inch color touchscreen display audio", icon: carUtilities5 },
  { name: "Smart Cruise Control with Stop & Go (SCC)", icon: carUtilities6 },
  { name: "LED Daytime Running Lights (DRL)", icon: carUtilities7 },
  { name: "Blind-Spot Collision Warning (BCW)", icon: carUtilities8 },
];

const docOptions = [
  { name: "Passport", description: "Passport Desc", defaultChecked: true },
  {
    name: "National ID",
    description: "National ID Desc",
    defaultChecked: false,
  },
];

function PageHome() {
  const [dateRangeValue, setDateRangeValue] = useState<DateRage>({
    startDate: null,
    endDate: null,
  });
  const [locationInputValue, setLocationInputValue] = useState("");
  const [guestValue, setGuestValue] = useState({});

  const [dateFocused, setDateFocused] = useState<FocusedInputShape | null>(
    null
  );

  const [searchToResults, setSearchToResults] = useState([]);
  const [searchFromResults, setSearchFromResults] = useState([]);
  const [roundTrip, setRoundTrip] = useState(false);
  const [fullyVaccinated, setFullyVaccinated] = useState(false);
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [isSearchDone, setSearchDone] = useState(false);

  const [fromTravelRest, setFromTravelRest] = useState({
    TravelRestrictions: [],
    AdditionalInformation: [],
    Documents: [],
    searchLocationName: "",
  });
  const [toTravelRest, setToTravelRest] = useState({
    TravelRestrictions: [],
    AdditionalInformation: [],
    Documents: [],
    searchLocationName: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [resLoaded, setResLoaded] = useState(false);

  const handleToChange = async (value) => {
    let searchToResults = [];
    setSearchToResults(searchToResults);
    if (!value) {
      setSearchToResults(searchToResults);
    }
    if (value) {
      searchToResults = AirportJson.filter((v) =>
        v.city.toLowerCase().startsWith(value.toLowerCase())
      );
      setSearchToResults(searchToResults);
    }
  };

  const handleFromChange = (value) => {
    console.log(
      "🚀 ~ file: PageHome.tsx ~ line 196 ~ handleFromChange ~ value",
      value
    );
    let searchFromResults = [];
    // console.log(sampleAirpots);
    setSearchFromResults(searchFromResults);

    if (!value) {
      setSearchFromResults(searchFromResults);
    }
    if (value) {
      searchFromResults = AirportJson.filter(
        (v) =>
          v.city.toLowerCase().startsWith(value.toLowerCase()) ||
          v.country.toLowerCase().startsWith(value.toLowerCase()) ||
          v.name.toLowerCase().startsWith(value.toLowerCase())
      );

      setSearchFromResults(searchFromResults);
    }
  };

  const searchSubmit = () => {
    // console.log("sumbit");
    // console.log("RoundTrip:" + roundTrip);
    // console.log("Vaccinated:" + fullyVaccinated);
    // console.log(
    //   "🚀 ~ file: PageHome.tsx ~ line 206 ~ searchSubmit ~ fromLocation",
    //   fromLocation
    // );
    // console.log(
    //   "🚀 ~ file: PageHome.tsx ~ line 208 ~ searchSubmit ~ toLocation",
    //   toLocation
    // );

    if (
      fromLocation &&
      toLocation &&
      dateRangeValue.startDate &&
      dateRangeValue.endDate
    ) {
      getSearchedData();
    }
  };

  const getSearchedData = async () => {
    // try {
    setIsLoading(true);
    setSearchDone(false);
    let fromData = {
      TravelRestrictions: [],
      AdditionalInformation: [],
      Documents: [],
      searchLocationName: "",
    };

    setFromTravelRest(fromData);

    let toData = {
      TravelRestrictions: [],
      AdditionalInformation: [],
      Documents: [],
      searchLocationName: "",
    };

    setToTravelRest(toData);

    const q1 = query(
      collection(db, "searchedData"),
      where("searchLocationName", "==", fromLocation)
    );
    console.log(
      "🚀 ~ file: PageHome.tsx ~ line 236 ~ getSearchedData ~ q1",
      q1
    );

    const q2 = query(
      collection(db, "searchedData"),
      where("searchLocationName", "==", toLocation)
    );

    const querySnapshot1 = await getDocs(q1);

    querySnapshot1.forEach((doc) => {
      console.log(
        "🚀 ~ file: PageHome.tsx ~ line 245 ~ querySnapshot1.forEach ~ doc",
        doc
      );
      const data = doc.data();
      console.log("TLL: getSearchedData -> data = " + data);

      if (data.TravelRestrictions) {
        fromData["TravelRestrictions"] = data.TravelRestrictions;
        fromData["AdditionalInformation"] = data.AdditionalInformation;
        fromData["Documents"] = data.Documents;
        fromData["searchLocationName"] = data.searchLocationName;
        setFromTravelRest(fromData);
      } else {
        console.log("No data");
      }
    });

    const querySnapshot2 = await getDocs(q2);

    querySnapshot2.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      const data = doc.data();
      console.log(
        "TLL: getSearchedData -> data = " + data.searchLocationName,
        data.Documents
      );

      toData["TravelRestrictions"] = data.TravelRestrictions;
      console.log(
        "🚀 ~ file: PageHome.tsx ~ line 300 ~ querySnapshot2.forEach ~ data.TravelRestrictions",
        data.TravelRestrictions
      );
      toData["AdditionalInformation"] = data.AdditionalInformation;
      toData["Documents"] = data.Documents;
      toData["searchLocationName"] = data.searchLocationName;
      setToTravelRest(toData);
      console.log("TLL: getSearchedData -> toData = " + toData);
    });
    // } catch (err) {
    //   console.log(err);
    // }
    setIsLoading(false);
    setResLoaded(true);
    setSearchDone(true);
  };

  const [travelDestinations, setTravelDestinations] = useState([]);

  useEffect(() => {
    const loadFormData = async () => {
      try {
        const q1 = query(
          collection(db, "TravelDestinations"),
          orderBy("visits", "desc")
        );

        const querySnapshot1 = await getDocs(q1);
        let data = [];
        querySnapshot1.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          data.push(doc.data());
        });
        setTravelDestinations(data);
      } catch (err) {
        console.log(err);
      }
    };

    setIsLoading(true);
    loadFormData();
    setIsLoading(false);
  }, []);

  return (
    <div className='nc-PageHome relative overflow-hidden'>
      <Helmet>
        <title>Test & Trip</title>
      </Helmet>

      <div className='container relative space-y-24 mb-24 lg:space-y-32 lg:mb-32'>
        {/* SECTION HERO */}
        {/*}
        <SectionHeroArchivePage
          currentPage="Stay"
          currentTab="Stay"
          className="pt-10 pb-24 lg:pb-32 lg:pt-28 "
        />
  */}

        <div
          className='nc-SectionHero flex flex-col-reverse lg:flex-col relative pt-10 lg:pt-32 pb-16'
          data-nc-id='SectionHero'>
          <div className='z-10 mb-12 lg:mb-0 lg:-mt-40 w-full'>
            <div className='w-full relative mt-2 '>
              <div className=' py-10 mt-10 [ nc-hero-field-padding ] flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-10'>
                <div className='flex  items-center'>
                  <input
                    id='same-drop-off'
                    name='drop-off-type'
                    type='checkbox'
                    value='round_trip'
                    className='focus:ring-action-primary h-6 w-6 text-primary border-primary rounded border-neutral-500 bg-white dark:bg-neutral-700  dark:checked:bg-primary-500'
                    checked={roundTrip}
                    onChange={() => setRoundTrip(!roundTrip)}
                  />
                  <label
                    htmlFor='same-drop-off'
                    className='ml-2 sm:ml-3 block text-sm font-medium text-gray-700 dark:text-neutral-300'>
                    Round Trip
                  </label>
                </div>
                <div className='flex  items-center'>
                  <input
                    id='same-drop-off-2'
                    name='drop-off-type'
                    type='checkbox'
                    value='fully_vaccinated'
                    className='focus:ring-action-primary h-6 w-6 text-primary border-primary rounded border-neutral-500 bg-white dark:bg-neutral-700  dark:checked:bg-primary-500'
                    checked={fullyVaccinated}
                    onChange={() => setFullyVaccinated(!fullyVaccinated)}
                  />
                  <label
                    htmlFor='same-drop-off'
                    className='ml-2 sm:ml-3 block text-sm font-medium text-gray-700 dark:text-neutral-300'>
                    Fully Vaccinated
                  </label>
                </div>
              </div>
              <form className='w-full relative flex flex-col border border-neutral-100 md:flex-row md:items-center rounded-3xl lg:rounded-full dark:bg-neutral-900 border-neutral-700 divide-y divide-neutral-200 md:divide-y-0'>
                <FromLocationInput
                  defaultValue=''
                  // onInputDone={() => setDateFocused("startDate")}
                  onChange={(value) => handleFromChange(value)}
                  searchResults={searchFromResults}
                  onSelect={setFromLocation}
                  placeHolder='From'
                />
                <LocationInput
                  defaultValue=''
                  onInputDone={() => setDateFocused("startDate")}
                  onChange={(value) => handleToChange(value)}
                  searchResults={searchToResults}
                  onSelect={setToLocation}
                />

                <StayDatesRangeInput
                  defaultValue={dateRangeValue}
                  defaultFocus={dateFocused}
                  onFocusChange={(focus) => setDateFocused(focus)}
                  onChange={(data) => setDateRangeValue(data)}
                />

                <div className='px-4 py-4 lg:py-0'>
                  <button
                    type='button'
                    onClick={searchSubmit}
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
            </div>
          </div>
          {(toTravelRest["TravelRestrictions"].length !== 0 &&
            fromTravelRest["TravelRestrictions"].length !== 0) ||
          !isLoading ? (
            <>
              {toTravelRest["TravelRestrictions"].length !== 0 &&
              fromTravelRest["TravelRestrictions"].length !== 0 ? (
                <div className={`nc-SectionSliderNewCategories relative`}>
                  {/* <h3 className='text-2xl font-semibold'>Departure</h3> */}
                  <div className='mt-6'>
                    <Tab.Group>
                      <Tab.List className='flex'>
                        <Tab as={Fragment}>
                          {({ selected }) => (
                            <button
                              className={`px-4 py-1.5 sm:px-6 sm:py-2.5 rounded-full focus:outline-none ${
                                selected
                                  ? "bg-neutral-800 text-white"
                                  : "text-neutral-6000 dark:text-neutral-400"
                              }`}>
                              Departure
                            </button>
                          )}
                        </Tab>
                        {roundTrip && (
                          <Tab as={Fragment}>
                            {({ selected }) => (
                              <button
                                className={`px-4 py-1.5 sm:px-6 sm:py-2.5  rounded-full flex items-center justify-center focus:outline-none  ${
                                  selected
                                    ? "bg-neutral-800 text-white"
                                    : " text-neutral-6000 dark:text-neutral-400"
                                }`}>
                                <span className='mr-2.5'>Return</span>
                              </button>
                            )}
                          </Tab>
                        )}
                      </Tab.List>

                      <div className='w-14 border-b border-neutral-200 my-5'></div>
                      <Tab.Panels>
                        <Tab.Panel className='space-y-5'>
                          <div>
                            <Disclosure>
                              {({ open }) => (
                                <>
                                  <Disclosure.Button className='flex justify-between w-full px-4 py-5 text-sm font-medium text-left text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75'>
                                    <span>Visa Requirements</span>
                                    <ChevronUpIcon
                                      className={`${
                                        open ? "transform rotate-180" : ""
                                      } w-5 h-5 text-gray-500`}
                                    />
                                  </Disclosure.Button>
                                  <Disclosure.Panel className='px-4 pt-4 pb-2 text-sm text-gray-500'>
                                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-10 text-sm text-neutral-700 dark:text-neutral-300 '>
                                      {/* TIEN ICH 1 */}
                                      {fromTravelRest["TravelRestrictions"].map(
                                        (item) => (
                                          <div
                                            key={item}
                                            className='flex items-center space-x-4 '>
                                            <div className='w-10 flex-shrink-0'>
                                              <img src={carUtilities2} alt='' />
                                            </div>
                                            <span>{item}</span>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </Disclosure.Panel>
                                </>
                              )}
                            </Disclosure>
                            <Disclosure as='div' className='mt-2'>
                              {({ open }) => (
                                <>
                                  <Disclosure.Button className='flex justify-between w-full px-4 py-5 text-sm font-medium text-left text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75'>
                                    <span>Travel Restrictions</span>
                                    <ChevronUpIcon
                                      className={`${
                                        open ? "transform rotate-180" : ""
                                      } w-5 h-5 text-gray-500`}
                                    />
                                  </Disclosure.Button>
                                  <Disclosure.Panel className='px-4 pt-4 pb-2 text-sm text-gray-500'>
                                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-10 text-sm text-neutral-700 dark:text-neutral-300 '>
                                      {/* TIEN ICH 1 */}
                                      {fromTravelRest["TravelRestrictions"].map(
                                        (item) => (
                                          <div
                                            key={item}
                                            className='flex items-center space-x-4 '>
                                            <div className='w-10 flex-shrink-0'>
                                              <img src={carUtilities2} alt='' />
                                            </div>
                                            <span>{item}</span>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </Disclosure.Panel>
                                </>
                              )}
                            </Disclosure>
                            <Disclosure as='div' className='mt-2'>
                              {({ open }) => (
                                <>
                                  <Disclosure.Button className='flex justify-between w-full px-4 py-5 text-sm font-medium text-left text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75'>
                                    <span>Forms and documents</span>
                                    <ChevronUpIcon
                                      className={`${
                                        open ? "transform rotate-180" : ""
                                      } w-5 h-5 text-gray-500`}
                                    />
                                  </Disclosure.Button>
                                  <Disclosure.Panel className='px-4 pt-4 pb-2 text-sm text-gray-500'>
                                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-10 text-sm text-neutral-700 dark:text-neutral-300 '>
                                      {/* TIEN ICH 1 */}
                                      {fromTravelRest["TravelRestrictions"].map(
                                        (item) => (
                                          <div
                                            key={item}
                                            className='flex items-center space-x-4 '>
                                            <div className='w-10 flex-shrink-0'>
                                              <img src={carUtilities2} alt='' />
                                            </div>
                                            <span>{item}</span>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </Disclosure.Panel>
                                </>
                              )}
                            </Disclosure>
                            <Disclosure as='div' className='mt-2'>
                              {({ open }) => (
                                <>
                                  <Disclosure.Button className='flex justify-between w-full px-4 py-5 text-sm font-medium text-left text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75'>
                                    <span>Additional Information</span>
                                    <ChevronUpIcon
                                      className={`${
                                        open ? "transform rotate-180" : ""
                                      } w-5 h-5 text-gray-500`}
                                    />
                                  </Disclosure.Button>
                                  <Disclosure.Panel className='px-4 pt-4 pb-2 text-sm text-gray-500'>
                                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-10 text-sm text-neutral-700 dark:text-neutral-300 '>
                                      {/* TIEN ICH 1 */}
                                      {fromTravelRest["TravelRestrictions"].map(
                                        (item) => (
                                          <div
                                            key={item}
                                            className='flex items-center space-x-4 '>
                                            <div className='w-10 flex-shrink-0'>
                                              <img src={carUtilities2} alt='' />
                                            </div>
                                            <span>{item}</span>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </Disclosure.Panel>
                                </>
                              )}
                            </Disclosure>
                          </div>
                        </Tab.Panel>
                        <Tab.Panel className='space-y-5'>
                          <div>
                            <Disclosure>
                              {({ open }) => (
                                <>
                                  <Disclosure.Button className='flex justify-between w-full px-4 py-5 text-sm font-medium text-left text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75'>
                                    <span>Visa Requirements</span>
                                    <ChevronUpIcon
                                      className={`${
                                        open ? "transform rotate-180" : ""
                                      } w-5 h-5 text-gray-500`}
                                    />
                                  </Disclosure.Button>
                                  <Disclosure.Panel className='px-4 pt-4 pb-2 text-sm text-gray-500'>
                                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-10 text-sm text-neutral-700 dark:text-neutral-300 '>
                                      {/* TIEN ICH 1 */}
                                      {fromTravelRest["TravelRestrictions"].map(
                                        (item) => (
                                          <div
                                            key={item}
                                            className='flex items-center space-x-4 '>
                                            <div className='w-10 flex-shrink-0'>
                                              <img src={carUtilities2} alt='' />
                                            </div>
                                            <span>{item}</span>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </Disclosure.Panel>
                                </>
                              )}
                            </Disclosure>
                            <Disclosure as='div' className='mt-2'>
                              {({ open }) => (
                                <>
                                  <Disclosure.Button className='flex justify-between w-full px-4 py-5 text-sm font-medium text-left text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75'>
                                    <span>Travel Restrictions</span>
                                    <ChevronUpIcon
                                      className={`${
                                        open ? "transform rotate-180" : ""
                                      } w-5 h-5 text-gray-500`}
                                    />
                                  </Disclosure.Button>
                                  <Disclosure.Panel className='px-4 pt-4 pb-2 text-sm text-gray-500'>
                                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-10 text-sm text-neutral-700 dark:text-neutral-300 '>
                                      {/* TIEN ICH 1 */}
                                      {fromTravelRest["TravelRestrictions"].map(
                                        (item) => (
                                          <div
                                            key={item}
                                            className='flex items-center space-x-4 '>
                                            <div className='w-10 flex-shrink-0'>
                                              <img src={carUtilities2} alt='' />
                                            </div>
                                            <span>{item}</span>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </Disclosure.Panel>
                                </>
                              )}
                            </Disclosure>
                            <Disclosure as='div' className='mt-2'>
                              {({ open }) => (
                                <>
                                  <Disclosure.Button className='flex justify-between w-full px-4 py-5 text-sm font-medium text-left text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75'>
                                    <span>Forms and documents</span>
                                    <ChevronUpIcon
                                      className={`${
                                        open ? "transform rotate-180" : ""
                                      } w-5 h-5 text-gray-500`}
                                    />
                                  </Disclosure.Button>
                                  <Disclosure.Panel className='px-4 pt-4 pb-2 text-sm text-gray-500'>
                                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-10 text-sm text-neutral-700 dark:text-neutral-300 '>
                                      {/* TIEN ICH 1 */}
                                      {fromTravelRest["TravelRestrictions"].map(
                                        (item) => (
                                          <div
                                            key={item}
                                            className='flex items-center space-x-4 '>
                                            <div className='w-10 flex-shrink-0'>
                                              <img src={carUtilities2} alt='' />
                                            </div>
                                            <span>{item}</span>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </Disclosure.Panel>
                                </>
                              )}
                            </Disclosure>
                            <Disclosure as='div' className='mt-2'>
                              {({ open }) => (
                                <>
                                  <Disclosure.Button className='flex justify-between w-full px-4 py-5 text-sm font-medium text-left text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75'>
                                    <span>Additional Information</span>
                                    <ChevronUpIcon
                                      className={`${
                                        open ? "transform rotate-180" : ""
                                      } w-5 h-5 text-gray-500`}
                                    />
                                  </Disclosure.Button>
                                  <Disclosure.Panel className='px-4 pt-4 pb-2 text-sm text-gray-500'>
                                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-10 text-sm text-neutral-700 dark:text-neutral-300 '>
                                      {/* TIEN ICH 1 */}
                                      {fromTravelRest["TravelRestrictions"].map(
                                        (item) => (
                                          <div
                                            key={item}
                                            className='flex items-center space-x-4 '>
                                            <div className='w-10 flex-shrink-0'>
                                              <img src={carUtilities2} alt='' />
                                            </div>
                                            <span>{item}</span>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </Disclosure.Panel>
                                </>
                              )}
                            </Disclosure>
                          </div>
                        </Tab.Panel>
                      </Tab.Panels>
                    </Tab.Group>
                  </div>
                </div>
              ) : (
                isSearchDone && (
                  <h2
                    style={{ marginLeft: "50%" }}
                    className='text-lg text-neutral-900 dark:text-neutral-100 font-semibold flex-grow py-6'>
                    No data found
                  </h2>
                )
              )}
            </>
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
        {/* SECTION 1 */}
        {/* <SectionSliderNewCategories categories={DEMO_CATS} /> */}

        {/* SECTION2 */}
        {/* <SectionOurFeatures /> */}

        {/* SECTION */}

        {/* SECTION */}
        {/*}
         <div>

<SectionGridFeaturePlaces />
</div>
              */}

        {/* SECTION 1 */}
        {/* <SectionGridCategoryBox /> */}

        <div className={`nc-SectionGridCategoryBox relative`}>
          <Heading
            desc='Top places to travel from your location'
            isCenter={false}>
            Popular Destinations
          </Heading>
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 md:gap-8`}>
            {travelDestinations.map((td, i) => (
              // <CardComponentName key={i} taxonomy={item} />
              <Link
                key={td.destinationName}
                to={{
                  pathname: "/travel-destination-detail",
                  state: { destinationDetails: td },
                }}
                className={`nc-CardCategoryBox1 relative flex items-center p-3 sm:p-6 [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ]`}
                data-nc-id='CardCategoryBox1'>
                <Badge
                  className='absolute right-2 top-2'
                  color='gray'
                  name={convertNumbThousand(td.visits)}
                />

                <div className='relative flex-shrink-0 w-24 h-24 rounded-full overflow-hidden'>
                  <NcImage
                    src={td.destinationImage}
                    containerClassName='absolute inset-0'
                  />
                </div>
                <div className='ml-4 flex-grow overflow-hidden'>
                  <h2 className='text-base font-medium'>
                    <span className='line-clamp-1'>{td.destinationName}</span>
                  </h2>
                  <span
                    className={`block mt-2 text-sm text-neutral-500 dark:text-neutral-400`}>
                    Restrictions apply
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* <div className='relative py-16'>
          <BackgroundSection className='bg-orange-50 dark:bg-black dark:bg-opacity-20 ' />
          <SectionSliderNewCategories
            categories={DEMO_CATS_2}
            categoryCardType='card4'
            itemPerRow={4}
            heading='Suggestions for discovery'
            subHeading='Popular places to stay that Chisfis recommends for you'
            sliderStyle='style2'
          />
        </div> */}

        {/* SECTION */}
        {/* <SectionSubscribe2 /> */}

        {/* SECTION */}
        {/* <div className='relative py-16'>
          <BackgroundSection className='bg-orange-50 dark:bg-black dark:bg-opacity-20 ' />
          <SectionGridAuthorBox />
        </div> */}

        {/* SECTION */}
        {/* <div className='relative py-16'>
          <BackgroundSection />
          <SectionBecomeAnAuthor />
        </div> */}

        {/* SECTION 1 */}
        {/* <SectionSliderNewCategories
          heading='Explore by types of stays'
          subHeading='Explore houses based on 10 types of stays'
          categoryCardType='card5'
          itemPerRow={5}
        /> */}

        {/* SECTION */}
        {/* <SectionVideos /> */}

        {/* SECTION */}
        {/* <div className='relative py-16'>
          <BackgroundSection />
          <SectionClientSay />
        </div> */}
      </div>
    </div>
  );
}

export default PageHome;
