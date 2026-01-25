import express from "express";

const router = express.Router();

import studentActions from "./modules/student/studentActions";
import ticketActions from "./modules/ticket/ticketActions";
import ticketCategoryActions from "./modules/ticketCategory/ticketCategoryActions";

router.get(
  "/ticket-categories",
  ticketCategoryActions.browseAllTicketCategories,
);

router.post(
  "/tickets",
  // ticketActions.validateTicketFormat,
  ticketActions.addTicket,
);

router.get("/parents/me/students", studentActions.browseAllStudents);

export default router;
