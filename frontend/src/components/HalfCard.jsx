import styles from "../css/HalfCard.module.css";
import { useState } from "react";

const HalfCard = ({ offer, triggerDialogue }) => {
  const [showDialogue, setDialogue] = useState(triggerDialogue==true?true:false);
  
  const toggleDialogue = () => {
    setDialogue(!showDialogue);
  };

  return (
    <>
      <div
        className={`card ${styles.customCard}`}
        onClick={toggleDialogue}
      >
        <div className={styles.imageDiv}>
          <img
            src={offer.backgroundImage}
            className="card-img-top"
            alt={offer.backgroundImage}
          />
        </div>
        <div className="card-body">
          <h5 className={`card-title ${styles.offerDesc}`}>{offer.title}</h5>
          <span className={styles.offerPro}>Use Code: {offer.couponCode}</span>
        </div>
      </div>
      {showDialogue == true ? (
        <div className={styles.overlay} onClick={toggleDialogue}>
          <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
            <div className={styles.dialogueHeader}>
              <button
                type="button"
                className={`btn-close ${styles.closeBtn}`}
                onClick={toggleDialogue}></button>

              <h5 className={styles.dialogueTitle}>Bus Offer</h5>
              <h4 className={styles.offerDescription}>
                Use Code: {offer.couponCode}
                <br />
                {offer.title}
              </h4>
            </div>
            <div className={styles.offerTerms}>
              <div className={styles.headingWrap}>
                <p>What is the Offer</p>
              </div>
              <div className={styles.offerTerms}>
                <ol>
                  <li>
                    Use {offer.couponCode} to get 10% off up to Rs 200 on AU
                    Bank Credit Card.
                  </li>
                  <li>
                    {offer.couponCode} offer is applicable for a base fare of Rs
                    700.
                  </li>
                  <li>
                    Offer is valid from 8 Sep 2025 to 31 Jan 2026 (“Offer
                    Period”).
                  </li>
                  <li>
                    This offer is made solely by MakeMyTrip (India) Private
                    Limited (“redBus”) to AU Bank credit card customers.
                  </li>
                  <li>Participation in this offer is voluntary.</li>
                  <li>
                    The offer is valid only for logged-in customers who verify
                    their mobile number with OTP (one-time password).
                  </li>
                  <li>
                    The offer is available on redBus mobile web, desktop, and
                    app.
                  </li>
                  <li>
                    The offer is applicable once per month per customer (via
                    email or mobile number) during the offer period.
                  </li>
                  <li>
                    redBus &amp; AU Bank reserve the right to end any or all
                    offers at their discretion, with mutual written consent.
                  </li>
                  <li>
                    The offer is non-transferable, non-encashable, and
                    non-negotiable.
                  </li>
                  <li>
                    Customers are deemed to have read, understood, and accepted
                    all terms and conditions before availing the offer; AU Bank
                    only facilitates it.
                  </li>
                  <li>
                    AU Bank and redBus reserve the right to disqualify customers
                    if any fraudulent activity is detected.
                  </li>
                  <li>
                    AU Bank and redBus reserve the right to modify, replace,
                    extend, or withdraw the offer at any time without prior
                    notice.
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default HalfCard;
