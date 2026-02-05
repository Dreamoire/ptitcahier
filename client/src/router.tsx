import { createBrowserRouter } from "react-router";
import ParentLayout from "./layouts/ParentLayout";
import SchoolLayout from "./layouts/SchoolLayout";
import AnnouncementsParentView from "./pages/announcement/AnnouncementsParentView";
import HomeParentView from "./pages/home/HomeParentView";
import TicketNew from "./pages/ticket/TicketNew";
import Tickets from "./pages/ticket/Tickets";

const router = createBrowserRouter([
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
    path: "/school",
    element: <SchoolLayout />,
    children: [
      {
        path: "tickets",
        element: <Tickets />,
      },
    ],
  },
  {
    path: "/parent",
    element: <ParentLayout />,
    children: [
      {
        path: "announcements",
        element: <AnnouncementsParentView />,
      },
    ],
  },
]);

export default router;
