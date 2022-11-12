import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../css/App.module.css";
import KeyCloakService from "../services/KeyCloakService";
import BalanceNavbar from "./Navbar/BalanceNavbar";
import LoginButton from "./Buttons/LoginButton";
import LogoutButton from "./Buttons/LogoutButton";
import HttpConfig from "../services/HttpConfigService";
import CategoryNavbar from "./Navbar/CategoryNavbar";

function Navbar() {
  const [headersAdded, setHeadersAdded] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);
  const [sessionButton, setSessionButton] = useState<JSX.Element>(
    <LoginButton />
  );
  const [balanceButton, setBalanceButton] = useState<JSX.Element | null>(null);

  useEffect(() => {
    if (!headersAdded) {
      HttpConfig.setHeader("Content-Type", "application/json");
      setHeadersAdded(true);
    }

    if (KeyCloakService.isLoggedIn()) {
      setSessionButton(<LogoutButton />);
      setBalanceButton(<BalanceNavbar />);
      setUsername(KeyCloakService.getUsername());
    }
  }, [headersAdded]);

  return (
    <nav className={styles.navBarTop}>
      <div>
        <ul>
          <li className={styles.navBarTopFront}>
            <Link className={styles.navBarTopLink} to="/">
              Image placeholder
            </Link>
          </li>
          <li className={`${styles.dropDown} ${styles.navBarTopFront}`}>
            <p>Category</p>
            {<CategoryNavbar />}
          </li>
          <li className={styles.navBarTopEnd}>{sessionButton}</li>
          <li className={styles.navBarTopEnd}>{username}</li>
          {balanceButton}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
