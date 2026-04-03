import { BASE_URL, handleResponse } from "./apiConfig";

/**
 * Handles user login. Backend sets an HttpOnly refresh token cookie automatically.
 * Returns a short-lived access token in the body.
 */
//to fetch profile
export const fetchProfileApi = async (authToken) => {
  const response = await fetch(`${BASE_URL}/account/profile`, {
    headers: { Authorization: `Bearer ${authToken}` },
  });
  return handleResponse(response);
};

export const fetchBookingsApi = async (authToken) => {
  const response = await fetch(`${BASE_URL}/account/bookings`, {
    headers: { Authorization: `Bearer ${authToken}` },
  });
  return handleResponse(response);
};

export const fetchTransactionsApi = async (authToken) => {
  const response = await fetch(`${BASE_URL}/account/transactions`, {
    headers: { Authorization: `Bearer ${authToken}` },
  });
  return handleResponse(response);
};

export const cancelBookingApi = async (authToken, bookingId) => {
  const response = await fetch(
    `${BASE_URL}/account/cancel-booking/${bookingId}`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${authToken}` },
    },
  );
  return handleResponse(response);
};

export const updateProfileApi = async (authToken, name, age) => {
  const response = await fetch(`${BASE_URL}/account/update-profile`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, age }),
  });
  return handleResponse(response);
};
