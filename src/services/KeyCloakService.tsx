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

const getToken = () =>
{
    if (!_kc.authenticated) {
        console.log("Not logged in yet.")
        return;
    }
    console.log(_kc.token);
}


export default initKeyCloak;
export { doLogin };
export { getToken };