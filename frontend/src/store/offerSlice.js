import { createSlice } from "@reduxjs/toolkit";

export const offerSlice = createSlice({
  name: "offers",
  initialState: [],
  reducers: {
    setOffers: (state, action) => {
      return action.payload;
    }
  },
});

export const offersActions = offerSlice.actions;
export default offerSlice.reducer;
