import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

type User = {
  id: number;
  email: string;
  hashed_password: string;
  role: "parent" | "school";
};

class UserRepository {
  async readByEmail(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT * 
        FROM user 
        WHERE email = ?
        LIMIT 1`,
      [email],
    );
    return (rows[0] as User) ?? null;
  }
}
export default new UserRepository();
