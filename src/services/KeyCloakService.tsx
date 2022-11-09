import Keycloak from "keycloak-js";

const _kc = new Keycloak("/keycloak.json")

const initKeyCloak = (onAuthenticatedCallback: any) => {
    _kc.init({
        onLoad: "check-sso",
        silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html",
        pkceMethod: "S256"
    })
    .then((authenticated) => {
        if (!authenticated)
        {
            console.log("Not Authenticated!")
        }
        onAuthenticatedCallback();
    })
    .catch(() => {
        alert("failed to initialize!");
        onAuthenticatedCallback();
    })
};

const doLogin = () =>
{
    if (_kc.authenticated) {
        console.log("Already logged in.")
        return;
    }
    _kc.login();
}

const doLogout = () =>
{
    if (!_kc.authenticated) {
        console.log("Not logged in.")
        return;
    }
    _kc.logout();
}

const getToken = () =>
{
    if (!_kc.authenticated) {
        console.log("Not logged in yet.")
        return;
    }
    return _kc.token;
}

const isLoggedIn = () => {
    return _kc.authenticated
};

const getUsername = () => _kc.tokenParsed?.preferred_username;

const KeyCloakService = {
    initKeyCloak,
    doLogin,
    doLogout,
    getToken,
    getUsername,
    isLoggedIn
}

export default KeyCloakService;
