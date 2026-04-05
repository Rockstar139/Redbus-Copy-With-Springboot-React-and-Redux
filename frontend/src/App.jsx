import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { refreshAccessToken } from "./store/thunks";
import { authActions } from "./store/authSlice";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const loginDefaults = useSelector((store) => store.loginDefaults);
  //if page refreshed we will check session for token as well

  // const { pathname } = useLocation();

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [pathname]); // Runs every time the URL path changes

  /**
   * Effect to restore login state on refresh.
   * Checks for a refresh token cookie in the backend and obtains a new access token.
   */
  useEffect(() => {
    if (!auth.isAuthenticated && loginDefaults.rememberMe) {
      dispatch(refreshAccessToken());
    }
  }, [auth, dispatch]);

  // Optionally don't render until authentication initialization is checked
  // if (!auth.isInitialized) return <div style={{textAlign: 'center', marginTop: '50px'}}>Initializing...</div>;

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
