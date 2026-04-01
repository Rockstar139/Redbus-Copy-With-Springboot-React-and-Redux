
import Login from "../components/Login";
import styles from "../css/Account.module.css"
const Account = ()=>{
    const isLoggedIn = false;
    return <div className={styles.outerWrapper}>
        <div className={styles.innerWrapper}>
            {isLoggedIn?null:<Login/>}
        </div>
        
    </div>
}

export default Account;