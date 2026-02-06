import express from "express";

import announcementActions from "./modules/announcement/announcementActions";
import announcementCategoryActions from "./modules/announcementCategory/announcementCategoryActions";
import classroomActions from "./modules/classroom/classroomActions";
import studentActions from "./modules/student/studentActions";
import ticketActions from "./modules/ticket/ticketActions";
import ticketCategoryActions from "./modules/ticketCategory/ticketCategoryActions";

const router = express.Router();

router.post(
  "/announcements",
  announcementActions.validate,
  announcementActions.add,
);

router.get("/announcements-categories", announcementCategoryActions.browseAll);

router.get("/schools/me/classrooms", classroomActions.browseBySchool);
router.get("/schools/me/students", studentActions.browseBySchool);
router.get(
  "/classrooms/:id/students",
  classroomActions.browseStudentsInClassroom,
);
router.get("/schools/me/announcements", announcementActions.browseBySchool);

router.get("/parents/me/announcements", announcementActions.browseByParent);

router.get("/parents/me/students", studentActions.browseByParent);

router.get("/schools/me/tickets", ticketActions.browseBySchool);
router.post("/tickets", ticketActions.validate, ticketActions.add);

router.get("/ticket-categories", ticketCategoryActions.browseAll);

export default router;
