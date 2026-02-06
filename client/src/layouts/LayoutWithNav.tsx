import { useState } from "react";
import { Outlet } from "react-router";
import type { Auth } from "../types/Auth";

function LayoutWithNav() {
  const [auth, setAuth] = useState(null as Auth | null);

  return (
    <>
      <div>
        {/* nav bar ici */}
        <main>
          <Outlet context={{ auth, setAuth }} />
        </main>
      </div>
    </>
  );
}
export default LayoutWithNav;
