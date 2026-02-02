import type { RequestHandler } from "express";
import classroomRepository from "./classroomRepository";

const SCHOOL_ID = 1;

const browseBySchool: RequestHandler = async (req, res, next) => {
  try {
    const classrooms = await classroomRepository.readAllBySchool(SCHOOL_ID);
    res.json(classrooms);
  } catch (err) {
    next(err);
  }
};

const browseStudentsInClassroom: RequestHandler = async (req, res, next) => {
  try {
    const classroomId = Number(req.params.id);

    const students = await classroomRepository.readStudentsInClassroom(
      classroomId,
      SCHOOL_ID,
    );

    res.status(200).json(students);
  } catch (err) {
    next(err);
  }
};

export default { browseBySchool, browseStudentsInClassroom };
