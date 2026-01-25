import databaseClient from "../../../database/client";

import type { Rows } from "../../../database/client";
import type { Student } from "../../types/express/Student";

class StudentRepository {
  async readAllByParent(parentId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT 
        s.id,
        s.first_name AS firstName
      FROM student AS s
      JOIN parent AS p ON s.parent_id = p.id
      WHERE p.id = ?`,
      [parentId],
    );

    return rows as Student[];
  }

  // async readByCoordinates(parentId: number, studentIds: number[]) {
  //   const [rows] = await databaseClient.query<Rows>(
  //     "SELECT s.id, s.parent_id FROM student WHERE s.id = ? AND s.parent_id = ?",
  //     [parentId, studentIds],
  //   );
  //   return rows;
  // }
}

export default new StudentRepository();
