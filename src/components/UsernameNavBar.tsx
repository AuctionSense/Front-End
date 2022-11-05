import KeyCloakService from "../services/KeyCloakService";
import styles from "../App.module.css";

function UsernameNavBar() {
  return <li className={styles.navBarTopEnd}>{KeyCloakService.getUsername()}</li>
}

export default UsernameNavBar;
