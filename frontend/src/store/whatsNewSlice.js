import { createSlice } from "@reduxjs/toolkit";

export const whatsNewSlice = createSlice({
  name: "whatsNew",
  initialState: [],
  reducers: {
    setWhatsNew: (state, action) => {
      return action.payload;
    }
  },
});

export const whatsNewActions = whatsNewSlice.actions;
export default whatsNewSlice.reducer;
