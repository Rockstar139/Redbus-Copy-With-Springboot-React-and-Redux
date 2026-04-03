import { createSlice } from "@reduxjs/toolkit";

/**
 * Redux slice for managing authentication state.
 * Access Token is held only in memory (Redux) for security.
 * Refresh Token is handled by the browser via HttpOnly cookies.
 */

const getInitialAuth = () => {
  const token = sessionStorage.getItem("token");
  const username = sessionStorage.getItem("username");
  return {
    token: token || null,
    username: username || null,
    isAuthenticated: !!token, // Convert to boolean
    isInitialized: false,
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialAuth(),
  reducers: {
    // Called after successful login or successful token refresh
    loginSuccess: (state, action) => {
      const {token, username} = action.payload;
      state.token = token;
      state.username = username;
      state.isAuthenticated = true;
      state.isInitialized = true;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("username", username);
    },
    // Clears state on logout or failed refresh
    logout: (state) => {
      state.token = null;
      state.username = null;
      state.isAuthenticated = false;
      state.isInitialized = true;
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("username");  
    },
    // Indicates initial refresh attempt is complete
    setInitialized: (state) => {
        state.isInitialized = true;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
