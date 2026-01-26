import express from "express";

const router = express.Router();

import announcementActions from "./modules/announcement/announcementActions";
import studentActions from "./modules/student/studentActions";
import ticketActions from "./modules/ticket/ticketActions";
import ticketCategoryActions from "./modules/ticketCategory/ticketCategoryActions";

router.get(
  "/ticket-categories",
  ticketCategoryActions.browseAllTicketCategories,
);

router.post("/tickets", ticketActions.validate, ticketActions.addTicket);

router.get("/parents/me/students", studentActions.readAllByParent);

router.get("/parents/me/announcements", announcementActions.browseByParent);

export default router;
