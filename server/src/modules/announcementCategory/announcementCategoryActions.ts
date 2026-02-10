import type { RequestHandler } from "express";
import announcementCategoryRepository from "./announcementCategoryRepository";

const browseAll: RequestHandler = async (req, res, next) => {
  try {
    const announcementCategories =
      await announcementCategoryRepository.readAll();
    res.json(announcementCategories);
  } catch (err) {
    next(err);
  }
};

export default { browseAll };
