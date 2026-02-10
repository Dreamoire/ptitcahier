import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";
import type { School } from "../../types/express/School";

class SchoolRepository {
  async readByUserId(userId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT 
        id,
        name
        FROM school
        WHERE user_id = ?
        LIMIT 1`,
      [userId],
    );
    return (rows[0] as School) ?? null;
  }

  async readByParent(parentId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT DISTINCT sc.id, sc.name
       FROM parent AS p
       JOIN student AS s ON s.parent_id = p.id
       JOIN classroom AS c ON s.classroom_id = c.id
       JOIN school AS sc ON c.school_id = sc.id
       WHERE p.id = ?
       LIMIT 1`,
      [parentId],
    );
    return (rows[0] as School) ?? null;
  }
}

export default new SchoolRepository();
