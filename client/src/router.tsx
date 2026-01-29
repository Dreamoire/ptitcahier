import { createBrowserRouter } from "react-router";
import Announcements from "./pages/announcement/Announcements";
import Home from "./pages/home/Home";
import Tickets from "./pages/ticket/Tickets";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
