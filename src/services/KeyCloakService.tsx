import Keycloak from "keycloak-js";

const _kc = new Keycloak("/keycloak.json")

const initKeyCloak = () => {
    _kc.init({
        onLoad: "check-sso",
        silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html",
        pkceMethod: "S256"
    })
    .then((authenticated) => {
        if (authenticated)
        {
            console.log("Authenticated")
        }
        else {
            console.log("Not Authenticated!")
        }
    })
    .catch(() => {
        alert("failed to initialize!");
    })
};

const doLogin = () =>
{
    if (_kc.authenticated) {
        console.log("Already logged in.")
        console.log(JSON.stringify(_kc.tokenParsed))
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

const KeyCloakService = {
    initKeyCloak,
    doLogin,
    doLogout,
    getToken
}

export default KeyCloakService;
