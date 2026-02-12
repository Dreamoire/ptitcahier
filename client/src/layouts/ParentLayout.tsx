import { Outlet } from "react-router";

import parentAvatar from "../assets/images/parent_icon.jpg";
import NavBar from "../components/NavBar/NavBar";
import styles from "./Layout.module.css";

function ParentLayout() {
  return (
    <div className={styles.layout}>
      <NavBar variant="parent" avatarUrl={parentAvatar} displayName="Magalie" />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

export default ParentLayout;
