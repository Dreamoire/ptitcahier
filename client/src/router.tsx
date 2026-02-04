import { createBrowserRouter } from "react-router";
import App from "./App";
import ParentLayout from "./layouts/ParentLayout";
import SchoolLayout from "./layouts/SchoolLayout";
import Announcements from "./pages/announcement/Announcements";
import Tickets from "./pages/ticket/Tickets";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/school",
    element: <SchoolLayout />,
    children: [
      {
        path: "tickets",
        element: <Tickets />,
      },
    ],
  },
  {
    path: "/parent",
    element: <ParentLayout />,
    children: [
      {
        path: "announcements",
        element: <Announcements />,
      },
    ],
  },
]);

export default router;
