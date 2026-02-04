import { Outlet } from "react-router";
import NavBarSchool from "../components/NavBar/NavBarSchool";
import styles from "./Layout.module.css";

function SchoolLayout() {
  return (
    <div className={styles.layout}>
      <NavBarSchool
        logoUrl="/src/assets/images/logo_site.png"
        schoolName="École Magalie"
      />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

export default SchoolLayout;
