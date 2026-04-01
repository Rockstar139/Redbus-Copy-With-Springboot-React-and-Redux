import config from "../config";
import styles from "../css/Banner.module.css";

const Banner = () => {
  const page = config.getPath();
  const banner = config.getBanner();
  return (
    <>
      <div >
        <div className={styles.banner_wrapper} data-autoid="banner">
          <picture>
            <source media="(max-width: 1023px)" srcSet={banner} />
            <source media="(max-width: 1279px)" srcSet={banner} />
            <source media="(min-width: 1280px)" srcSet={banner} />
            <img
              src={banner}
              alt=""
              aria-hidden="true"
              className={styles.bannerWrapper_img}
            />
          </picture>
          <div className={styles.bannerText}>
            <h1
              id="main-content"
              className={styles.bannerWrapper_h1}
              data-autoid="headerText"
              tabIndex="-1"
            >
              India's No. 1 online {page} ticket booking site
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
