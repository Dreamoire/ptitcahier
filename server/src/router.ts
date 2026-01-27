import express from "express";

import announcementActions from "./modules/announcement/announcementActions";
import studentActions from "./modules/student/studentActions";
import ticketActions from "./modules/ticket/ticketActions";
import ticketCategoryActions from "./modules/ticketCategory/ticketCategoryActions";

const router = express.Router();

router.get(
  "/ticket-categories",
  ticketCategoryActions.browseAllTicketCategories,
);

router.get("/schools/me/tickets", ticketActions.browseBySchool);
router.post("/tickets", ticketActions.validate, ticketActions.addTicket);

router.get("/parents/me/students", studentActions.readAllByParent);

router.get("/parents/me/announcements", announcementActions.browseByParent);

export default router;
