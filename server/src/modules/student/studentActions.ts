import type { RequestHandler } from "express";
import studentRepository from "./studentRepository";

const SCHOOL_ID = 1;

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
    const students = await studentRepository.readAllStudentsBySchool(SCHOOL_ID);

    res.status(200).json(students);
  } catch (err) {
    next(err);
  }
};

const browseByClassroom: RequestHandler = async (req, res, next) => {
  try {
    const classroomId = Number(req.params.id);

    const students = await studentRepository.readByClassroom(
      classroomId,
      SCHOOL_ID,
    );

    res.status(200).json(students);
  } catch (err) {
    next(err);
  }
};

export default { browseByParent, browseBySchool, browseByClassroom };
