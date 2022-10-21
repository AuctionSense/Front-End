import Keycloak from "keycloak-js";

const _kc = new Keycloak("/keycloak.json")

const initKeyCloak = () => {
    _kc.init({
        onLoad: "check-sso",
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

// const KeyCloakService = {
//     initKeyCloak,
//     doLogin,
//     doLogout,
//     getToken
// }


export default initKeyCloak;
export { doLogin };
export { doLogout };
export { getToken };
