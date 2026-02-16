import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";
import type { Parent } from "../../types/express/Parent";

class ParentRepository {
  async readByUserId(userId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT 
         p.id, 
        p.genre AS parentGenre,
        p.first_name AS parentFirstName,
        p.last_name AS parentLastName,
        photo_url AS photoUrl
        FROM parent AS p   
        WHERE user_id = ?
        LIMIT 1`,
      [userId],
    );
    return (rows[0] as Parent) ?? null;
  }

  async readAllBySchool(schoolId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT DISTINCT
        p.id,
        p.genre AS parentGenre,
        p.first_name AS parentFirstName,
        p.last_name AS parentLastName
     FROM parent AS p
    JOIN student AS s ON p.id = s.parent_id
     JOIN classroom AS c ON c.id = s.classroom_id
     JOIN school AS sch ON sch.id = c.school_id
     WHERE sch.id = ?`,
      [schoolId],
    );

    return rows as Parent[];
  }
}
export default new ParentRepository();
