import databaseClient from "../../../database/client";

import type { Rows } from "../../../database/client";
import type { Student } from "../../types/express/Student";

class StudentRepository {
  async readAllByParent(parentId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT 
		s.id,
		s.last_name AS lastName,
		s.first_name AS firstName,
		born_at AS bornAt,
		classroom_id AS classroomId,
		parent_id AS parentId
		FROM student AS s
		JOIN parent AS p ON s.parent_id = p.id
		WHERE p.id = ?`,
      [parentId],
    );

    return rows as Student[];
  }

  async read(studentId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT 
		s.id,
		s.last_name AS lastName,
		s.first_name AS firstName,
		s.born_at AS bornAt,
		s.classroom_id AS classroomId,
		s.parent_id AS parentId,
		c.school_id AS schoolId
		FROM student AS s
		JOIN classroom AS c ON s.classroom_id = c.id
		WHERE s.id = ?`,
      [studentId],
    );

    return rows[0] as Student;
  }

  async readAllStudentsBySchool(schoolId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT
		s.id,
		s.first_name AS firstname,
		s.last_name AS lastname,
		s.classroom_id AS classroomId,
		c.name AS classroomName
		FROM student s
		JOIN classroom c ON c.id = s.classroom_id
		WHERE c.school_id = ?
		ORDER BY s.last_name ASC, s.first_name ASC`,
      [schoolId],
    );

    return rows;
  }

  async readByClassroom(classroomId: number, SCHOOL_ID: number) {
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
}

export default new StudentRepository();
