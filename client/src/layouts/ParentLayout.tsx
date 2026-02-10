import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import type { Parent } from "../types/Auth";
import type { OutletAuthContext } from "../types/OutletAuthContext";

function ParentLayout() {
  const { auth, setAuth } = useOutletContext<OutletAuthContext>();

  if (!auth) {
    return null;
  }

  if (auth.role !== "parent") {
    return <Navigate to="/redirection" replace />;
  }

  const parentProfile = auth.profile as Parent;

  return (
    <>
      <div>
        <div>
          PARENT NAV BAR ---- Logged in as : {auth.role}--
          {parentProfile.firstName}--{parentProfile.lastName}
        </div>
        <div>
          <Outlet context={{ auth, setAuth }} />
        </div>
      </div>
    </>
  );
}

export default ParentLayout;
