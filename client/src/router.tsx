import { createBrowserRouter } from "react-router";

import Announcements from "./pages/announcement/Announcements";
import Connexion from "./pages/connexion/Connexion";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Connexion />,
  },
  {
    path: "/parent/announcements",
    element: <Announcements />,
  },
]);

export default router;
