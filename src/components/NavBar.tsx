import { Link } from "react-router-dom";
import styles from "../App.module.css";
import KeyCloakService from "../services/KeyCloakService";
import BalanceNavBar from "./BalanceNavBar";
import LoginButton from "./Buttons/LoginButton";
import LogoutButton from "./Buttons/logoutButton";
import UsernameNavBar from "./UsernameNavBar";

function NavBar() {
  // GET ALL CATEGORIES HERE FROM BACK-END AND SHOW A LINK UNDER CATEGORY

  let button = <LoginButton />; 
  let username;
  let addBalance;
  
  if (KeyCloakService.isLoggedIn())
  {
    button = <LogoutButton />;
    username = <UsernameNavBar />
    addBalance = <BalanceNavBar />
  }

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
            <div className={styles.dropDownContent}>
              <Link className={styles.dropDownContentLink} to={`/games`} state={{category: "games"}}>
                Games
              </Link>
            </div>
          </li>
          <li className={styles.navBarTopEnd}>
            {button}
          </li>
          {username}
          {addBalance}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
