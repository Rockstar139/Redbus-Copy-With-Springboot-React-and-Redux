import styles from "../css/Header.module.css";
import { FaList } from "react-icons/fa";
import { IoHelpCircleOutline } from "react-icons/io5";
import { RiAccountCircleLine } from "react-icons/ri";
import { Link, useLocation } from "react-router";
import config from "../config";
import { useSelector } from "react-redux";

const Header = () => {
  const location = useLocation();
  
  const page = config.getPath();
  let prevPage = useSelector(store=>store.prevPage);
  prevPage = (page=="bus"|| page=="train")?page:prevPage;
  
  return (
    <header className={[styles.header, page!= "search"?styles.headerSticky:""].join(" ")}>
      <div className={styles.header_div}>
        <Link to="/" className={styles.redbusLogo} aria-label="redBus logo">
          <img
            src="bus-icon.png"
            alt="redBus logo"
            title="redBus"
            width="56"
            height="56"
          />
        </Link>
        <div className={styles.lSection}>
          <ul className={styles.ulLeft}>
            <li className={styles.liLeft}>
              <Link to="/"
                className={styles.aLeft}
                aria-selected="false"
                aria-posinset="1"
                aria-setsize="2"
                aria-label="Bus tickets"
              >
                <img
                  className={prevPage=="train"?styles.imgBlackIcon:styles.imgIcon}
                  src="bus-icon.png"
                  alt="Online Bus Tickets Booking"
                  title="Online Bus Tickets Booking"
                  width="30"
                  height="20"
                />
                <span className={prevPage=="train"?styles.imgBlackText:styles.imgText}>Bus tickets</span>
              </Link>
            </li>
            <li className={styles.liLeft}>
              <Link to="/train"
                className={styles.aLeft}
                aria-selected="true"
                aria-posinset="2"
                aria-setsize="2"
                aria-label="Train tickets"
                aria-current="page"
              >
                <img
                  className={prevPage=="bus"?styles.imgBlackIcon:styles.imgIcon}
                  src="train-icon.svg"
                  alt="Train tickets"
                  title="Online Train Tickets Booking"
                  width="30"
                  height="20"
                />
                <span className={prevPage=="bus"?styles.imgBlackText:styles.imgText}>Train tickets</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.rSection} role="navigation" aria-label="Primary">
          <ul className={styles.ulRight}>
            <li className={styles.navItem}>
              <Link to="/" className={styles.navOption} aria-label="Bookings">
                <FaList className={styles.navRIcon} />
                Bookings
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/help" className={styles.navOption} aria-label="Help">
                <IoHelpCircleOutline className={styles.navRIcon} />
                Help
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/account" className={styles.navOption} aria-label="Account">
                <RiAccountCircleLine className={styles.navRIcon} />
                Account
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
