import { fetchSearchApi, fetchSearchByIdApi } from "../api/searchApi";
import {
  fetchOffersApi,
  fetchOffersPageApi,
  fetchWhatsNewApi,
} from "../api/contentApi";
import { searchResultActions } from "./searchResultSlice";
import { offersActions } from "./offerSlice";
import { offersPageActions } from "./offersPageSlice";
import { whatsNewActions } from "./whatsNewSlice";
import { loadingStateActions } from "./stateSlice";
import {
  loginApi,
  signupApi,
  refreshAccessTokenApi,
  logoutUserApi,
} from "../api/authApi";
import { authActions } from "./authSlice";

// Search Results Thunk
export const fetchSearchResults = (filters) => async (dispatch) => {
  try {
    dispatch(loadingStateActions.setLoading(true));
    const data = await fetchSearchApi(filters);
    dispatch(searchResultActions.setResults(data));
  } catch (error) {
    console.log(error, "Search Error");
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
    console.log(error,"Offers Error");
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
    console.log(error,"Offers Page Error");
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
    console.log(error,"Whats New Error");
  } finally {
    dispatch(loadingStateActions.setLoading(false));
  }
};

// Login Thunk
export const login = (username, password) => async (dispatch) => {
  try {
    dispatch(loadingStateActions.setLoading(true));
    const data = await loginApi(username, password);
    dispatch(
      authActions.loginSuccess({
        token: data.token,
        username: data.username,
      }),
    );
  } catch (error) {
    console.log(error, "Login Error");
  } finally {
    dispatch(loadingStateActions.setLoading(false));
  }
};

// Signup Thunk
export const signup = (username, password) => async (dispatch) => {
  try {
    dispatch(loadingStateActions.setLoading(true));
    await signupApi(username, password);
  } catch (error) {
    console.log(error,"Signup Error");
  } finally {
    dispatch(loadingStateActions.setLoading(false));
  }
};

// refresaccesstoken Thunk
export const refreshAccessToken = () => async (dispatch) => {
  try {
    dispatch(loadingStateActions.setLoading(true));
    const data = await refreshAccessTokenApi();
    dispatch(authActions.loginSuccess({
                token: data.token,
                username: data.username
            }));
  } catch (error) {
    dispatch(authActions.logout());
    console.log(error,"refreshAccessToken Error");
  } finally {
    dispatch(loadingStateActions.setLoading(false));
  }
};

// logout Thunk
export const logoutUser = () => async (dispatch) => {
  try {
    dispatch(loadingStateActions.setLoading(true));
    await logoutUserApi();
  } catch (error) {
    console.log(error, "logoutUser Error");
  } finally {
    dispatch(authActions.logout());
    dispatch(loadingStateActions.setLoading(false));
  }
};

// Initial App Content Loader Thunk
export const fetchAppContent = () => (dispatch) => {
  dispatch(fetchOffers());
  dispatch(fetchWhatsNew());
};

// Search Results Thunk
export const fetchResultbyId = (id) => async (dispatch) => {
  try {
    dispatch(loadingStateActions.setLoading(true));
    const data = await fetchSearchByIdApi(id);
    dispatch(searchResultActions.setResult(data));
  } catch (error) {
    console.log(error, "Search By Id Error");
  } finally {
    dispatch(loadingStateActions.setLoading(false));
  }
};


