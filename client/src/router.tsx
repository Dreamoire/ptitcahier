import { createBrowserRouter } from "react-router";
import Announcements from "./pages/announcement/Announcements";
import Home from "./pages/home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/parent/announcements",
    element: <Announcements />,
  },
]);

export default router;
