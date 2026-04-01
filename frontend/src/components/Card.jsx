import { MdOutlineLocalOffer } from "react-icons/md";
import styles from "../css/Card.module.css";
import { useNavigate } from "react-router";


const Card = ({ card, type }) => {
  const navigate = useNavigate();
  const goTo= ()=>{
    if(type!== "WHATSNEW")
     navigate("/offers", {state: {couponCode: card.couponCode}});
  }
  return (
    <div
      className={`card ${styles.cardWidth} ${type=="WHATSNEW"?styles.cardHeightNew:styles.cardHeight}`}
      style={{ backgroundImage: `url(${card.backgroundImage})` }} alt={card.backgroundImage}
      onClick={goTo}
    >
      {type != "WHATSNEW" ? (
        <div className="card-body">
          <span className="badge text-bg-secondary">{card.offerType}</span>
          <h5 className={`card-title ${styles.cardTitle}`}>{card.title}</h5>
          <h6
            className={`card-subtitle mb-2 text-body-secondary ${styles.cardValidity}`}
          >
            {card.validity}
          </h6>
          <div className={styles.offerBtnDiv}>
            <button
              type="button"
              className={`btn btn-light ${styles.offerBtn}`}
            >
              <MdOutlineLocalOffer className={styles.offerIcon} />{" "}
              {card.couponCode}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Card;
