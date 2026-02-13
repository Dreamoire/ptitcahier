import type { RequestHandler } from "express";
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

    const students = await studentRepository.readAllStudentsBySchool(schoolId);
    res.json(students);
  } catch (err) {
    next(err);
  }
};

export default { browseByParent, browseBySchool };
