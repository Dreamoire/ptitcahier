import { createBrowserRouter } from "react-router";
import AnnouncementNew from "./pages/announcement/AnnouncementNew";
import AnnouncementsParentView from "./pages/announcement/AnnouncementsParentView";
import AnnouncementsSchoolView from "./pages/announcement/AnnouncementsSchoolView";
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
    path: "/school/tickets",
    element: <Tickets />,
  },
  {
    path: "/school/announcements",
    element: <AnnouncementsSchoolView />,
  },
  {
    path: "/school/announcements/new",
    element: <AnnouncementNew />,
  },
]);

export default router;
