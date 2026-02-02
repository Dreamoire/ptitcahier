import { createBrowserRouter } from "react-router";
import Announcements from "./pages/announcement/Announcements";
import HomeParentView from "./pages/home/HomeParentView";
import Tickets from "./pages/ticket/Tickets";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeParentView />,
  },
  {
    path: "/school/tickets",
    element: <Tickets />,
  },
  {
    path: "/parent/announcements",
    element: <Announcements />,
  },
]);

export default router;
