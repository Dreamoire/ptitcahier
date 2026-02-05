import express from "express";
import announcementActions from "./modules/announcement/announcementActions";
import authActions from "./modules/auth/authActions";
import parentRepository from "./modules/parent/parentRepository";
import schoolActions from "./modules/school/schoolActions";
import schoolRepository from "./modules/school/schoolRepository";

import studentActions from "./modules/student/studentActions";
import ticketActions from "./modules/ticket/ticketActions";
import ticketCategoryActions from "./modules/ticketCategory/ticketCategoryActions";

const router = express.Router();

// Define auth-related routes
router.post("/login-parent", authActions.login("parent", parentRepository));
// router.post("/login-school", authActions.login("school", schoolRepository));

// Authentication wall
// router.use(authActions.verifyToken);

// GENERAL protected routes
router.get("/ticket-categories", ticketCategoryActions.browseAll);

// PARENT protected routes

router.post("/tickets", ticketActions.validate, ticketActions.add);
router.get("/parents/me/announcements", announcementActions.browseByParent);
router.get("/parents/me/school", schoolActions.browseByParent);
router.get("/parents/me/tickets/recent", ticketActions.browseRecentByParent);
router.get(
  "/parents/me/announcements/recent",
  announcementActions.browseRecentByParent,
);
router.get("/parents/me/students", studentActions.browseByParent);

// SCHOOL protected routes

router.get("/schools/me/tickets", ticketActions.browseBySchool);
//jennifer US4
//jenn partie 2 (page annonces avec le bouton create new annonce)
//tdb school US09 ?

export default router;
