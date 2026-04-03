import { loadingStateActions } from "./stateSlice";
import { cancelBookingApi, fetchBookingsApi, fetchProfileApi, fetchTransactionsApi, updateProfileApi } from "../api/accountApi";
import { bookingsActions, profileActions, transactionsActions } from "./accountSlice";
import { authActions } from "./authSlice";

// fetchProfile Thunk
export const fetchProfile = (authToken) => async (dispatch) => {
  try {
    dispatch(loadingStateActions.setLoading(true));
    const data = await fetchProfileApi(authToken);
    dispatch(profileActions.setProfile(data));
  } catch (error) {
    dispatch(authActions.logout());
    console.log(error, "Account|Profile Error");
  } finally {
    dispatch(loadingStateActions.setLoading(false));
  }
};

// fetchBookings Thunk
export const fetchBookings = (authToken) => async (dispatch) => {
  try {
    dispatch(loadingStateActions.setLoading(true));
    const data = await fetchBookingsApi(authToken);
    dispatch(bookingsActions.setBookings(data));
  } catch (error) {
    dispatch(authActions.logout());
    console.log(error, "Account|Bookings Error");
  } finally {
    dispatch(loadingStateActions.setLoading(false));
  }
};

// fetchTransactions Thunk
export const fetchTransactions = (authToken) => async (dispatch) => {
  try {
    dispatch(loadingStateActions.setLoading(true));
    const data = await fetchTransactionsApi(authToken);
    dispatch(transactionsActions.setTransactions(data));
  } catch (error) {
    dispatch(authActions.logout());
    console.log(error, "Account|Profile Error");
  } finally {
    dispatch(loadingStateActions.setLoading(false));
  }
};


export const cancelBooking = (authToken, bookingId)=> async (dispatch) => {
  try{
    dispatch(loadingStateActions.setLoading(true));
    await cancelBookingApi(authToken,bookingId);
  }catch(error){
    console.log(error, "Account|Cancel Booking Error");
  }finally{
    dispatch(loadingStateActions.setLoading(false));
  }
};

export const updateProfile = (authToken, name, age)=> async (dispatch)=>{
  try{
    dispatch(loadingStateActions.setLoading(true));
    await updateProfileApi(authToken,name,age);
  }catch(error){
    console.log(error, "Account|Update Profile Error");
  }finally{
    dispatch(loadingStateActions.setLoading(false));
  }
}

