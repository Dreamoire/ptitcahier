import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import schoolVoltaire from "../assets/images/school_voltaire.jpg";
import schoolZola from "../assets/images/school_zola.jpg";
import NavBarSchool from "../components/NavBar/NavBarSchool";
import type { OutletAuthContext } from "../types/OutletAuthContext";
import type { School } from "../types/School";
import styles from "./Layout.module.css";

function SchoolLayout() {
  const { auth, setAuth } = useOutletContext<OutletAuthContext>();

  //   if (auth === undefined) {
  //   return (
  //     <div style={{ textAlign: "center", marginTop: "2rem" }}>
  //       <div className="spinner" />
  //       <p>Loading...</p>
  //     </div>
  //   );
  // }

  if (auth === undefined) return <div>Loading...</div>;

  if (auth === null) {
    return <Navigate to="/" replace />;
  }

  if (auth.role !== "school") {
    return <Navigate to="/redirection" replace />;
  }

  const schoolProfile = auth.profile as School;

  type SchoolKey = "voltaire" | "zola";

  const school: SchoolKey = "voltaire";

  const schoolLogos: Record<SchoolKey, string> = {
    voltaire: schoolVoltaire,
    zola: schoolZola,
  };

  return (
    <>
      <div className={styles.layout}>
        <NavBarSchool
          logoUrl={schoolLogos[school]}
          schoolName={schoolProfile.name}
        />

        <div className={styles.main}>
          <Outlet context={{ auth, setAuth }} />
        </div>
      </div>
    </>
  );
}

export default SchoolLayout;
