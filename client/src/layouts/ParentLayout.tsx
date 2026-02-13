import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import type { OutletAuthContext } from "../types/OutletAuthContext";
import styles from "./Layout.module.css";

function ParentLayout() {
  const { auth, setAuth } = useOutletContext<OutletAuthContext>();

  if (auth === undefined) return <div>Loading...</div>;

  if (auth === null) {
    return <Navigate to="/login" replace />;
  }

  if (auth.role !== "parent") {
    return <Navigate to="/redirection" replace />;
  }

  return (
    <>
      <div className={styles.layout}>
        <NavBar />
        <div className={styles.main}>
          <Outlet context={{ auth, setAuth }} />
        </div>
      </div>
    </>
  );
}
export default ParentLayout;
