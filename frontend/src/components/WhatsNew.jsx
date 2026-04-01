import { useSelector } from "react-redux";
import styles from "../css/WhatsNew.module.css";
import { FaArrowCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import Card from "./Card";
import useCarousel from "../hooks/useCarousel";

const WhatsNew = () => {
  const whatsNew = useSelector((store) => store.whatsNew);
  const { scrollRef, canScrollLeft, canScrollRight, checkScroll, scroll } = useCarousel();

  return (
    <div className={styles.WhatsNewMain}>
      <div className={styles.WhatsNewDiv}>
        <h4 className={styles.title}>What's New</h4>
      </div>

      <div className={styles.sliderContainer}>
        {canScrollLeft && (
          <button onClick={() => scroll("left")} className={`${styles.scrollBtn} ${styles.left}`}>
            <FaArrowCircleLeft />
          </button>
        )}
        <div className={styles.cardCarousel} ref={scrollRef} onScroll={checkScroll}>
          {whatsNew.map((news) => (
            <Card key={news.id} card={news} type="WHATSNEW" />
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

export default WhatsNew;
