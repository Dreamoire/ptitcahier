import express from "express";
import announcementActions from "./modules/announcement/announcementActions";
import announcementCategoryActions from "./modules/announcementCategory/announcementCategoryActions";
import authActions from "./modules/auth/authActions";
import schoolActions from "./modules/school/schoolActions";
import studentActions from "./modules/student/studentActions";
import ticketActions from "./modules/ticket/ticketActions";
import ticketCategoryActions from "./modules/ticketCategory/ticketCategoryActions";
import userActions from "./modules/user/userActions";

const router = express.Router();

//PARENT and SCHOOL login
router.post("/login", authActions.login);

//Register school
router.post(
  "/register/school",
  schoolActions.validate,
  authActions.hashPassword,
  userActions.add,
  schoolActions.add,
);

//Auth wall
router.use(authActions.verifyToken);

router.get("/ticket-categories", ticketCategoryActions.browseAll); //new Ticket form
router.get("/announcement-categories", announcementCategoryActions.browseAll); //new Annonce form

/////////////////

const parentRouter = express.Router();
parentRouter.use(authActions.verifyRole("parent"));

const schoolRouter = express.Router();
schoolRouter.use(authActions.verifyRole("school"));

/////////////////

parentRouter.get("/me/school", schoolActions.browseByParent); //PARENT home
parentRouter.get("/me/tickets/recent", ticketActions.browseRecentByParent); //PARENT home
parentRouter.get(
  "/me/announcements/recent",
  announcementActions.browseRecentByParent,
); //PARENT home
parentRouter.get("/me/announcements", announcementActions.browseByParent); //PARENT announces
parentRouter.get("/me/students", studentActions.browseByParent); //PARENT new ticket form + PARENT announces
parentRouter.post("/tickets", ticketActions.validate, ticketActions.add); //PARENT creates new ticket

/////////////////

schoolRouter.get("/me/tickets", ticketActions.browseBySchool); //SCHOOL tickets
schoolRouter.get("/me/announcements", announcementActions.browseBySchool); //SCHOOL annonces
schoolRouter.get("/me/students", studentActions.browseBySchool); //SCHOOL new annonce form
schoolRouter.post(
  "/announcements",
  announcementActions.validate,
  announcementActions.add,
); //SCHOOL creates new annonce

router.use("/parents", parentRouter);
router.use("/schools", schoolRouter);

export default router;
