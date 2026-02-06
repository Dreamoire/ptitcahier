import { useState } from "react";
import { Outlet } from "react-router-dom";
import type { Auth } from "../types/Auth";

function AuthLayout() {
  const [auth, setAuth] = useState<Auth | null>(null);

  return <Outlet context={{ auth, setAuth }} />;
}

export default AuthLayout;
