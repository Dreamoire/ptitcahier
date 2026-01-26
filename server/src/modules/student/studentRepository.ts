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

  async readById(studentId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT 
        s.id,
        s.last_name AS lastName,
        s.first_name AS firstName,
        born_at AS bornAt,
        classroom_id AS classroomId,
        parent_id AS parentId
      FROM student AS s
      WHERE s.id = ?`,
      [studentId],
    );

    return (rows[0] as Student) ?? null;
  }
}

export default new StudentRepository();
