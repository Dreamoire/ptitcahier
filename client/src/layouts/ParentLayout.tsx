import { Outlet } from "react-router";
import parentAvatar from "../assets/images/parent_icon.jpg";
import NavBarParent from "../components/NavBar/NavBarParent";
import styles from "./Layout.module.css";

function ParentLayout() {
  return (
    <div className={styles.layout}>
      <NavBarParent avatarUrl={parentAvatar} parentName="Magalie" />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

export default ParentLayout;
