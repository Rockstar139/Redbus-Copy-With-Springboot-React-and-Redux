import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
  name: "profile",
  initialState: [{ name: "", age: "", walletBalance: 0 }],
  reducers: {
    setProfile: (state, action) => {
      return action.payload;
    },
  },
});

export const bookingsSlice = createSlice({
  name: "bookings",
  initialState: [],
  reducers: {
    setBookings: (state, action) => {
      return action.payload;
    }
  },
});

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState: [],
  reducers: {
    setTransactions: (state, action) => {
      return action.payload;
    },
  },
});

export const profileActions = profileSlice.actions;
export const bookingsActions = bookingsSlice.actions;
export const transactionsActions = transactionsSlice.actions;