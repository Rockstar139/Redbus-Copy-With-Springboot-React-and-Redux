import styles from "../css/SearchResultCard.module.css";
import { FaBus } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router";


const SearchResultCard = ({ result }) => {
  return (
    <>
      <div className={`bgWhite borderRadius24  ${styles.outerWrapper}`}>
        <div className={styles.innerWrapper}>
          <div className="row">
            <div className="col-12">
              <span className={`badge text-bg-secondary ${styles.badge}`}>
                {result.isDirect == true ? "Direct" : "Indirect"}
              </span>
            </div>
          </div>
          <div className="row">
            {" "}
            <div className={`col-4`}>
              <div className="bold700">
                {result.companyName} <FaBus className={styles.busIcon} />
              </div>
              <span className={`bold300 ${styles.desc}`}>
                {result.busModel} {result.isAc == true ? "A/C" : "Non A/C"}{" "}
                {result.isSeater == true ? "Seater" : ""}{" "}
                {result.isSleeper == true ? "Sleeper" : ""} (2+1)
              </span>
            </div>
            <div className={`col-2`}>
              <FaStar /> {result.rating}/{result.totalNoOfRatings}
            </div>
            <div className={`col-4`}>
              <div>
                <span className={styles.departureTime}>
                  {result.departureTime}
                </span>{" "}
                -{" "}
                <span className={styles.arrivalTime}>{result.arrivalTime}</span>
              </div>
              <span className={styles.desc}>
                {result.duration}{" "}
                <span className={styles.singleSeatsFree}>
                  ({result.noOfSingleSeatsFree} Available)
                </span>
              </span>
            </div>
            <div className={`col-2 textAlignRight bold700 ${styles.price}`}>
              <div>₹{result.price}</div>
              <span className={styles.desc}>Onwards</span>
            </div>
          </div>
          <hr></hr>
          <div className="row">
            {" "}
            <div className="col-8">
              {result.tags.length > 0
                ? JSON.parse(result.tags)
                    .slice(0, 4)
                    .map((result) => (
                      <span key={result} className={`badge text-bg-secondary ${styles.tag}`}>
                        {result}
                      </span>
                    ))
                : ""}
            </div>
            <div className="col-4 textAlignRight" >
                <div style={{float:"right"}}>
              <Link to={`/book-tickets/${result.id}`} className={`${styles.btn} `}>
                Book Ticket
              </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchResultCard;
