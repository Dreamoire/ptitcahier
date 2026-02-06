import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import LayoutWithNav from "./layouts/LayoutWithNav";
import AnnouncementsParentView from "./pages/announcement/AnnouncementsParentView";
import HomeParentView from "./pages/home/HomeParentView";
import Login from "./pages/login/Login";
import TicketNew from "./pages/ticket/TicketNew";
import Tickets from "./pages/ticket/Tickets";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        children: [{ path: "/", element: <Login /> }],
      },
      {
        element: <LayoutWithNav />,
        children: [
          { path: "/parent/home", element: <HomeParentView /> },
          {
            path: "/parent/announcements",
            element: <AnnouncementsParentView />,
          },
          { path: "/parent/tickets/new", element: <TicketNew /> },
          { path: "/school/tickets", element: <Tickets /> },
        ],
      },
    ],
  },
]);

export default router;
