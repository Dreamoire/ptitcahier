import express from "express";
import ticketActions from "./modules/ticket/ticketActions";

const router = express.Router();
router.get("/tickets", ticketActions.browseBySchool);

export default router;
