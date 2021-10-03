import React, { createContext, useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "firebase";

export const AirportContext = createContext({});

export const AirportProvider = ({ children }) => {
  const [airports, setAirports] = useState([]);
  const getAairportData = async () => {
    try {
      const q = query(collection(db, "users"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        setAirports({ id: doc.id, ...doc.data() });
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    // getAairportData();
  }, []);
  return (
    <AirportContext.Provider value={{ airports }}>
      {children}
    </AirportContext.Provider>
  );
};
