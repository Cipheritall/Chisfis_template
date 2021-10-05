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
    // alert(value);
    setIsLoading(true);
    setAirports([]);

    if (value.length >= 1) {
      var strSearch = value;
      var strlength = strSearch.length;
      var strFrontCode = strSearch.slice(0, strlength - 1);
      var strEndCode = strSearch.slice(strlength - 1, strSearch.length);

      var startcode =
        strSearch && strSearch[0].toUpperCase() + strSearch.slice(1);

      var endcode =
        strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);
      var endcodeC = endcode && endcode[0].toUpperCase() + endcode.slice(1);

      const q = query(
        collection(db, "users"),
        where("city", ">=", startcode),
        where("city", "<", endcodeC),
        orderBy("city"),
        limit(3)
      );

      // const q = query(collection(db, "users"), where("country", "==", "India"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.data().country, " => ", doc.data());
        setAirports((airports) => [
          ...airports,
          {
            code: doc.data().code,
            country: doc.data().country,
            city: doc.data().city,
            name: doc.data().name,
          },
        ]);
      });

      console.log(airports, "kdjfs");
      // const citiesRef = await collection(db, "users");
      // const q = await query(citiesRef, where("name", ">=" , value) , where("name", "<=", value + "\uf8ff")
      // );

      // console.log(q);

      // let searchToResults = [];
      // searchToResults = airports.filter((v) =>
      //   v.name.toLowerCase().startsWith(value.toLowerCase())
      // );
      console.log(airports);
      const filteredAir = airports.filter((a) => a.city !== "");
      setSearchToResults(filteredAir);
      setIsLoading(false);
    }
  };

  const handleFromChange = (value) => {
    // console.log(sampleAirpots);

    let searchFromResults = [];
    // if (value) {
    //   searchFromResults = sampleAirpots.filter((v) =>
    //     v.name.toLowerCase().startsWith(value.toLowerCase())
    //   );
    // }
    setSearchFromResults(searchFromResults);
  };

  const renderForm = () => {
    return (
      <form className='w-full relative mt-8 flex flex-col md:flex-row md:items-center rounded-3xl lg:rounded-full shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-900 divide-y divide-neutral-200 md:divide-y-0'>
        <LocationInput
          defaultValue=''
          onInputDone={() => setDateFocused("startDate")}
          onChange={(value) => handleToChange(value)}
          searchResults={searchToResults}
          isLoading={isLoading}
        />

        <StayDatesRangeInput
          defaultValue={dateRangeValue}
          defaultFocus={dateFocused}
          onFocusChange={(focus) => setDateFocused(focus)}
          onChange={(data) => setDateRangeValue(data)}
        />

        <FromLocationInput
          defaultValue=''
          onInputDone={() => setDateFocused("startDate")}
          onChange={(value) => handleFromChange(value)}
          searchResults={searchFromResults}
        />
        {/* <GuestsInput
          defaultValue={guestValue}
          onChange={(data) => setGuestValue(data)}
        /> */}
        {/* BUTTON SUBMIT OF FORM */}
        <div className='px-4 py-4 lg:py-0'>
          <ButtonSubmit />
        </div>
      </form>
    );
  };

  return renderForm();
};

export default StaySearchForm;
