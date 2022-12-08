import Keycloak from "keycloak-js";

const _kc = new Keycloak("/keycloak.json"); // Create a new Keycloak instance.

// Initialize Keycloak and pass in callback (render function).
const initKeyCloak = (onInitCallback: any) => {
  _kc
    .init({
      onLoad: "check-sso",
      silentCheckSsoRedirectUri:
        window.location.origin + "/silent-check-sso.html",
      pkceMethod: "S256",
      messageReceiveTimeout: 2000,
    })
    .then(() => onInitCallback())
    .catch(() => {
      onInitCallback();
    });
};

const doLogin = () => {
  if (_kc.authenticated) {
    return;
  }
  _kc.login();
};

const doLogout = () => {
  if (!_kc.authenticated) {
    return;
  }
  _kc.logout();
};

const getToken = () => {
  if (!_kc.authenticated) {
    return;
  }
  return _kc.token;
};

const isLoggedIn = () => {
  return !!_kc.token;
};

const updateToken = () => {
  _kc.updateToken(5).catch(doLogin);
};

const getUsername = () => _kc.tokenParsed?.preferred_username;

const KeyCloakService = {
  initKeyCloak,
  doLogin,
  doLogout,
  getToken,
  updateToken,
  isLoggedIn,
  getUsername,
};

export default KeyCloakService;
