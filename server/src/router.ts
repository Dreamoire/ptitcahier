import { Router } from "express";

import announcementAction from "./modules/announcement/announcementAction";
import announcementCategoryAction from "./modules/announcement/announcementCategoryAction";
import classroomAction from "./modules/classroom/classroomAction";
import newAnnouncementValidation from "./modules/middleware/newAnnouncementValidation";

const router = Router();

router.get("/announcements", announcementAction.browse);

router.post(
  "/announcements",
  newAnnouncementValidation,
  announcementAction.add,
);

router.get("/announcement-categories", announcementCategoryAction.browse);

router.get("/classrooms", classroomAction.browse);

export default router;
