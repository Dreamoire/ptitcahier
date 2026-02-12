import type { RequestHandler } from "express";
import classroomRepository from "./classroomRepository";

const browseBySchool: RequestHandler = async (req, res, next) => {
  try {
    const schoolId = 1;
    const classrooms = await classroomRepository.readAllBySchool(schoolId);
    res.json(classrooms);
  } catch (err) {
    next(err);
  }
};

export default { browseBySchool };
