import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../css/App.module.css";
import KeyCloakService from "../services/KeyCloakService";
import BalanceNavbar from "./navbar/BalanceNavbar";
import LoginButton from "./buttons/LoginButton";
import LogoutButton from "./buttons/LogoutButton";
import CategoryNavbar from "./navbar/CategoryNavbar";

function Navbar(props: { setError: any }) {
  const [username, setUsername] = useState<string | null>(null);
  const [sessionButton, setSessionButton] = useState<JSX.Element>(
    <LoginButton />
  );
  const [balanceButton, setBalanceButton] = useState<JSX.Element | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const pull_error = (error: Error) => {
    if (error) {
      setError(error);
    }
  };

  useEffect(() => {
    if (error) {
      error.message = "Category service is down, come back later."
      props.setError(error);
      setError(error);
    }

    if (KeyCloakService.isLoggedIn()) {
      setSessionButton(<LogoutButton />);
      setBalanceButton(<BalanceNavbar />);
      setUsername(KeyCloakService.getUsername());
    }
  }, [error, props]);

  return (
    <nav className={styles.navbar}>
        <ul>
          <li>
            <Link to="/" >
              <img className={styles.logo} alt="AuctionSense logo" src="/images/Logo.png">
              </img>
            </Link>
          </li>
          <li className={`${styles.dropDown}`}>
            <p>Category</p>
            {<CategoryNavbar setError={pull_error} />}
          </li>
          <li className={styles.navbarEnd}>{sessionButton}</li>
          <li className={`${styles.navbarEnd} ${styles.navbarLink}`}>
            {username}
          </li>
          <li className={styles.navbarEnd}>{balanceButton}</li>
        </ul>
    </nav>
  );
}

export default Navbar;
