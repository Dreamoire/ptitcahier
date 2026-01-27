import type { RequestHandler } from "express";
import { AnnouncementCategories } from "./announcementRepository";

const browse: RequestHandler = async (_req, res, next) => {
  try {
    const categories = await AnnouncementCategories();
    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
};

export default { browse };
