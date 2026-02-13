import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import ParentLayout from "./layouts/ParentLayout";
import SchoolLayout from "./layouts/SchoolLayout";
import AnnouncementNew from "./pages/announcement/AnnouncementNew";
import Announcements from "./pages/announcement/Announcements";
import Home from "./pages/home/Home";
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
          { path: "/parent/home", element: <Home userRole="parent" /> },
          {
            path: "/parent/announcements",
            element: <Announcements userRole="parent" />,
          },
          { path: "/parent/tickets/new", element: <TicketNew /> },
        ],
      },
      {
        element: <SchoolLayout />,
        children: [
          { path: "/school/home", element: <Home userRole="school" /> },
          {
            path: "/school/announcements",
            element: <Announcements userRole="school" />,
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
