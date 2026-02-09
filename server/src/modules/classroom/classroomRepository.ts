import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

class ClassroomRepository {
  async readAllBySchool(schoolId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT id, classroom_name AS name
       FROM classroom
       WHERE school_id = ?`,
      [schoolId],
    );

    return rows;
  }
}

export default new ClassroomRepository();
