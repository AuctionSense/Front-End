import KeyCloakService from "../../services/KeyCloakService";

function LogoutButton()
{
    return <button onClick={KeyCloakService.doLogout}>Logout</button>
}

export default LogoutButton;