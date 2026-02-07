import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";
import type { Classroom } from "../../types/express/Classroom";

class ClassroomRepository {
  async readClassroomsBySchool(schoolId: number) {
    const sql = `SELECT id,
      classroom_name AS classroomName FROM classroom 
      WHERE school_id = ?`;

    const [rows] = await databaseClient.query<Rows>(sql, [schoolId]);
    return rows as Classroom[];
  }
}

export default new ClassroomRepository();
