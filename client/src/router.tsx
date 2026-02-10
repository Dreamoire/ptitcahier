import { createBrowserRouter } from "react-router";

import ParentLayout from "./layouts/ParentLayout";
import SchoolLayout from "./layouts/SchoolLayout";

import AnnouncementNew from "./pages/announcement/AnnouncementNew";
import AnnouncementsParentView from "./pages/announcement/AnnouncementsParentView";
import AnnouncementsSchoolView from "./pages/announcement/AnnouncementsSchoolView";
import HomeParentView from "./pages/home/HomeParentView";
import TicketNew from "./pages/ticket/TicketNew";
import Tickets from "./pages/ticket/Tickets";

const router = createBrowserRouter([
  {
    path: "/parent",
    element: <ParentLayout />,
    children: [
      {
        path: "announcements",
        element: <AnnouncementsParentView />,
      },
      {
        path: "tickets",
        element: <Tickets />,
      },
      {
        path: "tickets/new",
        element: <TicketNew />,
      },
      {
        path: "home",
        element: <HomeParentView />,
      },
    ],
  },
  {
    path: "/school",
    element: <SchoolLayout />,
    children: [
      {
        path: "announcements",
        element: <AnnouncementsSchoolView />,
      },
      {
        path: "announcements/new",
        element: <AnnouncementNew />,
      },
      {
        path: "tickets",
        element: <Tickets />,
      },
    ],
  },
]);

export default router;
