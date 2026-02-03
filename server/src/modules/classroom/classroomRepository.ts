import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

class ClassroomRepository {
  async readAllBySchool(schoolId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT id, classroom_name AS name
       FROM classroom
       WHERE school_id = ?`,
      [schoolId],
    );

    return rows;
  }

  async readStudentsInClassroom(classroomId: number, SCHOOL_ID: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT s.id, s.first_name AS firstname, s.last_name AS lastname
       FROM student s
       JOIN classroom c ON c.id = s.classroom_id
       WHERE c.id = ? AND c.school_id = ?
       ORDER BY s.last_name ASC, s.first_name ASC`,
      [classroomId, SCHOOL_ID],
    );

    return rows;
  }

  async readAllStudentsBySchool(schoolId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT s.id,
              s.first_name AS firstname,
              s.last_name AS lastname,
              s.classroom_id AS classroomId,
              c.classroom_name AS classroomName
       FROM student s
       JOIN classroom c ON c.id = s.classroom_id
       WHERE c.school_id = ?
       ORDER BY s.last_name ASC, s.first_name ASC`,
      [schoolId],
    );

    return rows;
  }
}

export default new ClassroomRepository();
