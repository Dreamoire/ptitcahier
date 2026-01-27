import type { RequestHandler } from "express";
import {
  ClassroomsBySchool,
  studentsInClassroom,
} from "../announcement/announcementRepository";

const SCHOOL_ID = 1;

const browseClassrooms: RequestHandler = async (_req, res, next) => {
  try {
    const classrooms = await ClassroomsBySchool(SCHOOL_ID);
    res.status(200).json(classrooms);
  } catch (err) {
    next(err);
  }
};

const browseStudentsInClassroom: RequestHandler = async (req, res, next) => {
  try {
    const classroomId = Number(req.params.id);

    const students = await studentsInClassroom(classroomId, SCHOOL_ID);

    res.status(200).json(students);
  } catch (err) {
    next(err); //next(err) is not recommended with async function
  }
};

export default { browseClassrooms, browseStudentsInClassroom };
