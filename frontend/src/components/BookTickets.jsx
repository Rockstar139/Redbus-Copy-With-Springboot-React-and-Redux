import { useLocation, useNavigate, useParams } from "react-router";
import styles from "../css/BookTickets.module.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { redirectToPageActions } from "../store/stateSlice";
import { fetchResultbyId } from "../store/thunks";
import { bookTicket, fetchProfile } from "../store/accountThunks";
import LoadingSpinner from "./LoadingSpinner";
import { FaBus, FaWallet } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

const BookTickets = () => {
  const { transportId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((store) => store.auth);
  const loading = useSelector((store) => store.loading);
  const data = useSelector((store) => store.results.data);
  const profile = useSelector((store) => store.profile);
  const [result, setResult] = useState(data[0]);
  const [error, setError] = useState(null);

  console.log(profile);

  useEffect(() => {
    // If user is not authenticated, redirect to login page
    if (!auth.isAuthenticated) {
      dispatch(redirectToPageActions.setValue("book-tickets"));
      navigate("/login");
    } else {
      // Fetch result details and profile when component mounts
      dispatch(fetchResultbyId(transportId));
      dispatch(fetchProfile(auth.token));
    }
  }, [auth, transportId, navigate, dispatch]);

  useEffect(() => {
    // Update result state when data changes
    if (data && data.length > 0) {
      setResult(data[0]);
    }
  }, [data]);

  const handleBooking = async () => {
    setError(null);
    // Call the bookTicket thunk to book the ticket
    const response = await dispatch(bookTicket(auth.token, transportId));
    if (response.success) {
      // Redirect to account bookings page on success
      alert("Ticket booked successfully!")
      navigate("/account", { state: { activeTab: "bookings" } });
    } else {
      // Set error message if booking fails (e.g., insufficient balance)
      setError(response.message);
    }
  };

  return (
    <>
      {loading == true ? (
        <LoadingSpinner />
      ) : (
        <div className={`bgWhite borderRadius24 ${styles.outerWrapper}`}>
          <div className={styles.innerWrapper}>
            {/* Display Wallet Balance */}
            <div className="row mb-3">
              <div className="col-12 d-flex justify-content-end">
                <div className="badge text-bg-info p-2">
                  <FaWallet className="me-2" />
                  Wallet Balance: ₹{profile?.walletBalance || 0}
                </div>
              </div>
            </div>

            {/* Display Error Message if booking fails */}
            {error && (
              <div className="alert alert-danger mb-3" role="alert">
                {error}
                {error.includes("recharge") && (
                  <button 
                    className="btn btn-sm btn-link" 
                    onClick={() => navigate("/account?tab=wallet")}
                  >
                    Go to Wallet to Recharge
                  </button>
                )}
              </div>
            )}

            <div className="row">
              <div className="col-12">
                <span className={`badge text-bg-secondary ${styles.badge}`}>
                  {result?.isDirect || true == true ? "Direct" : "Indirect"}
                </span>
              </div>
            </div>
            <div className="row">
              {" "}
              <div className={`col-4`}>
                <div className="bold700">
                  {result?.companyName || ""}{" "}
                  <FaBus className={styles.busIcon} />
                </div>
                <span className={`bold300 ${styles.desc}`}>
                  {result?.busModel || ""}{" "}
                  {result?.isAc || true == true ? "A/C" : "Non A/C"}{" "}
                  {result?.isSeater || true == true ? "Seater" : ""}{" "}
                  {result?.isSleeper || true == true ? "Sleeper" : ""} (2+1)
                </span>
              </div>
              <div className={`col-2`}>
                <FaStar /> {result?.rating || ""}/
                {result?.totalNoOfRatings || ""}
              </div>
              <div className={`col-4`}>
                <div>
                  <span className={styles.departureTime}>
                    {result?.departureTime || ""}
                  </span>{" "}
                  -{" "}
                  <span className={styles.arrivalTime}>
                    {result?.arrivalTime || ""}
                  </span>
                </div>
                <span className={styles.desc}>
                  {result?.duration || ""}  
                  
                  <span className={styles.singleSeatsFree}>
                     ({result?.noOfSingleSeatsFree || ""} Available)
                  </span>
                </span>
              </div>
              <div className={`col-2 textAlignRight bold700 ${styles.price}`}>
                <div>₹{result?.price || ""}</div>
                <span className={styles.desc}>Onwards</span>
              </div>
            </div>
            <hr></hr>
            <div className="row">
              {" "}
              <div className="col-8">
                {result?.tags && result.tags.length > 0
                  ? JSON.parse(result?.tags || "[]")
                      .slice(0, 4)
                      .map((tag) => (
                        <span
                          key={tag}
                          className={`badge text-bg-secondary ${styles.tag}`}
                        >
                          {tag}
                        </span>
                      ))
                  : ""}
              </div>
            </div>
            <div className="row">
              <div className={`col-8 ${styles.space}`}>
                <div className={`${styles.outerDivWrapper}`}>
                  <div className={`${styles.innerDivWrapper}`}>
                    <div className={`row ${styles.upperDiv}`}>
                      <span className={`col-4 ${styles.spanLeft}`}>SL</span>
                      <span className={`col-8 ${styles.spanRight}`}>₹{result?.price || ""}</span>
                    </div>
                    <div className={`${styles.lowerDiv}`}>
                      <span>Available {result?.noOfSingleSeatsFree || ""}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-4">
                {/* Book Ticket Button */}
                <button className={`${styles.btn} `} onClick={handleBooking}>
                  Book Ticket for ₹{result?.price || ""}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default BookTickets;

