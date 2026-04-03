import { combineReducers, configureStore } from "@reduxjs/toolkit";
import offerReducer from "./offerSlice";
import whatsNewReducer from "./whatsNewSlice";
import offersPageReducer from "./offersPageSlice";
import locationReducer from "./location";
import searchResultReducer from "./searchResultSlice";
import {
  busStateSlice,
  trainStateSlice,
  prevPageStateSlice,
  loadingStateSlice,
  loginDefaultsSlice,
  redirectToPageSlice,
} from "./stateSlice";
import authSlice from "./authSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/es/storage";
import { bookingsSlice, profileSlice, transactionsSlice } from "./accountSlice";

const rootReducer = combineReducers({
  busState: busStateSlice.reducer,
  trainState: trainStateSlice.reducer,
  offers: offerReducer,
  whatsNew: whatsNewReducer,
  offersPage: offersPageReducer,
  locations: locationReducer,
  results: searchResultReducer.reducer,
  prevPage: prevPageStateSlice.reducer,
  loading: loadingStateSlice.reducer,
  loginDefaults: loginDefaultsSlice.reducer,
  auth: authSlice.reducer,
  profile: profileSlice.reducer,
  bookings: bookingsSlice.reducer,
  transactions: transactionsSlice.reducer,
  redirectToPage: redirectToPageSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["busState", "trainState", "prevPage", "loginDefaults","redirectToPage"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const redbusStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(redbusStore);
