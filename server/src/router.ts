import express from "express";

import announcementActions from "./modules/announcement/announcementActions";
import authActions from "./modules/auth/authActions";
import parentRepository from "./modules/parent/parentRepository";
import schoolRepository from "./modules/school/schoolRepository";
import studentActions from "./modules/student/studentActions";
import ticketActions from "./modules/ticket/ticketActions";
import ticketCategoryActions from "./modules/ticketCategory/ticketCategoryActions";

const router = express.Router();

router.post("/login-parent", authActions.login("parent", parentRepository));
router.post("/login-school", authActions.login("school", schoolRepository));

router.get("/parents/me/announcements", announcementActions.browseByParent);

router.get("/parents/me/students", studentActions.browseByParent);

router.get("/schools/me/tickets", ticketActions.browseBySchool);
router.post("/tickets", ticketActions.validate, ticketActions.add);

router.get("/ticket-categories", ticketCategoryActions.browseAll);

export default router;
