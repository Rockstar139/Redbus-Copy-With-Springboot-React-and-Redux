import styles from "../css/CommonNotFound.module.css"
const CommonNotFound = ()=>{
    return <>
          <div className={styles.wrapper}>
            <div className={styles.gap}></div>
            <div className={styles.imgContainer}>
              <img className={styles.bgImg} src="commonNotFound.webp"></img>
            </div>
            <div className={styles.gap}></div>
          </div>
        </>
}

export default CommonNotFound;