import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import studentRepository from "./studentRepository";

const browseByParent: RequestHandler = async (req, res, next) => {
  try {
    const parentId = Number(req.auth.sub);

    const students = await studentRepository.readAllByParent(parentId);
    res.json(students);
  } catch (err) {
    next(err);
  }
};

const browseBySchool: RequestHandler = async (req, res, next) => {
  try {
    const schoolId = Number(req.auth.sub);

    const students = await studentRepository.readAllBySchool(schoolId);
    res.json(students);
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const studentId = Number(req.params.id);

    if (!Number.isInteger(studentId)) {
      res.status(StatusCodes.BAD_REQUEST).json({
        error: "Identifiant d'étudiant invalide",
      });
      return;
    }

    const affectedRows = await studentRepository.delete(studentId);

    if (affectedRows === 0) {
      res.status(StatusCodes.NOT_FOUND).json({
        error: "Étudiant introuvable",
      });
      return;
    }

    res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (err) {
    next(err);
  }
};

export default { browseByParent, browseBySchool, destroy };
