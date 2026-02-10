import express from "express";
import announcementActions from "./modules/announcement/announcementActions";
import authActions from "./modules/auth/authActions";
import schoolActions from "./modules/school/schoolActions";
import studentActions from "./modules/student/studentActions";
import ticketActions from "./modules/ticket/ticketActions";
import ticketCategoryActions from "./modules/ticketCategory/ticketCategoryActions";

const router = express.Router();

router.post("/login", authActions.login);

router.use(authActions.verifyToken);

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

export default router;
