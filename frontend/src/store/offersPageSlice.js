import { createSlice } from "@reduxjs/toolkit";

export const offersPageSlice = createSlice({
  name: "offersPage",
  initialState: [],
  reducers: {
    setOffersPage: (state, action) => {
      return action.payload;
    }
  },
});

export const offersPageActions = offersPageSlice.actions;
export default offersPageSlice.reducer;
