import type { RequestHandler } from "express";
import announcementRepository from "./announcementRepository";

const browseByParent: RequestHandler = async (req, res) => {
  try {
    const parentId = 1;

    const categoryId = req.query.category
      ? Number(req.query.category)
      : undefined;

    const studentId = req.query.student ? Number(req.query.student) : undefined;

    console.log(req.query.student);

    const announcements = await announcementRepository.readAllByParent(
      parentId,
      categoryId,
      studentId,
    );

    res.json(announcements);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur");
  }
};

export default { browseByParent };
