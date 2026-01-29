import express from "express";

const router = express.Router();

import announcementActions from "./modules/announcement/announcementActions";
import schoolActions from "./modules/school/schoolActions";

router.get("/parents/me/announcements", announcementActions.browseByParent);
router.get("/parents/me/school", schoolActions.browseByParent);

export default router;
