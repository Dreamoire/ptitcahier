import type { RequestHandler } from "express";
import { findClassroomsWithStudents } from "../announcement/announcementRepository";

const browse: RequestHandler = async (req, res) => {
  try {
    if (req.query.include !== "students") {
      res
        .status(400)
        .json({ message: "Query parameter include=students is required" });
      return;
    }

    const schoolId = 1; //step 9 config later
    const rows = await findClassroomsWithStudents(schoolId);

    const map = new Map<
      number,
      {
        classroomId: number;
        classroomName: string;
        students: {
          studentId: number;
          studentFirstName: string;
          studentLastName: string;
        }[];
      }
    >();
    for (const row of rows) {
      if (!map.has(row.classroomId)) {
        map.set(row.classroomId, {
          classroomId: row.classroomId,
          classroomName: row.classroomName,
          students: [],
        });
      }
      map.get(row.classroomId)?.students.push({
        studentId: row.studentId,
        studentFirstName: row.studentFirstName,
        studentLastName: row.studentLastName,
      });
    }

    res.status(200).json(Array.from(map.values()));
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export default { browse };
