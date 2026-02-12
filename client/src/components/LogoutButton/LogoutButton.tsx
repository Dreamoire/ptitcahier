import { useOutletContext } from "react-router-dom";
import type { OutletAuthContext } from "../../types/OutletAuthContext";
import styles from "./LogoutButton.module.css";

function LogoutButton() {
  const { setAuth } = useOutletContext<OutletAuthContext>();

  const logoutUser = () => {
    localStorage.removeItem("auth");
    setAuth(null);
  };

  return (
    <button type="button" onClick={logoutUser} className={styles.logoutButton}>
      Déconnexion
    </button>
  );
}

export default LogoutButton;
