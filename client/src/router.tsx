import { createBrowserRouter } from "react-router";
import App from "./App";
import Announcements from "./pages/announcement/Announcements";
import Tickets from "./pages/ticket/Tickets";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
