import { createBrowserRouter } from "react-router";

import ParentLayout from "./layouts/ParentLayout";
import SchoolLayout from "./layouts/SchoolLayout";

import AnnouncementsParentView from "./pages/announcement/AnnouncementsParentView";
import HomeParentView from "./pages/home/HomeParentView";
import TicketNew from "./pages/ticket/TicketNew";
import Tickets from "./pages/ticket/Tickets";

const router = createBrowserRouter([
  {
    path: "/parent",
    element: <ParentLayout />,
    children: [
      {
        path: "home",
        element: <HomeParentView />,
      },
      {
        path: "announcements",
        element: <AnnouncementsParentView />,
      },
      {
        path: "tickets/new",
        element: <TicketNew />,
      },
    ],
  },
  {
    path: "/school",
    element: <SchoolLayout />,
    children: [
      {
        path: "tickets",
        element: <Tickets />,
      },
    ],
  },
]);

export default router;
