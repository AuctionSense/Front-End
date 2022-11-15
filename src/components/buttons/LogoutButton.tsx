import KeyCloakService from "../../services/KeyCloakService";
import styles from "../../css/App.module.css";

function LogoutButton() {
  return <button className={styles.sessionButton} onClick={KeyCloakService.doLogout}>Logout</button>;
}

export default LogoutButton;
