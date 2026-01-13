import express from "express";

const router = express.Router();

import ticketCategoryActions from "./modules/ticketCategory/ticketCategoryActions";

router.get(
  "/api/ticket-categories",
  ticketCategoryActions.browseAllTicketCategories,
);

export default router;
