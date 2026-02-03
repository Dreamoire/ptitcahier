import { createBrowserRouter } from "react-router";
import App from "./App";
import AnnouncementNew from "./pages/announcement/AnnouncementNew";
import Announcements from "./pages/announcement/Announcements";
import AnnouncementsSchool from "./pages/announcement/AnnouncementsSchool";
import TicketNew from "./pages/ticket/TicketNew";
import Tickets from "./pages/ticket/Tickets";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
  {
    path: "/school/announcements",
    element: <AnnouncementsSchool />,
  },
  {
    path: "/school/announcements/new",
    element: <AnnouncementNew />,
  },
]);

export default router;
