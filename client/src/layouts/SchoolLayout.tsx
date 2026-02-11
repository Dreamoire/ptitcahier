import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import LogoutButton from "../components/LogoutButton/LogoutButton";
import type { OutletAuthContext } from "../types/OutletAuthContext";
import type { School } from "../types/School";

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

  if (auth === null || auth.role !== "school") {
    return <Navigate to="/" replace />;
  }

  const schoolProfile = auth.profile as School;

  return (
    <>
      <div>
        <div>
          SCHOOL NAV BAR ---- Logged in as : {auth.role}--
          {schoolProfile.name} <LogoutButton />
        </div>
        <div>
          <Outlet context={{ auth, setAuth }} />
        </div>
      </div>
    </>
  );
}

export default SchoolLayout;
