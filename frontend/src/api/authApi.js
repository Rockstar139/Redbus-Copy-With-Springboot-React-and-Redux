import { BASE_URL, handleResponse } from "./apiConfig";

/**
 * Handles user login. Backend sets an HttpOnly refresh token cookie automatically.
 * Returns a short-lived access token in the body.
 */
export const loginApi = async (username, password) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  return handleResponse(response);
};

/**
 * Registers a new user. Backend defaults role to "USER".
 */
export const signupApi = async (username, password) => {
  const response = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  return handleResponse(response);
};

/**
 * Requests a new access token using the HttpOnly refresh token cookie.
 * Credentials 'include' is necessary for the browser to send cookies.
 */
export const refreshAccessTokenApi = async () => {
    const response = await fetch(`${BASE_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include", // Essential to send cookies across origins
    });
    return handleResponse(response);
  };

/**
 * Logs the user out by asking the backend to clear the HttpOnly cookie.
 */
export const logoutUserApi = async () => {
    const response = await fetch(`${BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include"
    });
    return handleResponse(response);
};
