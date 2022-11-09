import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../css/App.module.css";
import Category from "../models/Category";
import KeyCloakService from "../services/KeyCloakService";
import UseFetchGet from "../services/UseFetchApiService";
import BalanceNavBar from "./NavBar/BalanceNavBar";
import LoginButton from "./Buttons/LoginButton";
import LogoutButton from "./Buttons/LogoutButton";

function NavBar() {
  const [isFetchReady, setIsFetchReady] = useState<boolean>(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const { data, isLoaded, error } = UseFetchGet("all/categories", isFetchReady);

  let button = <LoginButton />;
  let username;
  let addBalance;

  useEffect(() => {
    if (data) {
      setCategories(data);
      setIsFetchReady(false);
      console.log(isLoaded, error);
      console.log(data);
    }
  }, [data, error, isLoaded]);

  if (KeyCloakService.isLoggedIn()) {
    button = <LogoutButton />;
    username = KeyCloakService.getUsername();
    addBalance = <BalanceNavBar />;
  }

  if (categories) {
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
                {categories.map((category) => (
                  <Link
                    className={styles.dropDownContentLink}
                    key={category.id}
                    to={`/c/${category.name}`}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </li>
            <li className={styles.navBarTopEnd}>{button}</li>
            {username}
            {addBalance}
          </ul>
        </div>
      </nav>
    );
  } else {
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
              <div className={styles.dropDownContent}></div>
            </li>
            <li className={styles.navBarTopEnd}>{button}</li>
            {username}
            {addBalance}
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
