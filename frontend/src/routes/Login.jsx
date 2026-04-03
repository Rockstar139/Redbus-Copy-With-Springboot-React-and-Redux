import { useDispatch, useSelector } from "react-redux";
import styles from "../css/Login.module.css";
import { useRef, useState, useEffect } from "react";
import { loginDefaultsActions } from "../store/stateSlice";
import { login } from "../store/thunks";
import { useNavigate, Link } from "react-router";

const Login = () => {
  const dispatch = useDispatch();
  const email = useRef();
  const password = useRef();
  const rememberMe = useRef();
  const loginDefaults = useSelector((store) => store.loginDefaults);
  const redirectToPage = useSelector((store) => store.redirectToPage);
  // Check global auth state from Redux
  const auth = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) {
      if (redirectToPage == "book-tickets") {
        navigate("/book-tickets");
      } else {
        navigate("/account");
      }
    }
  }, [auth, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(login(email.current.value, password.current.value));

    let loginDefaultsObj = {
      email: email.current.value,
      rememberMe: rememberMe.current.checked,
    };
    dispatch(loginDefaultsActions.setLoginDefaults(loginDefaultsObj));
  };
  return (
    <div className={styles.outerWrapper}>
      <div className={styles.innerWrapper}>
        <div className="form-signin w-100 m-auto">
          {" "}
          <form onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 fw-normal">
              <img
                className=""
                src="bus-icon.png"
                alt=""
                width="72"
                height="57"
              />{" "}
              Please sign in
            </h1>{" "}
            <div className="form-floating mt-2">
              {" "}
              <input
                type="text"
                className={`form-control`}
                id="floatingInput"
                placeholder="Username"
                ref={email}
                defaultValue={loginDefaults.email || ""}
                required
              />{" "}
              <label htmlFor="floatingInput">Username</label>{" "}
            </div>{" "}
            <div className="form-floating mt-2">
              {" "}
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                ref={password}
                required
              />{" "}
              <label htmlFor="floatingPassword">Password</label>{" "}
            </div>{" "}
            <div className="form-check text-start my-3">
              {" "}
              <input
                className={`form-check-input ${styles.check}`}
                type="checkbox"
                value="remember-me"
                id="checkDefault"
                ref={rememberMe}
                defaultChecked={loginDefaults.rememberMe || false}
              />{" "}
              <label className="form-check-label" htmlFor="checkDefault">
                Remember me
              </label>{" "}
            </div>{" "}
            <button
              className={`btn btn-primary w-100 py-2 ${styles.loginBtn}`}
              type="submit"
            >
              Login
            </button>{" "}
            <div className="text-center mt-3">
              <small>
                New user?{" "}
                <Link
                  to="/register"
                  style={{
                    color: "blue",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  Create an account
                </Link>
              </small>
            </div>
          </form>{" "}
        </div>
      </div>
    </div>
  );
};

export default Login;
