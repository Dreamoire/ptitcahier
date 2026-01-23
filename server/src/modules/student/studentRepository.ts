import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";
import type { Student } from "../../types/express/Student";

class StudentRepository {
  async readAllByParent(parentId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT 
        s.id,
        s.first_name
      FROM student AS s
      JOIN parent AS p ON s.parent_id = p.id
      WHERE p.id = ?`,
      [parentId],
    );

    return rows as Student[];
  }
}

export default new StudentRepository();
