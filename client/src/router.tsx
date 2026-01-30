import { createBrowserRouter } from "react-router";
import App from "./App";
import Announcements from "./pages/announcement/Announcements";
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
]);

export default router;
