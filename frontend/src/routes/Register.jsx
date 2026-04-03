import { useDispatch } from "react-redux";
import styles from "../css/Login.module.css";
import { useRef, useState } from "react";
import { signup } from "../store/thunks";
import { useNavigate } from "react-router";

/**
 * Register component for new user signup.
 * Restricts roles to "USER" as enforced by the backend.
 */
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    // Basic client-side validation
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setError("Passwords do not match");
      return;
    }

    // Call signup API
    dispatch(signup(usernameRef.current.value, passwordRef.current.value));

    navigate("/login");
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
              Create Account
            </h1>{" "}
            {/* Feedback messages */}
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="form-floating mt-2">
              {" "}
              <input
                type="text"
                className={`form-control`}
                id="regUsername"
                placeholder="Username"
                ref={usernameRef}
                required
              />{" "}
              <label htmlFor="regUsername">Username</label>{" "}
            </div>{" "}
            <div className="form-floating mt-2">
              {" "}
              <input
                type="password"
                className="form-control"
                id="regPassword"
                placeholder="Password"
                ref={passwordRef}
                required
              />{" "}
              <label htmlFor="regPassword">Password</label>{" "}
            </div>{" "}
            <div className="form-floating mt-2">
              {" "}
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Confirm Password"
                ref={confirmPasswordRef}
                required
              />{" "}
              <label htmlFor="confirmPassword">Confirm Password</label>{" "}
            </div>{" "}
            <button
              className={`btn btn-primary w-100 py-2 mt-4 ${styles.loginBtn}`}
              type="submit"
            >
              Sign up
              </button>{" "}
            
            <div className="mt-3 text-center">
              <small>
                Already have an account?{" "}
                <span
                  style={{ color: "blue", cursor: "pointer" }}
                  onClick={() => navigate("/login")}
                >
                  Login
                </span>
              </small>
            </div>
          </form>{" "}
        </div>
      </div>
    </div>
  );
};

export default Register;
