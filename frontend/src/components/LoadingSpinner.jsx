import styles from "../css/LoadingSpinner.module.css";

const LoadingSpinner = () => {
  return (<>
    <div className={styles.overlay}>
       </div>
      <div className={`d-flex justify-content-center ${styles.spinner}`}>
        <div
          className="spinner-border"
          style={{ width: "4rem", height: "4rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
       
      </div>
    </div>
    </>
  );
};

export default LoadingSpinner;
