import express from "express";
import ticketActions from "./modules/ticket/ticketActions";

const router = express.Router();
router.get("/schools/me/tickets", ticketActions.browseBySchool);

import announcementActions from "./modules/announcement/announcementActions";
import schoolActions from "./modules/school/schoolActions";

router.get("/parents/me/announcements", announcementActions.browseByParent);
router.get("/parents/me/school", schoolActions.browseByParent);
router.get("/parents/me/tickets/recent", ticketActions.browseRecentByParent);
router.get(
  "/parents/me/announcements/recent",
  announcementActions.browseRecentByParent,
);

export default router;
