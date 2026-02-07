import type { RequestHandler } from "express";
import announcementRepository from "./announcementRepository";

const browseByParent: RequestHandler = async (req, res) => {
  try {
    const parentId = 1;

    const categoryId = req.query.category
      ? Number(req.query.category)
      : undefined;

    const studentId = req.query.student ? Number(req.query.student) : undefined;

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

const browseBySchool: RequestHandler = async (req, res, next) => {
  try {
    const schoolId = 1;
    const announcements =
      await announcementRepository.readAllBySchool(schoolId);
    res.json(announcements);
  } catch (err) {
    next(err);
  }
};

export default { browseByParent, browseRecentByParent, browseBySchool };
