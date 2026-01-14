import express from "express";

const router = express.Router();

import announcementActions from "./modules/announcement/announcementActions";

router.get("/api/announcements", announcementActions.browseByParent);

export default router;
