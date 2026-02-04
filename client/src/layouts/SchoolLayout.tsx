import { Outlet } from "react-router";
import schoolVoltaire from "../assets/images/school_voltaire.jpg";
import NavBarSchool from "../components/NavBar/NavBarSchool";
import styles from "./Layout.module.css";

function SchoolLayout() {
  return (
    <div className={styles.layout}>
      <NavBarSchool logoUrl={schoolVoltaire} schoolName="École Voltaire" />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

export default SchoolLayout;
