import { createBrowserRouter } from "react-router";
import AnnouncementNew from "./pages/announcement/AnnouncementNew";
import Announcements from "./pages/announcement/Announcements";
import HomeParentView from "./pages/home/HomeParentView";

import TicketNew from "./pages/ticket/TicketNew";
import Tickets from "./pages/ticket/Tickets";

const router = createBrowserRouter([
  {
    path: "/parent/home",
    element: <HomeParentView userRole="parent" />,
  },
  {
    path: "/parent/announcements",
    element: <Announcements userRole="parent" />,
  },
  {
    path: "/parent/tickets/new",
    element: <TicketNew />,
  },

  {
    path: "/school/announcements",
    element: <Announcements userRole="school" />,
  },
  {
    path: "/school/tickets",
    element: <Tickets />,
  },
  {
    path: "/school/announcements/new",
    element: <AnnouncementNew />,
  },
]);

export default router;
