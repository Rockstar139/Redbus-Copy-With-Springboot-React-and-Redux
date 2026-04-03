import { useLocation, useNavigate, useParams } from "react-router";
import styles from "../css/BookTickets.module.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { redirectToPageActions } from "../store/stateSlice";
import { fetchResultbyId } from "../store/thunks";
import LoadingSpinner from "./LoadingSpinner";
import { FaBus } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

const BookTickets = () => {
  const { transportId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((store) => store.auth);
  const loading = useSelector((store) => store.loading);
  const prevPage = useSelector((store) => store.prevPage);
  const data = useSelector((store) => store.results.data);
  const [result, setResult] = useState(data[0]);
  console.log("result", result);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      dispatch(redirectToPageActions.setValue("book-tickets"));
      navigate("/login");
    } else {
      dispatch(fetchResultbyId(transportId));
    }
  }, [auth, transportId, navigate]);

  useEffect(() => {
    setResult(data[0]);
    console.log("updated data", data[0]);
  }, [data]);

  const handleBooking = () => {};

  return (
    <>
      {loading == true ? (
        <LoadingSpinner />
      ) : (
        <div className={`bgWhite borderRadius24 ${styles.outerWrapper}`}>
          <div className={styles.innerWrapper}>
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
                  {result?.duration || ""}{" "}
                  {result?.noOfSingleSeatsFree ||
                    "" + result?.noOfSleepersFree ||
                    ""}{" "}
                  Seats{" "}
                  <span className={styles.singleSeatsFree}>
                    ({result?.noOfSingleSeatsFree || ""} Single)
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
                {result?.tags.length > 0
                  ? JSON.parse(result?.tags || [])
                      .slice(0, 4)
                      .map((result) => (
                        <span
                          key={result}
                          className={`badge text-bg-secondary ${styles.tag}`}
                        >
                          {result}
                        </span>
                      ))
                  : ""}
              </div>
            </div>
            <div className="row">
              <div className={`col-12 ${styles.space}`}>
                <div className={`${styles.outerDivWrapper}`}>
                  <div className={`${styles.innerDivWrapper}`}>
                    <div className={`row ${styles.upperDiv}`}>
                      <span className={`col-6 ${styles.spanLeft}`}>SL</span>
                      <span className={`col-6 ${styles.spanRight}`}>₹750</span>
                    </div>
                    <div className={`${styles.lowerDiv}`}>
                      <span>Available {result?.noOfSingleSeatsFree || ""}</span>
                    </div>
                  </div>
                </div>

                <div className={`${styles.outerDivWrapper}`}>
                  <div className={`${styles.innerDivWrapper}`}>
                    <div className={`row ${styles.upperDiv}`}>
                      <span className={`col-6 ${styles.spanLeft}`}>SL</span>
                      <span className={`col-6 ${styles.spanRight}`}>₹750</span>
                    </div>
                    <div className={`${styles.lowerDiv}`}>
                      <span>Available {result?.noOfSingleSeatsFree || ""}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="row">
              {" "}
              <div className="col-12">
                <button className={`${styles.btn} `} onClick={handleBooking}>
                  Book Ticket
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
