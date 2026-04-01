import { useDispatch, useSelector } from "react-redux";
import styles from "../css/Login.module.css";
import { useRef } from "react";
import { loginDefaultsActions } from "../store/stateSlice";

const Login = () => {
  const dispatch = useDispatch();
  const email = useRef();
  const password = useRef();
  const rememberMe = useRef();
  const loginDefaults = useSelector(store=>store.loginDefaults)
  console.log("login",loginDefaults);

  const handleSubmit = (event) => { 
    event.preventDefault();
    let loginDefaultsObj = {
      email: email.current.value,
      rememberMe: rememberMe.current.checked,
    };
    
    dispatch(loginDefaultsActions.setLoginDefaults(loginDefaultsObj));
    
    console.log({
      email: email.current.value,
      password: password.current.value,
      rememberMe: rememberMe.current.checked,
    });
  }
  return (
    <div className="form-signin w-100 m-auto">
      {" "}
      <form onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 fw-normal"><img
          className=""
          src="bus-icon.png"
          alt=""
          width="72"
          height="57"
        /> Please sign in</h1>{" "}
        <div className="form-floating">
          {" "}
          <input
            type="email"
            className={`form-control`}
            id="floatingInput"
            placeholder="name@example.com"
            ref={email}
            defaultValue={loginDefaults.email || ""}
          />{" "}
          <label htmlFor="floatingInput">Email address</label>{" "}
        </div>{" "}
        <div className="form-floating">
          {" "}
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            ref={password}
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
        <button className={`btn btn-primary w-100 py-2 ${styles.loginBtn}`} type="submit">
          Sign in
        </button>{" "}
      </form>{" "}
    </div>
  );
};

export default Login;
