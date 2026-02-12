import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import parentAvatar from "../assets/images/parent_icon.jpg";
import NavBarParent from "../components/NavBar/NavBarParent";
import type { Parent } from "../types/Auth";
import type { OutletAuthContext } from "../types/OutletAuthContext";
import styles from "./Layout.module.css";

function ParentLayout() {
  const { auth, setAuth } = useOutletContext<OutletAuthContext>();

  if (auth === undefined) return <div>Loading...</div>;

  if (auth === null) {
    return <Navigate to="/" replace />;
  }

  if (auth.role !== "parent") {
    return <Navigate to="/redirection" replace />;
  }

  const parentProfile = auth.profile as Parent;

  return (
    <>
      <div className={styles.layout}>
        <NavBarParent
          avatarUrl={parentAvatar}
          parentName={parentProfile.firstName}
        />

        <div className={styles.main}>
          <Outlet context={{ auth, setAuth }} />
        </div>
      </div>
    </>
  );
}
export default ParentLayout;
