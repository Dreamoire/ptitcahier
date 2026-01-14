import express from "express";

const router = express.Router();

import ticketActions from "./modules/ticket/ticketActions";
import ticketCategoryActions from "./modules/ticketCategory/ticketCategoryActions";

router.get(
  "/api/ticket-categories",
  ticketCategoryActions.browseAllTicketCategories,
);

router.post("/api/tickets", ticketActions.addTicket);

export default router;
