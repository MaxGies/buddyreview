"use client";

import React, { useState, useEffect, useContext } from "react";
import { getBooking, getAllRestaurant } from "../app/_actions/action";

interface Booking {
  id: string;
  name: string;
  size: string;
  date: string;
  time: string;
  resId: string;
}

interface Restaurants {
  id: string;
  name: string;
  description: string;
  photo: string[];
}

interface State {
  actions: {
    sendTextFilter: (text: string) => void;
    updateBooking: () => void;
    removeFilter: () => void;
  };
  filterText: string;
  bookingAmount: number;
  bookingList: Booking[];
  resAll: Restaurants[];
  resList: Restaurants[];
}

interface CenterStorageProviderProps {
  children: React.ReactNode;
  initialState?: State;
}

const CenterStorageStateContext = React.createContext<State | undefined>(
  undefined
);

const CenterStorageProvider: React.FC<CenterStorageProviderProps> = ({
  children,
}) => {
  const [filterText, setFilterText] = useState("");
  const [bookingList, setBookingList] = useState<Booking[]>([]);
  const [bookingAmount, setBookingAmount] = useState(0);
  const [isUpdateBooking, setIsUpdateBooking] = useState(false);
  const [resAll, setResAll] = useState([]);
  const [resList, setResList] = useState([]);

  useEffect(() => {
    getAllRestaurant().then((res) => setResAll(res));
  }, []);

  useEffect(() => {
    if (filterText) {
      // const regEx = new RegExp(filterText, "gi");
      // setResList(resAll.filter((res: Restaurants) => regEx.test(res.name)));
      setResList(
        resAll.filter((res: Restaurants) =>
          res.name.toLowerCase().includes(filterText.toLowerCase())
        )
      );
    } else {
      setResList(resAll);
    }
  }, [resAll, filterText]);

  useEffect(() => {
    getBooking().then((res: Booking[]) => {
      setBookingList(res);
      setBookingAmount(res.length);
    });
  }, [isUpdateBooking]);

  const actions = {
    sendTextFilter: (text: string) => {
      setFilterText(text);
    },
    updateBooking: () => {
      setIsUpdateBooking(!isUpdateBooking);
    },
    removeFilter: () => {
      setFilterText("");
    },
  };

  return (
    <CenterStorageStateContext.Provider
      value={{
        actions,
        filterText,
        bookingAmount,
        bookingList,
        resAll,
        resList,
      }}
    >
      {children}
    </CenterStorageStateContext.Provider>
  );
};

function useCenterStorageState(): State {
  const context = useContext(CenterStorageStateContext);
  if (context === undefined) {
    throw new Error(
      "useCenterStorageState must be used within a CenterStorageProvider"
    );
  }
  return context;
}

export { CenterStorageProvider, useCenterStorageState };
