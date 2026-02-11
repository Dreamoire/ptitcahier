import { useNavigate, useOutletContext } from "react-router-dom";
import type { OutletAuthContext } from "../../types/OutletAuthContext";

function LogoutButton() {
  const { setAuth } = useOutletContext<OutletAuthContext>();
  const navigate = useNavigate();

  const logoutUser = () => {
    localStorage.removeItem("auth");
    setAuth(null);
    navigate("/");
  };

  return (
    <button type="button" onClick={logoutUser}>
      Déconnexion
    </button>
  );
}

export default LogoutButton;
