import type { RequestHandler } from "express";
import { findAnnouncementCategories } from "./announcementRepository";

const browse: RequestHandler = async (req, res) => {
  try {
    const categories = await findAnnouncementCategories();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export default { browse };
