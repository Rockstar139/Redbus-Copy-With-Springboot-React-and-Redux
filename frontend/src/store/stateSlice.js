import { createSlice } from "@reduxjs/toolkit";

const formatDateYYYYMMDD = (date) => {
  if (!date) date = new Date();
  return date.toISOString().split("T")[0];
};

const createSearchSlice = (name) => {
  const initialState = {
    page: "",
    txtFrom: "",
    txtTo: "",
    dateOfJourney: formatDateYYYYMMDD(new Date()),
  };

  return createSlice({
    name,
    initialState,
    reducers: {
      setValues: (state, action) => {
        return { ...state, ...action.payload };
      },
      resetValues: () => initialState,
    },
  });
};

export const busStateSlice = createSearchSlice("bus");
export const trainStateSlice = createSearchSlice("train");

export const prevPageStateSlice = createSlice({
  name: "prevPage",
  initialState: "",
  reducers: {
    setValue: (state, action) => action.payload,
    resetValue: () => "",
  },
});

export const loadingStateSlice = createSlice({
  name: "loading",
  initialState: false,
  reducers: {
    setLoading: (state, action) => action.payload,
  },
});

export const loginDefaultsSlice = createSlice({
  name: "loginDefaults",
  initialState: {
    email: "",
    rememberMe: false,
  },
  reducers: {
    setLoginDefaults: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const redirectToPageSlice = createSlice({
  name: "redirectToPage",
  initialState: "",
  reducers: {
    setValue: (state, action) => action.payload,
    resetValue: () => "",
  },
});

export const redirectToPageActions = redirectToPageSlice.actions;
export const loadingStateActions = loadingStateSlice.actions;
export const busStateActions = busStateSlice.actions;
export const trainStateActions = trainStateSlice.actions;
export const prevPageActions = prevPageStateSlice.actions;
export const loginDefaultsActions = loginDefaultsSlice.actions;
