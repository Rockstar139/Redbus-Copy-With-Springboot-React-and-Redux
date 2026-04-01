import { createSlice } from "@reduxjs/toolkit";

const LOCATIONS_DEFAULT = [
  {
    id: "001",
    location: "Delhi",
  },
  {
    id: "002",
    location: "Mumbai",
  },
  {
    id: "003",
    location: "Agra",
  },
  {
    id: "004",
    location: "Dehradun",
  },
  {
    id: "005",
    location: "Jaipur",
  },
  {
    id: "006",
    location: "Udaipur",
  },
  {
    id: "007",
    location: "Lucknow",
  },
  {
    id: "008",
    location: "Etawah",
  },
  {
    id: "009",
    location: "Aligarh",
  },
  {
    id: "010",
    location: "Rameswaram",
  },
];
const locationSlice = createSlice({
  name: "location",
  initialState: LOCATIONS_DEFAULT,
  reducers: {
    getInitialState: (state, action) => {
      return action.payload;
    },
  },
});
export const locationActions = locationSlice.actions;
export default locationSlice;
