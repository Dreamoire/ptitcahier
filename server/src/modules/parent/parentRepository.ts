import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

type Parent = {
  id: number;
  email: string;
  hashed_password: string;
  first_name: string;
  last_name: string;
  genre: string;
};

class ParentRepository {
  async readByEmailWithPassword(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM parent WHERE email = ?",
      [email],
    );
    return (rows[0] as Parent) ?? null;
  }
}
export default new ParentRepository();
