import { loadingStateActions } from "./stateSlice";
import {
  bookTicketApi,
  cancelBookingApi,
  fetchBookingsApi,
  fetchProfileApi,
  fetchTransactionsApi,
  updateProfileApi,
} from "../api/accountApi";
import {
  bookingsActions,
  profileActions,
  transactionsActions,
} from "./accountSlice";
import { authActions } from "./authSlice";

// Thunk to book a ticket
export const bookTicket = (authToken, transportId) => async (dispatch) => {
  try {
    dispatch(loadingStateActions.setLoading(true));
    // Call API to book the ticket
    await bookTicketApi(authToken, transportId);
    // After booking, refresh profile and bookings to show updated wallet balance and new booking
    await dispatch(fetchProfile(authToken));
    await dispatch(fetchBookings(authToken));
    return { success: true };
  } catch (error) {
    console.error(error, "Account|Book Ticket Error");
    // Return the error message to be handled in the component
    return { success: false, message: error.message || "Failed to book ticket." };
  } finally {
    dispatch(loadingStateActions.setLoading(false));
  }
};

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

