import express from "express";
import announcementActions from "./modules/announcement/announcementActions";
import schoolActions from "./modules/school/schoolActions";
import studentActions from "./modules/student/studentActions";
import ticketActions from "./modules/ticket/ticketActions";
import ticketCategoryActions from "./modules/ticketCategory/ticketCategoryActions";

const router = express.Router();

router.get("/parents/me/announcements", announcementActions.browseByParent);
router.get("/parents/me/school", schoolActions.browseByParent);
router.get("/parents/me/tickets/recent", ticketActions.browseRecentByParent);
router.get(
  "/parents/me/announcements/recent",
  announcementActions.browseRecentByParent,
);

router.get("/parents/me/students", studentActions.browseByParent);

router.get("/schools/me/tickets", ticketActions.browseBySchool);
router.post("/tickets", ticketActions.validate, ticketActions.add);

router.get("/ticket-categories", ticketCategoryActions.browseAll);

export default router;
