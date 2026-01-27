import type { RequestHandler } from "express";
import announcementRepository from "./announcementRepository";

const addAnnouncement: RequestHandler = async (req, res, next) => {
  try {
    const newAnnouncement = {
      title: req.body.title,
      content: req.body.content,
      announcementCategoryId: req.body.announcementCategoryId,
      studentIds: req.body.studentIds,
    };

    const SCHOOLID = 1; // to change later

    const newInsertedAnnouncementId =
      await announcementRepository.createAnnouncement(
        newAnnouncement,
        SCHOOLID,
      );

    res.status(201).json({
      newInsertedAnnouncementId,
    });
  } catch (err) {
    next(err);
  }
};

export default { addAnnouncement };
