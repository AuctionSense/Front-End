import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../css/App.module.css";
import KeyCloakService from "../services/KeyCloakService";
import BalanceNavbar from "./navbar/BalanceNavbar";
import LoginButton from "./buttons/LoginButton";
import LogoutButton from "./buttons/LogoutButton";
import CategoryNavbar from "./navbar/CategoryNavbar";

function Navbar(props: {setError: any}) {
  const [username, setUsername] = useState<string | null>(null);
  const [sessionButton, setSessionButton] = useState<JSX.Element>(
    <LoginButton />
  );
  const [balanceButton, setBalanceButton] = useState<JSX.Element | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const pull_error = (error: Error) => {
    if (error)
    {
      setError(error);
    }
  }

  useEffect(() => {
    if (error)
    {
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
            {<CategoryNavbar setError={pull_error}/>}
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
