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
import { AirportContext } from "context/AirportContext";
import { FilterIcon } from "@heroicons/react/solid";

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

  const airports = useContext(AirportContext);
  //console.log(airports);

  const [searchToResults, setSearchToResults] = useState([]);
  const [searchFromResults, setSearchFromResults] = useState([]);

  //
  useEffect(() => {
    if (haveDefaultValue) {
      setDateRangeValue(defaultDateRange);
      setLocationInputValue(defaultLocationValue);
      setGuestValue(defaultGuestValue);
    }
  }, []);
  //

  const handleToChange = (value) => {
    // console.log(sampleAirpots);

    let searchToResults = [];
    if (value) {
      searchToResults = airports.filter((v) =>
        v.name.toLowerCase().startsWith(value.toLowerCase())
      );
    }
    setSearchToResults(searchToResults);
  };

  const handleFromChange = (value) => {
    // console.log(sampleAirpots);

    let searchFromResults = [];
    if (value) {
      searchFromResults = airports.filter((v) =>
        v.name.toLowerCase().startsWith(value.toLowerCase())
      );
    }
    setSearchFromResults(searchFromResults);
  };

  const renderForm = () => {
    return (
      <form className="w-full relative mt-8 flex flex-col md:flex-row md:items-center rounded-3xl lg:rounded-full shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-900 divide-y divide-neutral-200 md:divide-y-0">
        <LocationInput
          defaultValue=""
          onInputDone={() => setDateFocused("startDate")}
          onChange={(value) => handleToChange(value)}
          searchResults={searchToResults}
        />

        <StayDatesRangeInput
          defaultValue={dateRangeValue}
          defaultFocus={dateFocused}
          onFocusChange={(focus) => setDateFocused(focus)}
          onChange={(data) => setDateRangeValue(data)}
        />

        <FromLocationInput
          defaultValue=""
          onInputDone={() => setDateFocused("startDate")}
          onChange={(value) => handleFromChange(value)}
          searchResults={searchFromResults}
        />
        {/* <GuestsInput
          defaultValue={guestValue}
          onChange={(data) => setGuestValue(data)}
        /> */}
        {/* BUTTON SUBMIT OF FORM */}
        <div className="px-4 py-4 lg:py-0">
          <ButtonSubmit />
        </div>
      </form>
    );
  };

  return renderForm();
};

const sampleAirpots = [
  {
    code: "AAA",
    lat: "-17.3595",
    lon: "-145.494",
    name: "Anaa Airport",
    city: "Anaa",
    state: "Tuamotu-Gambier",
    country: "French Polynesia",
    woeid: "12512819",
    tz: "Pacific/Midway",
    phone: "",
    type: "Airports",
    email: "",
    url: "",
    runway_length: "4921",
    elev: "7",
    icao: "NTGA",
    direct_flights: "2",
    carriers: "1",
  },
  {
    code: "AAE",
    lat: "36.8236",
    lon: "7.8103",
    name: "El Mellah Airport",
    city: "El Tarf",
    state: "Annaba",
    country: "Algeria",
    woeid: "12510325",
    tz: "Africa/Algiers",
    phone: "",
    type: "Airports",
    email: "",
    url: "",
    runway_length: "9843",
    elev: "16",
    icao: "DABB",
    direct_flights: "6",
    carriers: "2",
  },
  {
    code: "AAL",
    lat: "57.0952",
    lon: "9.85606",
    name: "Aalborg Airport",
    city: "Norresundby",
    state: "Nordjylland",
    country: "Denmark",
    woeid: "12512587",
    tz: "Europe/Copenhagen",
    phone: "",
    type: "Airports",
    email: "",
    url: "http://www.aal.dk/",
    runway_length: "8700",
    elev: "10",
    icao: "EKYT",
    direct_flights: "7",
    carriers: "10",
  },
  {
    code: "AAM",
    lat: "-24.8",
    lon: "31.5333",
    name: "Mala Mala",
    city: "Mala Mala",
    state: "",
    country: "South Africa",
    woeid: "55921381",
    tz: "Africa/Johannesburg",
    phone: "",
    type: "Airports",
    email: "",
    url: "",
    runway_length: "4420",
    elev: "1200",
    icao: "FAMD",
    direct_flights: "1",
    carriers: "1",
  },
  {
    code: "AAN",
    lat: "24.25",
    lon: "55.75",
    name: "Al Ain Airport",
    city: "Ayn al Faydah",
    state: "Abu Dhabi",
    country: "United Arab Emirates",
    woeid: "12523371",
    tz: "Asia/Dubai",
    phone: "",
    type: "Airports",
    email: "",
    url: "",
    runway_length: null,
    elev: null,
    icao: "OMAL",
    direct_flights: "12",
    carriers: "9",
  },
  {
    code: "AAQ",
    lat: "44.9",
    lon: "37.3167",
    name: "Olkhovka Airport",
    city: "Novorossiysk",
    state: "Krasnodarskiy Kray",
    country: "Russia",
    woeid: "12516605",
    tz: "Europe/Moscow",
    phone: "",
    type: "Airports",
    email: "",
    url: "",
    runway_length: null,
    elev: null,
    icao: "URKA",
    direct_flights: "24",
    carriers: "15",
  },
  {
    code: "AAR",
    lat: "56.3088",
    lon: "10.6154",
    name: "Tirstrup Airport",
    city: "Kolind",
    state: "Midtjylland",
    country: "Denmark",
    woeid: "12512604",
    tz: "Europe/Copenhagen",
    phone: "+45 8775 7000",
    type: "Airports",
    email: "",
    url: "http://www.aar.dk",
    runway_length: "9127",
    elev: "81",
    icao: "EKAH",
    direct_flights: "9",
    carriers: "8",
  },
  {
    code: "AAT",
    lat: "47.7406",
    lon: "88.0845",
    name: "Altay Airport",
    city: "Altay",
    state: "Xinjiang",
    country: "China",
    woeid: "12511977",
    tz: "Asia/Urumqi",
    phone: "",
    type: "Airports",
    email: "",
    url: "",
    runway_length: null,
    elev: null,
    icao: "ZWAT",
    direct_flights: "1",
    carriers: "1",
  },
  {
    code: "AAX",
    lat: "-19.5603",
    lon: "-46.9653",
    name: "Romeu Zuma Airport",
    city: "Arax\u00e1",
    state: "Minas Gerais",
    country: "Brazil",
    woeid: "12511034",
    tz: "America/Sao_Paulo",
    phone: "",
    type: "Airports",
    email: "",
    url: "",
    runway_length: "6230",
    elev: "3274",
    icao: "SBAX",
    direct_flights: "2",
    carriers: "1",
  },
  {
    code: "AAY",
    lat: "16.1947",
    lon: "52.1694",
    name: "Al Gaidah Airport",
    city: "Al Ghaydah",
    state: "Hadramawt",
    country: "Yemen",
    woeid: "12523000",
    tz: "Asia/Aden",
    phone: "",
    type: "Airports",
    email: "",
    url: "",
    runway_length: "8858",
    elev: "98",
    icao: "OYGD",
    direct_flights: "3",
    carriers: "2",
  },
  {
    code: "ABA",
    lat: "53.7167",
    lon: "91.4333",
    name: "Abakan",
    city: "Abakan",
    state: "Khakasiya",
    country: "Russian Federation",
    woeid: "2119917",
    tz: "Asia/Krasnoyarsk",
    phone: "",
    type: "Airports",
    email: "",
    url: "",
    runway_length: null,
    elev: null,
    icao: "UNAA",
    direct_flights: "4",
    carriers: "3",
  },
];

export default StaySearchForm;
