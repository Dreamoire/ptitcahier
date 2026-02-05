import { createBrowserRouter } from "react-router";

import AnnouncementsParentView from "./pages/announcement/AnnouncementsParentView";
import Login from "./pages/connexion/Login";
import HomeParentView from "./pages/home/HomeParentView";
import TicketNew from "./pages/ticket/TicketNew";
import Tickets from "./pages/ticket/Tickets";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/parent/home",
    element: <HomeParentView />,
  },
  {
    path: "/parent/announcements",
    element: <AnnouncementsParentView />,
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
