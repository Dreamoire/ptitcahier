import type { RequestHandler } from "express";
import classroomRepository from "./classroomRepository";

const browseBySchool: RequestHandler = async (req, res, next) => {
  try {
    const schoolId = Number(req.auth.sub);

    const classrooms = await classroomRepository.readAllBySchool(schoolId);
    res.json(classrooms);
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    await classroomRepository.create(req.schoolId);
  } catch (err) {
    next(err);
  }
};

export default { add, browseBySchool };
