import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";
import type { Parent } from "../../types/express/Parent";

class ParentRepository {
  async readByUserId(userId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT 
        id,
        last_name AS lastName,
        first_name AS firstName,
        genre,
        photo_url AS photoUrl
        FROM parent
        WHERE user_id = ?
        LIMIT 1`,
      [userId],
    );
    return (rows[0] as Parent) ?? null;
  }
}
export default new ParentRepository();
