import type { RequestHandler } from "express";
import announcementRepository from "./announcementRepository";

const browseByParent: RequestHandler = async (req, res, next) => {
  try {
    const parentId = 1;
    const announcements =
      await announcementRepository.readAllByParent(parentId);
    res.json(announcements);
  } catch (err) {
    next(err);
  }
};

const browseRecentByParent: RequestHandler = async (req, res, next) => {
  try {
    const parentId = 1;
    const annoucements =
      await announcementRepository.readLastThreeByParent(parentId);
    res.json(annoucements);
  } catch (err) {
    next(err);
  }
};

export default { browseByParent, browseRecentByParent };
