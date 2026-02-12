import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import ParentLayout from "./layouts/ParentLayout";
import SchoolLayout from "./layouts/SchoolLayout";
import AnnouncementNew from "./pages/announcement/AnnouncementNew";
import AnnouncementsParentView from "./pages/announcement/AnnouncementsParentView";
import AnnouncementsSchoolView from "./pages/announcement/AnnouncementsSchoolView";
import HomeParentView from "./pages/home/HomeParentView";
import HomeSchoolView from "./pages/home/HomeSchoolView";
import PublicHome from "./pages/home/PublicHome";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import Redirection from "./pages/redirection/Redirection";
import TicketNew from "./pages/ticket/TicketNew";
import Tickets from "./pages/ticket/Tickets";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicHome />,
  },

  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
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
        children: [
          { path: "/school/home", element: <HomeSchoolView /> },
          {
            path: "/school/announcements",
            element: <AnnouncementsSchoolView />,
          },
          {
            path: "/school/announcements/new",
            element: <AnnouncementNew />,
          },
          { path: "/school/tickets", element: <Tickets /> },
        ],
      },
    ],
  },
]);

export default router;
