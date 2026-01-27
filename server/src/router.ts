import { Router } from "express";

import announcementActions from "./modules/announcement/announcementActions";
import announcementCategoryAction from "./modules/announcement/announcementCategoryAction";
import classroomAction from "./modules/classroom/classroomAction";
import newAnnouncementValidation from "./modules/middleware/newAnnouncementValidation";

const router = Router();

router.post(
  "/announcements",
  newAnnouncementValidation,
  announcementActions.addAnnouncement,
);

router.get("/announcements-categories", announcementCategoryAction.browse);

router.get("/classrooms", classroomAction.browseClassrooms);
router.get(
  "/classrooms/:id/students",
  classroomAction.browseStudentsInClassroom,
);

export default router;
