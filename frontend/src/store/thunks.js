import { fetchSearchApi } from "../api/searchApi";
import { fetchOffersApi, fetchOffersPageApi, fetchWhatsNewApi } from "../api/contentApi";
import { searchResultActions } from "./searchResultSlice";
import { offersActions } from "./offerSlice";
import { offersPageActions } from "./offersPageSlice";
import { whatsNewActions } from "./whatsNewSlice";
import { loadingStateActions } from "./stateSlice";

// Search Results Thunk
export const fetchSearchResults = (filters) => async (dispatch) => {
  try {
    dispatch(loadingStateActions.setLoading(true));
    const data = await fetchSearchApi(filters);
    dispatch(searchResultActions.setResults(data));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(loadingStateActions.setLoading(false));
  }
};

// Offers Thunk
export const fetchOffers = () => async (dispatch) => {
  try {
    dispatch(loadingStateActions.setLoading(true));
    const data = await fetchOffersApi();
    dispatch(offersActions.setOffers(data));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(loadingStateActions.setLoading(false));
  }
};

// Offers Page Thunk
export const fetchOffersPage = () => async (dispatch) => {
  try {
    dispatch(loadingStateActions.setLoading(true));
    const data = await fetchOffersPageApi();
    dispatch(offersPageActions.setOffersPage(data));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(loadingStateActions.setLoading(false));
  }
};

// What's New Thunk
export const fetchWhatsNew = () => async (dispatch) => {
  try {
    dispatch(loadingStateActions.setLoading(true));
    const data = await fetchWhatsNewApi();
    dispatch(whatsNewActions.setWhatsNew(data));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(loadingStateActions.setLoading(false));
  }
};

// Initial App Content Loader Thunk
export const fetchAppContent = () => (dispatch) => {
  dispatch(fetchOffers());
  dispatch(fetchWhatsNew());
};
