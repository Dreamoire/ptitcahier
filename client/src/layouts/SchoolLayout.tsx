import { Outlet } from "react-router";

import schoolVoltaire from "../assets/images/school_voltaire.jpg";
import schoolZola from "../assets/images/school_zola.jpg";
import NavBarSchool from "../components/NavBar/NavBarSchool";
import styles from "./Layout.module.css";

type SchoolKey = "voltaire" | "zola";

const school: SchoolKey = "voltaire";

const schoolLogos: Record<SchoolKey, string> = {
  voltaire: schoolVoltaire,
  zola: schoolZola,
};

const schoolNames: Record<SchoolKey, string> = {
  voltaire: "École Voltaire",
  zola: "École Zola",
};

function SchoolLayout() {
  return (
    <div className={styles.layout}>
      <NavBarSchool
        logoUrl={schoolLogos[school]}
        schoolName={schoolNames[school]}
      />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

export default SchoolLayout;
