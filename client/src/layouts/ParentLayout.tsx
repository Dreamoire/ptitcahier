import { Outlet } from "react-router";
import NavBarParent from "../components/NavBar/NavBarParent";
import styles from "./Layout.module.css";

function ParentLayout() {
  return (
    <div className={styles.layout}>
      <NavBarParent
        avatarUrl="/src/assets/images/logo_site.png"
        parentName="Magalie"
      />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

export default ParentLayout;
