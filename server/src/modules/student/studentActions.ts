import type { RequestHandler } from "express";
import studentRepository from "./studentRepository";

const browseAllStudents: RequestHandler = async (req, res, next) => {
  try {
    const parentId = 1;
    const students = await studentRepository.readAllByParent(parentId);

    res.json(students);
  } catch (err) {
    next(err);
  }
};

export default { browseAllStudents };
