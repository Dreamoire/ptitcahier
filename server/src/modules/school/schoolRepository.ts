import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

type School = {
  id: number;
  name: string;
};

class SchoolRepository {
  async findSchoolByParent(parentId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT DISTINCT sc.id, sc.school_name as name
       FROM parent p
       JOIN student s ON s.parent_id = p.id
       JOIN classroom c ON s.classroom_id = c.id
       JOIN school sc ON c.school_id = sc.id
       WHERE p.id = ?
       LIMIT 1`,
      [parentId],
    );
    return rows[0] as School;
  }
}

export default new SchoolRepository();
