import { Link } from "react-router-dom";
import styles from "../../css/App.module.css";

function BalanceNavbar() {
  return (
      <Link className={styles.navbarLink} to={"/balance"}>
        Add Balance
      </Link>
  );
}

export default BalanceNavbar;
