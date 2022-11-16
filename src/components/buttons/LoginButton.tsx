import KeyCloakService from "../../services/KeyCloakService";
import styles from "../../css/App.module.css";

function LoginButton() {
  return <button data-testid="login-button" className={styles.sessionButton} onClick={KeyCloakService.doLogin}>Login</button>;
}

export default LoginButton;
