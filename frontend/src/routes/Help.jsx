import styles from "../css/Help.module.css";
const Help = () => {
  return (
    <>
    <main>
      <div className={styles.wrapper}>
        <h4 className={styles.redTitle}>redbus Help</h4>
        <img src="help.jpg"/>
        <h4 className={styles.redTitle}>24/7 Customer Support</h4>
      </div>
      </main>
    </>
  );
};

export default Help;
