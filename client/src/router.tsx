import { createBrowserRouter } from "react-router";
import App from "./App";
import Tickets from "./pages/ticket/Tickets";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/tickets",
    element: <Tickets />,
  },
]);

export default router;
