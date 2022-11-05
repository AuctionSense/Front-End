import { Link } from "react-router-dom";
import styles from "../App.module.css";

function BalanceNavBar()
{
    return <li className={styles.navBarTopEnd}><Link className={styles.navBarTopLink} to={"/balance"}>Add Balance</Link></li>

}

export default BalanceNavBar