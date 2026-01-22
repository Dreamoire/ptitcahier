import type { RequestHandler } from "express";
import { findClassroomsWithStudents } from "../announcement/announcementRepository";

type Classroom = {
  classroomId: number;
  classroomName: string;
  students: {
    studentId: number;
    studentFirstName: string;
    studentLastName: string;
  }[];
};

const browse: RequestHandler = async (req, res) => {
  try {
    if (req.query.include !== "students") {
      res.status(400).json({ message: "Query parameter required students" });
      return;
    }

    const schoolId = 1; //step 9 config later

    const rows = await findClassroomsWithStudents(schoolId);

    const classrooms: Classroom[] = [];

    for (const row of rows) {
      let classroom = classrooms.find((c) => c.classroomId === row.classroomId);

      if (!classroom) {
        classroom = {
          classroomId: row.classroomId,
          classroomName: row.classroomName,
          students: [],
        };

        classrooms.push(classroom);
      }

      classroom.students.push({
        studentId: row.studentId,
        studentFirstName: row.studentFirstName,
        studentLastName: row.studentLastName,
      });
    }

    res.status(200).json(classrooms);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export default { browse };
