import React from "react";
import MyRouter from "routers/index";
import { db } from "./firebase";

import { collection, addDoc } from "firebase/firestore";
// import { AirportProvider } from "context/AirportContext";
const airports = require("./airports.json");
function App() {
  // const addData = () => {
  //   try {
  //     airports.map(async (data) => {
  //       const docRef = await addDoc(collection(db, "airports"), {
  //         code: data.code,
  //         lat: data.lat,
  //         lon: data.lon,
  //         name: data.name,
  //         city: data.city,
  //         state: data.state,
  //         country: data.country,
  //         woeid: data.woeid,
  //         tz: data.tz,
  //         phone: data.phone,
  //         type: data.type,
  //         email: data.email,
  //         url: data.url,
  //         runway_length: data.runway_length,
  //         elev: data.elev,
  //         icao: data.icao,
  //         direct_flights: data.direct_flights,
  //         carriers: data.carriers,
  //       });
  //       console.log("Document written with ID: ", docRef.id);
  //     });
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }
  // };

  return (
    <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
        <MyRouter />
      {/* <button style={{ fontSize: 50 }} onClick={addData}>
        submit
      </button> */}
    </div>
  );
}

export default App;
