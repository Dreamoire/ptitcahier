import type { RequestHandler } from "express";
import announcementRepository from "./announcementRepository";

const browseByParent: RequestHandler = async (req, res, next) => {
  try {
    const parentId = 1;
    //hard coded for now
    const announcements =
      await announcementRepository.readAllByParent(parentId);
    res.json(announcements);
  } catch (err) {
    next(err);
  }
};

export default { browseByParent };
