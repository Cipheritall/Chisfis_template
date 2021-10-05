import React, { useEffect, useState } from "react";
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

    // alert(value);
    // setIsLoading(true);
    // setAirports([]);

    // if (value.length >= 1) {
    //   var strSearch = value;
    //   var strlength = strSearch.length;
    //   var strFrontCode = strSearch.slice(0, strlength - 1);
    //   var strEndCode = strSearch.slice(strlength - 1, strSearch.length);

    //   var startcode =
    //     strSearch && strSearch[0].toUpperCase() + strSearch.slice(1);

    //   var endcode =
    //     strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);
    //   var endcodeC = endcode && endcode[0].toUpperCase() + endcode.slice(1);

    //   const q = query(
    //     collection(db, "users"),
    //     where("city", ">=", startcode),
    //     where("city", "<", endcodeC),
    //     orderBy("city"),
    //     limit(3)
    //   );

    //   // const q = query(collection(db, "users"), where("country", "==", "India"));
    //   const querySnapshot = await getDocs(q);
    //   querySnapshot.forEach((doc) => {
    //     // doc.data() is never undefined for query doc snapshots
    //     // console.log(doc.data().country, " => ", doc.data());
    //     setAirports((airports) => [
    //       ...airports,
    //       {
    //         code: doc.data().code,
    //         country: doc.data().country,
    //         city: doc.data().city,
    //         name: doc.data().name,
    //       },
    //     ]);
    //   });

    //   console.log(airports, "kdjfs");
    //   // const citiesRef = await collection(db, "users");
    //   // const q = await query(citiesRef, where("name", ">=" , value) , where("name", "<=", value + "\uf8ff")
    //   // );

    //   // console.log(q);

    //   // let searchToResults = [];
    //   // searchToResults = airports.filter((v) =>
    //   //   v.name.toLowerCase().startsWith(value.toLowerCase())
    //   // );
    //   console.log(airports);
    //   const filteredAir = airports.filter((a) => a.city !== "");
    //   setSearchToResults(filteredAir);
    //   setIsLoading(false);
    // }
  };

  const handleFromChange = (value) => {
    let searchFromResults = [];
    // console.log(sampleAirpots);
    setSearchFromResults(searchFromResults);

    if (!value) {
      setSearchFromResults(searchFromResults);
    }
    if (value) {
      searchFromResults = AirportJson.filter((v) =>
        v.city.toLowerCase().startsWith(value.toLowerCase())
      );
      setSearchFromResults(searchFromResults);
    }
  };

  const searchSubmit = () => {
    console.log("sumbit");
  };

  const renderForm = () => {
    return (
      <form className='w-full relative mt-8 flex flex-col md:flex-row md:items-center rounded-3xl lg:rounded-full shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-900 divide-y divide-neutral-200 md:divide-y-0'>
        <FromLocationInput
          defaultValue=''
          onInputDone={() => setDateFocused("startDate")}
          onChange={(value) => handleFromChange(value)}
          searchResults={searchFromResults}
        />

        <StayDatesRangeInput
          defaultValue={dateRangeValue}
          defaultFocus={dateFocused}
          onFocusChange={(focus) => setDateFocused(focus)}
          onChange={(data) => setDateRangeValue(data)}
        />
        <LocationInput
          defaultValue=''
          onInputDone={() => setDateFocused("startDate")}
          onChange={(value) => handleToChange(value)}
          searchResults={searchToResults}
          isLoading={isLoading}
        />

        <div className=' py-5 [ nc-hero-field-padding ] flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-10 border-b border-neutral-100 dark:border-neutral-800'>
          <div className='flex  items-center'>
            <input
              id='same-drop-off'
              name='drop-off-type'
              type='checkbox'
              value='round_trip'
              className='focus:ring-primary-500 h-4 w-4 text-primary-500 border-neutral-300'
              checked={roundTrip}
              onChange={() => setRoundTrip(!roundTrip)}
            />
            <label
              htmlFor='same-drop-off'
              className='ml-2 sm:ml-3 block text-sm font-medium text-gray-700 dark:text-neutral-300'>
              Round Trip
            </label>
          </div>
        </div>

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
    );
  };

  return renderForm();
};

export default StaySearchForm;
