import { useState, useEffect, useRef } from "react";
import styles from "../css/Account.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router";
import { logoutUser } from "../store/thunks";
import {
  fetchProfile,
  fetchBookings,
  fetchTransactions,
  cancelBooking,
  updateProfile,
} from "../store/accountThunks";
import LoadingSpinner from "../components/LoadingSpinner";
import { formatDateYYYYMMDD } from "../utils/date";
import { redirectToPageActions } from "../store/stateSlice";

const Account = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((store) => store.auth);
  const loading = useSelector((store) => store.loading);
  const [activeTab, setActiveTab] = useState(
    location.state?.activeTab || "profile",
  );
  const name = useRef();
  const age = useRef();

  const [profile, setProfile] = useState({
    name: "",
    age: "",
    walletBalance: 0,
  });
  const [bookings, setBookings] = useState([]);
  const [transactions, setTransactions] = useState([]);
  // const [loading, setLoading] = useState(isLoading);

  useEffect(() => {
      if (!auth.isAuthenticated) {
      dispatch(redirectToPageActions.setValue("account"));
      navigate("/login");
    } else {
      dispatch(fetchProfile(auth.token));
    }
  }, [auth, navigate]);

  const profileData = useSelector((store) => store.profile);
  useEffect(() => {
    setProfile(profileData);
  }, [profileData]);

  const bookingsData = useSelector((store) => store.bookings);
  useEffect(() => {
    setBookings(bookingsData);
  }, [bookingsData]);

  const transactionsData = useSelector((store) => store.transactions);
  useEffect(() => {
    setTransactions(transactionsData);
  }, [transactionsData]);

  useEffect(() => {
    if (auth.isAuthenticated) {
      if (activeTab === "bookings") dispatch(fetchBookings(auth.token));
      if (activeTab === "transactions") dispatch(fetchTransactions(auth.token));
      if (activeTab === "wallet" || activeTab === "profile")
        dispatch(fetchProfile(auth.token));
    }
  }, [auth, activeTab]);

  const handleCancelBooking = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?"))
      return;
    try {
      await dispatch(cancelBooking(auth.token, id));
      alert("Booking cancelled successfully! Refund credited to wallet.");
      dispatch(fetchBookings(auth.token));
    } catch (error) {
      alert(error,"Error cancelling booking");
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      if(profile.name == ""){
        alert("Please fill all the fields");
        name.current.className="form-control is-invalid";
        name.current.focus();
        return;
      }
      else{
        name.current.className="form-control";
      }
      if(profile.age == ""){
        alert("Please fill all the fields");
        age.current.className="form-control is-invalid";
        age.current.focus();
        return;
      }
      else{
        age.current.className="form-control";
      }
      console.log(profile.age);
      await dispatch(updateProfile(auth.token, profile.name, Number(profile.age)));
      alert("Profile updated successfully!");
      dispatch(fetchProfile(auth.token));
    } catch (error) {
      alert("Error updating profile");
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const renderContent = () => {
    switch (activeTab) {
      case "bookings":
        return (
          <div className={styles.section}>
            <h3>Booked Trips</h3>
            {bookings.length === 0 ? (
              <p>No bookings found.</p>
            ) : (
              <div className={styles.list}>
                {bookings.map((b) => (
                  <div key={b.id} className={styles.itemCard}>
                    <div className={styles.itemInfo}>
                      <p>
                        <strong>{b.trip.companyName} ({b.trip.type == "TRAIN" ?"Train":"Bus"})</strong> (
                        {b.trip.fromLocation} to {b.trip.toLocation})
                      </p>
                      <p>
                        Booking Date : {formatDateYYYYMMDD(b.bookingDate)} | Trip Date : {b.trip.journeyDate} | Status:{" "}
                        <span className={styles[b.status.toLowerCase()]}>
                          {b.status}
                        </span>
                      </p>
                      <p>Paid: ₹{b.amountPaid}</p>
                    </div>
                    {b.status === "BOOKED" && (
                      <button
                        onClick={() => handleCancelBooking(b.id)}
                        className={styles.cancelBtn}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case "wallet":
        return (
          <div className={styles.section}>
            <h3>Wallet Balance</h3>
            <div className={styles.walletCard}>
              <h2>₹{profile.walletBalance?.toFixed(2)}</h2>
              <p>Available Balance</p>
              <button
                className={styles.addMoneyBtn}
                onClick={() =>
                  alert("Payment gateway integration coming soon!")
                }
              >
                Add Money
              </button>
            </div>
          </div>
        );
      case "transactions":
        return (
          <div className={styles.section}>
            <h3>My Transactions</h3>
            {transactions.length === 0 ? (
              <p>No transactions found.</p>
            ) : (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((t) => (
                    <tr key={t.id}>
                      <td>
                        {new Date(t.transactionDate).toLocaleDateString()}
                      </td>
                      <td className={styles[t.type.toLowerCase()]}>{t.type}</td>
                      <td style={{ color: t.amount > 0 ? "green" : "red" }}>
                        {t.amount > 0 ? "+" : ""}
                        {t.amount}
                      </td>
                      <td>{t.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        );
      case "profile":
      default:
        return (
          <div className={styles.section}>
            <h3>Profile Details</h3>
            <form
              onSubmit={handleUpdateProfile}
              className={styles.form}
            >
              <div className={styles.formGroup}>
                <label>Username</label>
                <input type="text" value={auth?.username ||""} disabled />
              </div>
              <div className={styles.formGroup}>
                <label>Name</label>
                <input
                  type="text"
                  className={`form-control`}
                  value={profile.name || ""}
                  ref={name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                  placeholder="Enter your name"
                />
              </div>
              <div className={styles.formGroup}>
                <label>Age</label>
                <input
                  type="number"
                  className={`form-control`}
                  value={profile.age || ""}
                  ref={age}
                  onChange={(e) =>
                    setProfile({ ...profile, age: e.target.value })
                  }
                  placeholder="Enter your age"
                />
              </div>
              <button type="submit" className={styles.saveBtn}>
                Update Profile
              </button>
            </form>
          </div>
        );
    }
  };

  return (

    <div className={styles.outerWrapper}>
      {loading == true?(<LoadingSpinner />) : null}
      <div className={styles.accountContainer}>
        <div className={styles.sidebar}>
          <div className={styles.userHeader}>
            <div className={styles.avatar}>
              {auth.username?.[0].toUpperCase()}
            </div>
            <p>{auth.username}</p>
          </div>
          <ul className={styles.menu}>
            <li
              className={activeTab === "profile" ? styles.active : ""}
              onClick={() => setActiveTab("profile")}
            >
              Profile
            </li>
            <li
              className={activeTab === "bookings" ? styles.active : ""}
              onClick={() => setActiveTab("bookings")}
            >
              Booked Trips
            </li>
            <li
              className={activeTab === "wallet" ? styles.active : ""}
              onClick={() => setActiveTab("wallet")}
            >
              Wallet Balance
            </li>
            <li
              className={activeTab === "transactions" ? styles.active : ""}
              onClick={() => setActiveTab("transactions")}
            >
              My Transactions
            </li>
            <li className={styles.logout} onClick={handleLogout}>
              Logout
            </li>
          </ul>
        </div>
        <div className={styles.contentArea}>{renderContent()}</div>
      </div>
    </div>
  );
};

export default Account;
