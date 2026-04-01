import { createSlice } from "@reduxjs/toolkit";

const searchResultSlice = createSlice({
  name: "Result",
  initialState: {
    data: [],
  },
  reducers: {
    setResults: (state, action) => {
      state.data = action.payload;
    }
  },
});

export const searchResultActions = searchResultSlice.actions;

export default searchResultSlice;
