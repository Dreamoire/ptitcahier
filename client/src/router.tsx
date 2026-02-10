import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import ParentLayout from "./layouts/ParentLayout";
import SchoolLayout from "./layouts/SchoolLayout";
import AnnouncementsParentView from "./pages/announcement/AnnouncementsParentView";
import HomeParentView from "./pages/home/HomeParentView";
import Login from "./pages/login/Login";
import Redirection from "./pages/redirection/Redirection";
import TicketNew from "./pages/ticket/TicketNew";
import Tickets from "./pages/ticket/Tickets";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: "/", element: <Login /> },
      { path: "/redirection", element: <Redirection /> },

      {
        element: <ParentLayout />,
        children: [
          { path: "/parent/home", element: <HomeParentView /> },
          {
            path: "/parent/announcements",
            element: <AnnouncementsParentView />,
          },
          { path: "/parent/tickets/new", element: <TicketNew /> },
        ],
      },
      {
        element: <SchoolLayout />,
        children: [{ path: "/school/tickets", element: <Tickets /> }],
      },
    ],
  },
]);

export default router;
