import { Router } from "express";

import announcementActions from "./modules/announcement/announcementActions";
import announcementCategoryActions from "./modules/announcementCategory/announcementCategoryActions";
import classroomActions from "./modules/classroom/classroomActions";
import newAnnouncementValidation from "./modules/middleware/newAnnouncementValidation";

const router = Router();

router.post(
  "/announcements",
  newAnnouncementValidation,
  announcementActions.addAnnouncement,
);

router.get("/announcements-categories", announcementCategoryActions.browseAll);

router.get("/classrooms", classroomActions.browseBySchool);
router.get("/students", classroomActions.browseAllStudents);
router.get(
  "/classrooms/:id/students",
  classroomActions.browseStudentsInClassroom,
);

export default router;
