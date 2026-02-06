import type { RequestHandler } from "express";
import studentRepository from "./studentRepository";

const browseByParent: RequestHandler = async (req, res, next) => {
  try {
    const parentId = 1;
    //hard coded for now
    const students = await studentRepository.readAllByParent(parentId);

    res.json(students);
  } catch (err) {
    next(err);
  }
};

const browseBySchool: RequestHandler = async (req, res, next) => {
  try {
    const SCHOOL_ID = 1;
    const students = await studentRepository.readAllStudentsBySchool(SCHOOL_ID);

    res.status(200).json(students);
  } catch (err) {
    next(err);
  }
};

export default { browseByParent, browseBySchool };
