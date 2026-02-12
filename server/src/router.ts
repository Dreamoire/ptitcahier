import express from "express";
import announcementActions from "./modules/announcement/announcementActions";
import announcementCategoryActions from "./modules/announcementCategory/announcementCategoryActions";
import authActions from "./modules/auth/authActions";
import classroomActions from "./modules/classroom/classroomActions";
import schoolActions from "./modules/school/schoolActions";
import studentActions from "./modules/student/studentActions";
import ticketActions from "./modules/ticket/ticketActions";
import ticketCategoryActions from "./modules/ticketCategory/ticketCategoryActions";
import userActions from "./modules/user/userActions";

const router = express.Router();

router.post("/login", authActions.login);

router.post(
  "/schools",
  schoolActions.validate,
  authActions.hashPassword,
  userActions.add,
  schoolActions.add,
);

router.use(authActions.verifyToken);

router.get("/announcements-categories", announcementCategoryActions.browseAll);

// PARENT protected routes

router.get(
  "/ticket-categories",
  authActions.verifyRole("parent"),
  ticketCategoryActions.browseAll,
);

router.post(
  "/tickets",
  authActions.verifyRole("parent"),
  ticketActions.validate,
  ticketActions.add,
);

router.get(
  "/parents/me/announcements",
  authActions.verifyRole("parent"),
  announcementActions.browseByParent,
);

router.get(
  "/parents/me/school",
  authActions.verifyRole("parent"),
  schoolActions.browseByParent,
);

router.get(
  "/parents/me/tickets/recent",
  authActions.verifyRole("parent"),
  ticketActions.browseRecentByParent,
);

router.get(
  "/parents/me/announcements/recent",
  authActions.verifyRole("parent"),
  announcementActions.browseRecentByParent,
);

router.get(
  "/parents/me/students",
  authActions.verifyRole("parent"),
  studentActions.browseByParent,
);

// SCHOOL protected routes

router.get(
  "/schools/me/tickets",
  authActions.verifyRole("school"),
  ticketActions.browseBySchool,
);

router.post(
  "/announcements",
  announcementActions.validate,
  announcementActions.add,
);

router.get("/schools/me/classrooms", classroomActions.browseBySchool);
router.get("/schools/me/students", studentActions.browseBySchool);
router.get("/classrooms/:id/students", studentActions.browseByClassroom);
router.get("/schools/me/announcements", announcementActions.browseBySchool);

export default router;
