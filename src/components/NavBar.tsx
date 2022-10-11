import { Link } from "react-router-dom";
import styles from "../App.module.css";

function NavBar() {
  return (
    <nav className={styles.navBarTop}>
      <ul>
        <li>
          <Link className={styles.navBarTopLink} to="/">
            Image placeholder
          </Link>
        </li>
        <li className={styles.dropDown}>
          <p>Category</p>
          <div className={styles.dropDownContent}>
            <Link className={styles.dropDownContentLink} to="/games">
              Games
            </Link>
            <Link className={styles.dropDownContentLink} to="/cars">
              Cars
            </Link>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
