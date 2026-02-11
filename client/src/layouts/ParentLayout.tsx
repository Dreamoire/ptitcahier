import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import LogoutButton from "../components/LogoutButton/LogoutButton";
import type { Parent } from "../types/Auth";
import type { OutletAuthContext } from "../types/OutletAuthContext";

function ParentLayout() {
  const { auth, setAuth } = useOutletContext<OutletAuthContext>();

  if (auth === undefined) return <div>Loading...</div>;

  if (auth === null || auth.role !== "parent") {
    return <Navigate to="/" replace />;
  }

  const parentProfile = auth.profile as Parent;

  return (
    <>
      <div>
        <div>
          PARENT NAV BAR ---- Logged in as : {auth.role}--
          {parentProfile.firstName}--{parentProfile.lastName} <LogoutButton />
        </div>
        <div>
          <Outlet context={{ auth, setAuth }} />
        </div>
      </div>
    </>
  );
}

export default ParentLayout;
