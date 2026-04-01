import { combineReducers, configureStore } from "@reduxjs/toolkit";
import offerReducer from "./offerSlice";
import whatsNewReducer from "./whatsNewSlice";
import offersPageReducer from "./offersPageSlice";
import locationReducer from "./location";
import searchResultReducer from "./searchResultSlice";
import { busStateSlice, trainStateSlice, prevPageStateSlice, loadingStateSlice, loginDefaultsSlice } from "./stateSlice";

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
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["busState", "trainState", "prevPage","loginDefaults"],
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
