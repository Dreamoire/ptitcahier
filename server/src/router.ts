import express from "express";

const router = express.Router();

import announcementActions from "./modules/announcement/announcementActions";

router.get("/api/announcements", announcementActions.browse);

export default router;
