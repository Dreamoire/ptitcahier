import { createBrowserRouter } from "react-router";

import Announcements from "./pages/announcement/Announcements";
import Connexion from "./pages/connexion/Connexion";
import TicketNew from "./pages/ticket/TicketNew";
import Tickets from "./pages/ticket/Tickets";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Connexion />,
  },
  {
    path: "/parent/announcements",
    element: <Announcements />,
  },
  {
    path: "/parent/tickets/new",
    element: <TicketNew />,
  },
  {
    path: "/school/tickets",
    element: <Tickets />,
  },
]);

export default router;
