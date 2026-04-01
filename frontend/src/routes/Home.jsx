import Banner from "../components/Banner";
import Info from "../components/Info";
import OffersSection from "../components/OffersSection";
import SearchHome from "../components/SearchHome";
import WhatsNew from "../components/WhatsNew";
import styles from "../css/Home.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppContent } from "../store/thunks";
import LoadingSpinner from "../components/LoadingSpinner";

const Home = () => {
  const dispatch = useDispatch();
  const loading = useSelector((store) => store.loading);


  useEffect(() => {
    dispatch(fetchAppContent());
  }, [dispatch]);

  return (
    <>
      <main className={styles.main_div}>
        <Banner />
        <SearchHome/>
        {loading == true?(<LoadingSpinner />) : <OffersSection />}
        
        <div className={styles.seperate}></div>
        {loading == true? null : <WhatsNew />}
        
        <div className={styles.seperate}></div>
        
        <Info/>
        <div className={styles.seperate}></div>
      </main>
    </>
  );
};

export default Home;
