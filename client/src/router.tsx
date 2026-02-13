import { createBrowserRouter } from "react-router";

import ParentLayout from "./layouts/ParentLayout";
import SchoolLayout from "./layouts/SchoolLayout";

import AnnouncementNew from "./pages/announcement/AnnouncementNew";
import Announcements from "./pages/announcement/Announcements";
import Home from "./pages/home/Home";

import TicketNew from "./pages/ticket/TicketNew";
import Tickets from "./pages/ticket/Tickets";
import HomePage from "./pages/home/Home";

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
        element: <Tickets userRole="parent" />,
      },
      {
        path: "tickets/new",
        element: <TicketNew />,
      },
      {
        path: "home",
        element: <HomePage userRole="parent" />,
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
        element: <Tickets userRole="school" />,
      },
      {
        path: "home",
        element: <Home userRole="school" />,
      },
    ],
  },
]);

export default router;
