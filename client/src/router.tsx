import { createBrowserRouter } from "react-router";
import App from "./App";
import TicketNew from "./pages/ticket/TicketNew";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/parent/tickets/new",
    element: <TicketNew />,
  },
]);

export default router;
