import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import type { OutletAuthContext } from "../types/OutletAuthContext";
import type { School } from "../types/School";

function SchoolLayout() {
  const { auth, setAuth } = useOutletContext<OutletAuthContext>();

  if (!auth) {
    return null;
  }

  if (auth.role !== "school") {
    return <Navigate to="/redirection" replace />;
  }

  const schoolProfile = auth.profile as School;

  return (
    <>
      <div>
        <div>
          SCHOOL NAV BAR ---- Logged in as : {auth.role}--
          {schoolProfile.name}
        </div>
        <div>
          <Outlet context={{ auth, setAuth }} />
        </div>
      </div>
    </>
  );
}

export default SchoolLayout;
