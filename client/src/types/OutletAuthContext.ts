import type { Auth } from "./Auth";

export type OutletAuthContext = {
  auth: Auth | null;
  setAuth: React.Dispatch<React.SetStateAction<Auth | null>>;
};
