import KeyCloakService from "../../services/KeyCloakService";

function LoginButton() {
  return <button onClick={KeyCloakService.doLogin}>Login</button>;
}

export default LoginButton;
