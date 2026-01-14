import { Router } from "express";

import announcementAction from "./modules/announcement/announcementAction";
import announcementCategoryAction from "./modules/announcement/announcementCategoryAction";
import classroomAction from "./modules/classroom/classroomAction";

const router = Router();

router.get("/announcement-categories", announcementCategoryAction.browse);

router.get("/classrooms", classroomAction.browse);

router.get("/announcements", announcementAction.browse);

router.post("/announcements", announcementAction.add);

export default router;
