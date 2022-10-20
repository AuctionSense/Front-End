import { Link } from "react-router-dom";
import styles from "../App.module.css";
import { doLogin, getToken } from "../services/KeyCloakService";

function NavBar() {
  // GET ALL CATEGORIES HERE FROM BACK-END AND SHOW A LINK UNDER CATEGORY

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
              <Link className={styles.dropDownContentLink} to="/games">
                Games
              </Link>
            </div>
          </li>
          <li className={styles.navBarTopEnd}>
            <Link className={styles.navBarTopLink} to="/user/create">
              Create
            </Link>
          </li>
          <li className={styles.navBarTopEnd}>
              <button onClick={() => doLogin()}>
                Login
              </button>
          </li>
          <li className={styles.navBarTopEnd}>
              <button onClick={() => getToken()}>
                token
              </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
