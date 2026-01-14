import type { RequestHandler } from "express";
import announcementRepository from "./announcementRepository";

const browseByParent: RequestHandler = async (req, res, next) => {
  try {
    const announcements = await announcementRepository.readAllByParent();
    res.json(announcements);
  } catch (err) {
    next(err);
  }
};

export default { browseByParent };
