import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import type { Auth } from "../types/Auth";

function AuthLayout() {
  const [auth, setAuth] = useState<Auth | null>(null);
  const location = useLocation();

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");

    if (storedAuth) {
      setAuth(JSON.parse(storedAuth));
    }
  }, []);

  if (auth === null) {
    return null;
  }

  if (!auth) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet context={{ auth, setAuth }} />;
}

export default AuthLayout;
