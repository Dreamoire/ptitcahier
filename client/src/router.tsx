import { createBrowserRouter } from "react-router";
import App from "./App";
import Announcements from "./pages/announcement/Announcements";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/announcements",
    element: <Announcements />,
  },
]);

export default router;
