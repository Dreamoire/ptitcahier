import type { RequestHandler } from "express";
import announcementRepository from "./announcementRepository";

const browse: RequestHandler = async (req, res) => {
  try {
    const parentId = 1;

    if (req.query.category) {
      const categoryId = Number(req.query.category);

      const announcements = await announcementRepository.readAllByCategory(
        parentId,
        categoryId,
      );

      res.json(announcements);
      return;
    }

    const announcements =
      await announcementRepository.readAllByParent(parentId);

    res.json(announcements);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur");
  }
};

export default { browse };
