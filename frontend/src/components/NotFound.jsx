import { useSelector } from "react-redux";
import styles from "../css/NotFound.module.css";

const NotFound = () => {
  const prevPage = useSelector((store) => store.prevPage);
  const displayStr = prevPage == "train"?"trains":"buses";
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.gap}></div>
        <div className={styles.imgContainer}>
          <img src="notFound.png"></img>
        </div>
        <div>
          <h4 className={`bold ${styles.heading}`}> OOPs</h4>
          <label> No {displayStr} found</label><br/><br/>
          <label>
            Sorry, no {displayStr} are available on this route for the selected date
          </label>
        </div>
      </div>
    </>
  );
};

export default NotFound;
