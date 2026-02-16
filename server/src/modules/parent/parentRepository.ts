import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";
import type { Parent } from "../../types/express/Parent";

class ParentRepository {
  async readByUserId(userId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT 
<<<<<<< HEAD
         p.id, 
=======
         p.id,
>>>>>>> 9371fa2ab550d2e39b1ef0ba9ed66c10fd2f9251
        p.genre AS parentGenre,
        p.first_name AS firstName,
        p.last_name AS lastName,
        photo_url AS photoUrl
<<<<<<< HEAD
        FROM parent AS p   
=======
        FROM parent AS p
>>>>>>> 9371fa2ab550d2e39b1ef0ba9ed66c10fd2f9251
        WHERE user_id = ?
        LIMIT 1`,
      [userId],
    );
    return (rows[0] as Parent) ?? null;
  }

  async readAllBySchool(schoolId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT DISTINCT
<<<<<<< HEAD
        p.id,
=======
        p.id
>>>>>>> 9371fa2ab550d2e39b1ef0ba9ed66c10fd2f9251
        p.genre AS parentGenre,
        p.first_name AS firstName,
        p.last_name AS lastName
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
