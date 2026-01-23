import express from "express";

const router = express.Router();

import announcementActions from "./modules/announcement/announcementActions";

router.get("/parents/me/announcements", announcementActions.browseByParent);

export default router;
