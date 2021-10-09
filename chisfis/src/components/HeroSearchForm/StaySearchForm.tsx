import React, { useEffect, useState, Fragment } from "react";
import LocationInput from "./LocationInput";
import FromLocationInput from "./FromLocationInput";
import setOnHou from "./FromLocationInput";

import GuestsInput, { GuestsInputProps } from "./GuestsInput";
import { FocusedInputShape } from "react-dates";
import StayDatesRangeInput from "./StayDatesRangeInput";
import ButtonSubmit from "./ButtonSubmit";
import moment from "moment";
import { FC, useContext } from "react";
import { FilterIcon } from "@heroicons/react/solid";

import { Dialog, Popover, Transition } from "@headlessui/react";

import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "firebase";

import AirportJson from "../../airports.json";
import Checkbox from "shared/Checkbox/Checkbox";
import NcInputNumber from "components/NcInputNumber/NcInputNumber";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonThird from "shared/Button/ButtonThird";

export interface DateRage {
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
}

export interface StaySearchFormProps {
  haveDefaultValue?: boolean;
}

// DEFAULT DATA FOR ARCHIVE PAGE
const defaultLocationValue = "Tokyo, Jappan";
const defaultDateRange = {
  startDate: moment(),
  endDate: moment().add(4, "days"),
};
const defaultGuestValue: GuestsInputProps["defaultValue"] = {
  guestAdults: 2,
  guestChildren: 2,
  guestInfants: 1,
};

const StaySearchForm: FC<StaySearchFormProps> = ({
  haveDefaultValue = false,
}) => {
  const [dateRangeValue, setDateRangeValue] = useState<DateRage>({
    startDate: null,
    endDate: null,
  });
  const [locationInputValue, setLocationInputValue] = useState("");
  const [guestValue, setGuestValue] = useState({});

  const [dateFocused, setDateFocused] = useState<FocusedInputShape | null>(
    null
  );

  //const airports = useContext(AirportContext);
  //console.log(airports);

  const [searchToResults, setSearchToResults] = useState([]);
  const [searchFromResults, setSearchFromResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [roundTrip, setRoundTrip] = useState(false);
  const [fullyVaccinated, setFullyVaccinated] = useState(false);
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");

  const [fromTravelRest, setFromTravelRest] = useState({});
  const [toTravelRest, setToTravelRest] = useState({});

  //
  useEffect(() => {
    if (haveDefaultValue) {
      setDateRangeValue(defaultDateRange);
      setLocationInputValue(defaultLocationValue);
      setGuestValue(defaultGuestValue);
    }
  }, []);
  //

  const [airports, setAirports] = useState([]);

  // useEffect(() => {
  //   async function fetchMyAPI() {
  //     const q = query(collection(db, "users"));
  //     const querySnapshot = await getDocs(q);
  //     querySnapshot.forEach((doc) => {
  //       setAirports((airports) => [
  //         ...airports,
  //         {
  //           code: doc.data().code,
  //           country: doc.data().country,
  //           city: doc.data().city,
  //           name: doc.data().name,
  //         },
  //       ]);
  //     });
  //   }
  //   fetchMyAPI();
  // }, []);

  const handleToChange = async (value) => {
    let searchToResults = [];
    // console.log(sampleAirpots);
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

  const docOptions = [
    { name: "Passport", description: "Passport Desc", defaultChecked: true },
    {
      name: "National ID",
      description: "National ID Desc",
      defaultChecked: false,
    },
  ];

  const searchSubmit = () => {
    console.log("sumbit");
    console.log("RoundTrip:" + roundTrip);
    console.log("Vaccinated:" + fullyVaccinated);
    console.log("From Loction:" + fromLocation);
    console.log("To Loction:" + toLocation);
    console.log(
      "Date Range:" + dateRangeValue.startDate + " " + dateRangeValue.endDate
    );
    getSearchedData();
  };

  const getSearchedData = async () => {
    try {
      const q1 = query(
        collection(db, "searchedData"),
        where("searchLocationName", "==", "India")
      );
      const q2 = query(
        collection(db, "searchedData"),
        where("searchLocationName", "==", "United States")
      );
      const querySnapshot1 = await getDocs(q1);
      const querySnapshot2 = await getDocs(q2);
      querySnapshot1.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        setFromTravelRest(doc.data());
      });
      querySnapshot2.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        setToTravelRest(doc.data());
      });
    } catch (err) {
      console.log(err);
    }
  };

  const renderForm = () => {
    return (
      <div className='w-full relative mt-2 '>
        <div className=' py-5 [ nc-hero-field-padding ] flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-10 border-b border-neutral-100 dark:border-neutral-800'>
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
              id='same-drop-off'
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
          <div className='flex  items-center'>
            <div className='flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2'>
              <span className='text-sm text-neutral-500 dark:text-neutral-400 font-normal'>
                <i className='las la-user text-lg'></i>
              </span>
              <Popover className='relative'>
                {({ open, close }) => (
                  <>
                    <Popover.Button
                      className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-neutral-300 dark:border-neutral-700 focus:outline-none ${
                        open ? "!border-primary-500 " : ""
                      }`}>
                      <span>Passport</span>
                    </Popover.Button>
                    <Transition
                      as={Fragment}
                      enter='transition ease-out duration-200'
                      enterFrom='opacity-0 translate-y-1'
                      enterTo='opacity-100 translate-y-0'
                      leave='transition ease-in duration-150'
                      leaveFrom='opacity-100 translate-y-0'
                      leaveTo='opacity-0 translate-y-1'>
                      <Popover.Panel className='absolute z-10 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-md'>
                        <div className='overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700'>
                          <div className='relative flex flex-col px-5 py-6 space-y-5'>
                            {docOptions.map((item) => (
                              <div key={item.name} className=''>
                                <Checkbox
                                  name={item.name}
                                  label={item.name}
                                  subLabel={item.description}
                                />
                              </div>
                            ))}
                          </div>
                          {/* <div className='p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between'>
                          <ButtonThird
                            onClick={close}
                            sizeClass='px-4 py-2 sm:px-5'>
                            Clear
                          </ButtonThird>
                          <ButtonPrimary
                            onClick={close}
                            sizeClass='px-4 py-2 sm:px-5'>
                            Apply
                          </ButtonPrimary>
                        </div> */}
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
            </div>
          </div>
        </div>
        <form className='w-full relative flex flex-col md:flex-row md:items-center rounded-3xl lg:rounded-full shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-900 divide-y divide-neutral-200 md:divide-y-0'>
          <FromLocationInput
            defaultValue=''
            // onInputDone={() => setDateFocused("startDate")}
            onChange={(value) => handleFromChange(value)}
            searchResults={searchFromResults}
            onSelect={setFromLocation}
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

          {/* <GuestsInput
          defaultValue={guestValue}
          onChange={(data) => setGuestValue(data)}
        /> */}
          {/* BUTTON SUBMIT OF FORM */}
          <div className='px-4 py-4 lg:py-0'>
            {/* <ButtonSubmit /> */}
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
    );
  };

  return renderForm();
};

export default StaySearchForm;
