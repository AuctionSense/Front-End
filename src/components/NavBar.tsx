import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isTemplateSpan } from "typescript";
import styles from "../App.module.css";
import Category from "../models/Category";
import KeyCloakService from "../services/KeyCloakService";
import UseFetchGet from "../services/UseFetchApi";
import BalanceNavBar from "./BalanceNavBar";
import LoginButton from "./Buttons/LoginButton";
import LogoutButton from "./Buttons/logoutButton";
import UsernameNavBar from "./UsernameNavBar";

function NavBar() {
  const [categories, setCategories] = useState<Category[]>([]);
  const { data, isLoaded, error } = UseFetchGet("all/categories");

  let button = <LoginButton />;
  let username;
  let addBalance;

  useEffect(() => {
    if (data) {
      setCategories(data);
    }
  }, [data]);

  if (KeyCloakService.isLoggedIn()) {
    button = <LogoutButton />;
    username = <UsernameNavBar />;
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
                    state={{ category: category.name }}
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
