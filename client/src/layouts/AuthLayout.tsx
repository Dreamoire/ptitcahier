import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import type { Auth } from "../types/Auth";

function AuthLayout() {
  const [auth, setAuth] = useState<Auth | null | undefined>(undefined);

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");

    if (storedAuth) {
      setAuth(JSON.parse(storedAuth));
    } else {
      setAuth(null);
    }
  }, []);

  if (auth === undefined)
    return <div className="general_error_message">Loading...</div>;

  return <Outlet context={{ auth, setAuth }} />;
}

export default AuthLayout;
