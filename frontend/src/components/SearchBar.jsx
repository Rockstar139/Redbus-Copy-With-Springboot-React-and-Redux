import styles from "../css/SearchBar.module.css";
import { CiSearch } from "react-icons/ci";
import { useRef, useState } from "react";
import { FaBus } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import config from "../config";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
import {
  busStateActions,
  trainStateActions,
  prevPageActions,
} from "../store/stateSlice";
import { useDispatch } from "react-redux";
import { formatDateYYYYMMDD, formatDateDDMMMYYY } from "../utils/date";

const SearchBar = ({noOfResults,search,localSearchValue,page}) => {
  
  const dispatch = useDispatch();

  //Setting min and max date in date picker
  const today = formatDateYYYYMMDD(new Date());
  const oldDate = localSearchValue?.dateOfJourney ?? today;
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 2);

  // format to YYYY-MM-DD
  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const [isTxtFrom, setIsTxtFrom] = useState(false);
  const [isTxtTo, setIsTxtTo] = useState(false);
  const [isDateOfJourney, setIsDateOfJourney] = useState(false);
  const [newDate, setDate] = useState(oldDate > today ? oldDate : today);

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
      search(stateObj);
    }
  };

  const handleDateFocus = () => {
    dateOfJourney.current.showPicker?.();
    dateOfJourney.current.focus();
  };
  return (
    <>
      <div className={`card ${styles.searchWrapper}`}>
        <div className={styles.summaryWrap}>
          <label className={styles.labelSummary}>
            {localSearchValue.txtFrom} <FaArrowRightLong /> {localSearchValue.txtTo}
          </label>
          <br />
          <label>{noOfResults} {page == "bus"?"buses":"trains"}</label>
        </div>
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
                <div
                  className={`col-md ${[styles.borderRight, styles.paddingNone].join(" ")}`}
                >
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
                <div
                  className={`col-md ${[styles.borderRight, styles.paddingNone].join(" ")}`}
                >
                  <div className={`form-floating`}>
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
                <div className={`col-1 ${styles.searchBtnWrapper}`}>
                  <div className="form-floating">
                    <button
                      className={[styles.searchBtn]}
                      onClick={handleSearch}
                    >
                      <CiSearch className={styles.searchIcon} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
