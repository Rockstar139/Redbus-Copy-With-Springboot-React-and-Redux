import styles from "../css/SearchHome.module.css";
import { CiSearch } from "react-icons/ci";
import { useRef, useState } from "react";
import { FaBus } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import config from "../config";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { formatDateYYYYMMDD, formatDateDDMMMYYY } from "../utils/date";
import {
  busStateActions,
  trainStateActions,
  prevPageActions,
} from "../store/stateSlice";

const SearchHome = () => {
  const page = config.getPath();
  const navigate = useNavigate();

  const busState = useSelector((store) => store.busState);
  const trainState = useSelector((store) => store.trainState);
  const localSearchValue = page === "bus" ? busState : trainState;
  const dispatch = useDispatch();

  // //Setting max date in date picker
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + config.maxNoOfMonths);

  const [isTxtFrom, setIsTxtFrom] = useState(false);
  const [isTxtTo, setIsTxtTo] = useState(false);
  const [isDateOfJourney, setIsDateOfJourney] = useState(false);
  const [newDate, setDate] = useState(localSearchValue.dateOfJourney);

  //Reference variables for txtFrom, txtTo and dateOfJourney
  const txtFrom = useRef();
  const txtTo = useRef();
  const dateOfJourney = useRef();

  //On Button Click
  const handleSearch = () => {
    if (
      txtFrom.current.value == "" ||
      txtTo.current.value == "" ||
      dateOfJourney.current.value == ""
    ) {
      txtFrom.current.value == "" ? setIsTxtFrom(true) : setIsTxtFrom(false);
      txtTo.current.value == "" ? setIsTxtTo(true) : setIsTxtTo(false);
      dateOfJourney.current.value == ""
        ? setIsDateOfJourney(true)
        : setIsDateOfJourney(false);
    } else {
      setIsTxtFrom(false);
      setIsTxtTo(false);
      setIsDateOfJourney(false);
      //saving search bar state in local storage using redux-persistent
      let stateObj = {
        page: page,
        txtFrom: txtFrom.current.value,
        txtTo: txtTo.current.value,
        dateOfJourney: dateOfJourney.current.value,
      };
      if (page == "bus") {
        dispatch(busStateActions.setValues(stateObj));
      }
      if (page == "train") {
        dispatch(trainStateActions.setValues(stateObj));
      }
      dispatch(prevPageActions.setValue(page));

      navigate("/search", {
        state: {
          page: page,
          txtFrom: txtFrom.current.value,
          txtTo: txtTo.current.value,
          dateOfJourney: dateOfJourney.current.value,
        },
      });
    }
  };

  const handleDateFocus = () => {
    dateOfJourney.current.showPicker?.();
    dateOfJourney.current.focus();
  };
  return (
    <>
      <div className={`card ${styles.searchWrapper}`}>
        <div className={`card-body ${styles.searchBody}`}>
          <div className={styles.controls}>
            <div className={`container text-center`}>
              <div className="row">
                <div className={`col-md ${styles.borderRight}`}>
                  <div className="form-floating">
                    <input
                      type="text"
                      className={`form-control ${styles.control} ${isTxtFrom == true ? "is-invalid" : ""}`}
                      // className="form-control"
                      id="txtFrom"
                      placeholder="From"
                      ref={txtFrom}
                      defaultValue={localSearchValue.txtFrom || ""}
                    />
                    <label htmlFor="txtFrom" className={styles.controlLabel}>
                      <FaBus /> From
                    </label>
                  </div>
                </div>
                <div className={`col-md ${styles.borderRight}`}>
                  <div className="form-floating">
                    <input
                      type="text"
                      className={`form-control ${styles.control} ${isTxtTo == true ? "is-invalid" : ""}`}
                      id="txtTo"
                      placeholder="To"
                      ref={txtTo}
                      defaultValue={localSearchValue.txtTo || ""}
                    />
                    <label htmlFor="txtTo" className={styles.controlLabel}>
                      <FaBus /> To
                    </label>
                  </div>
                </div>
                <div className="col-md">
                  <div
                    className={`form-floating ${styles.controlDisplayRelative}`}
                  >
                    <input
                      type="date"
                      className={`form-control ${styles.control} ${isDateOfJourney == true ? "is-invalid" : ""}`}
                      id="dateOfJourney"
                      placeholder="Journey Date"
                      min={formatDateYYYYMMDD(new Date())}
                      max={formatDateYYYYMMDD(maxDate)}
                      value={newDate}
                      ref={dateOfJourney}
                      onChange={(e) => setDate(e.target.value)}
                    />
                    <label
                      htmlFor="dateOfJourney"
                      className={styles.controlLabel}
                    >
                      <FaCalendarAlt /> Date of Journey
                    </label>
                    {/* DateMock */}
                    <div
                      className={styles.dateMock}
                      style={{ display: "block" }}
                      onClick={handleDateFocus}
                    >
                      <p>{formatDateDDMMMYYY(newDate)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className={[styles.searchBtn]} onClick={handleSearch}>
            <CiSearch className={styles.searchIcon} />
            Search {page == "bus" ? "Buses" : "Trains"}
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchHome;
