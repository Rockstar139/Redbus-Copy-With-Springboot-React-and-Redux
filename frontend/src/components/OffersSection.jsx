import styles from "../css/OffersSection.module.css";
import { FaArrowCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import Card from "./Card";
import { Link } from "react-router";
import useCarousel from "../hooks/useCarousel";

const OffersSection = () => {
  const offers = useSelector((store) => store.offers);
  const [offerType, setOfferType] = useState("ALL");
  const { scrollRef, canScrollLeft, canScrollRight, checkScroll, scroll } = useCarousel();

  const filteredOffers = useMemo(() => {
    if (offerType === "ALL") return offers;
    return offers.filter((offer) => offer.offerType === offerType);
  }, [offers, offerType]);

  return (
    <div className={styles.offerMain}>
      <div className={styles.offerTitleDiv}>
        <h4 className={styles.title}>Offers for you</h4>
        <Link to="/offers" className={`btn btn-light`}>
          View More
        </Link>
      </div>
      <div className={styles.selectionDiv}>
        {["ALL", "BUS", "TRAIN"].map((type) => (
          <button
            key={type}
            type="button"
            className={`btn btn-light ${offerType === type ? styles.selectedBtn : ""}`}
            onClick={() => setOfferType(type)}
          >
            {type.charAt(0) + type.slice(1).toLowerCase()}
          </button>
        ))}
      </div>
      <div className={styles.sliderContainer}>
        {canScrollLeft && (
          <button onClick={() => scroll("left")} className={`${styles.scrollBtn} ${styles.left}`}>
            <FaArrowCircleLeft />
          </button>
        )}
        <div className={styles.cardCarousel} ref={scrollRef} onScroll={checkScroll}>
          {filteredOffers.map((offer) => (
            <Card key={offer.id} card={offer} type="OFFERS" />
          ))}
        </div>
        {canScrollRight && (
          <button onClick={() => scroll("right")} className={`${styles.scrollBtn} ${styles.right}`}>
            <FaArrowAltCircleRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default OffersSection;
