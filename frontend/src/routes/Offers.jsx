import HalfCard from "../components/HalfCard";
import styles from "../css/Offers.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { useEffect } from "react";
import { fetchOffersPage } from "../store/thunks";
import LoadingSpinner from "../components/LoadingSpinner";

const Offers = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const offersPage = useSelector(store=>store.offersPage)
    const loading = useSelector((store) => store.loading);
    
    const { couponCode} = location.state || {};

    useEffect(() => {
        dispatch(fetchOffersPage());
    }, [dispatch]);

  return (
    <>
      <main>
        <div className={styles.outerWrapper}>
          <div className={styles.innerWrapper}>
            <div className={styles.title}>
              <h1>Offers for you</h1>
            </div>
                
            {loading == true?(<LoadingSpinner />) : null}
            <div className={styles.cardWrapper}>
                {offersPage.map(offer=><HalfCard key={offer.id} offer={offer} triggerDialogue = {couponCode == offer.couponCode?true:false}/>)}
            </div>
            
          </div>
        </div>
      </main>
    </>
  );
};

export default Offers;
