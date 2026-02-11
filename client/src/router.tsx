import { createBrowserRouter } from "react-router";

import ParentLayout from "./layouts/ParentLayout";
import SchoolLayout from "./layouts/SchoolLayout";

import AnnouncementNew from "./pages/announcement/AnnouncementNew";
import Announcements from "./pages/announcement/Announcements";
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
        element: <Announcements userRole="parent" />,
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
        element: <HomeParentView userRole="parent" />,
      },
    ],
  },
  {
    path: "/school",
    element: <SchoolLayout />,
    children: [
      {
        path: "announcements",
        element: <Announcements userRole="school" />,
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
