import express from "express";
import ticketActions from "./modules/ticket/ticketActions";

const router = express.Router();
router.get("/schools/me/tickets", ticketActions.browseBySchool);

import announcementActions from "./modules/announcement/announcementActions";

router.get("/parents/me/announcements", announcementActions.browseByParent);

export default router;
