import { createBrowserRouter } from "react-router";
import App from "./App";
import AnnouncementsParentView from "./pages/announcement/AnnouncementsParentView";
import AnnouncementsSchoolView from "./pages/announcement/AnnouncementsSchoolView";
// import AnnouncementNew from "./pages/announcement/AnnouncementNew";
import JennTest from "./pages/announcement/JennTest";
import TicketNew from "./pages/ticket/TicketNew";
import Tickets from "./pages/ticket/Tickets";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
    element: <JennTest />,
  },
]);

export default router;
