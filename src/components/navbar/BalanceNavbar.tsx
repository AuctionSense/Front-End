import { Link } from "react-router-dom";
import styles from "../../css/App.module.css";

function BalanceNavbar() {
  return (
    <li className={styles.navBarTopEnd}>
      <Link className={styles.navBarTopLink} to={"/balance"}>
        Add Balance
      </Link>
    </li>
  );
}

export default BalanceNavbar;
