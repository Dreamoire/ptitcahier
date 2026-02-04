import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

export type School = {
  id: number;
  email: string;
  hashed_password: string;
  name: string;
};

class SchoolRepository {
  async readByEmailWithPassword(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM school WHERE email = ?",
      [email],
    );
    return (rows[0] as School) ?? null;
  }
}
export default new SchoolRepository();
