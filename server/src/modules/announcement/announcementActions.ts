import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import joi from "joi";
import announcementCategoryRepository from "../announcementCategory/announcementCategoryRepository";
import studentRepository from "../student/studentRepository";
import announcementRepository from "./announcementRepository";

const add: RequestHandler = async (req, res, next) => {
  try {
    const newAnnouncement = {
      title: req.body.title,
      content: req.body.content,
      announcementCategoryId: req.body.announcementCategoryId,
      studentIds: req.body.studentIds,
    };

    const SCHOOLID = 1;

    const newInsertedAnnouncementId = await announcementRepository.create(
      newAnnouncement,
      SCHOOLID,
    );

    res.status(StatusCodes.CREATED).json({
      newInsertedAnnouncementId,
    });
  } catch (err) {
    next(err);
  }
};

const browseByParent: RequestHandler = async (req, res, next) => {
  try {
    const parentId = 2;

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
  } catch (err) {
    next(err);
  }
};

const browseRecentByParent: RequestHandler = async (req, res, next) => {
  try {
    const parentId = 2;
    const announcements =
      await announcementRepository.readLastThreeByParent(parentId);
    res.json(announcements);
  } catch (err) {
    next(err);
  }
};

const browseBySchool: RequestHandler = async (req, res, next) => {
  try {
    const schoolId = 1;

    const categoryId = req.query.category
      ? Number(req.query.category)
      : undefined;

    const announcements = await announcementRepository.readAllBySchool(
      schoolId,
      categoryId,
    );

    res.json(announcements);
  } catch (err) {
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  try {
    const newAnnouncement = joi.object({
      title: joi.string().max(100).required(),
      content: joi.string().max(1000).required(),
      announcementCategoryId: joi.number().integer().positive().required(),
      studentIds: joi
        .array()
        .items(joi.number().integer().positive())
        .min(1)
        .required(),
    });

    const { error } = newAnnouncement.validate(req.body);

    if (error) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Les données envoyées sont invalides" });
      return;
    }

    const currentAnnouncementCategory =
      await announcementCategoryRepository.readById(
        req.body.announcementCategoryId,
      );

    if (!currentAnnouncementCategory) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Categorie introuvable" });
      return;
    }

    const SCHOOLID = 1;

    const studentIds = req.body.studentIds;

    for (const studentId of studentIds) {
      const currentStudent = await studentRepository.read(studentId);

      if (!currentStudent) {
        res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: "Étudiant introuvable" });
        return;
      }

      if (currentStudent.schoolId !== SCHOOLID) {
        res
          .status(StatusCodes.UNPROCESSABLE_ENTITY)
          .json({ error: "L'étudiant n'appartient pas à cette école" });
        return;
      }
    }

    next();
  } catch (err) {
    next(err);
  }
};

export default {
  add,
  browseByParent,
  browseRecentByParent,
  browseBySchool,
  validate,
};
