import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";
import type { Classroom } from "../../types/express/Classroom";

class ClassroomRepository {
  async readAllBySchool(schoolId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT DISTINCT
        c.id,
        c.name 
     FROM classroom AS c
     JOIN school AS sch ON sch.id = c.school_id
     WHERE sch.id = ?`,
      [schoolId],
    );

    return rows as Classroom[];
  }

  async readById(classroomId: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM classroom WHERE id = ?",
      [classroomId],
    );

    return (rows[0] as Classroom) ?? null;
  }
}
export default new ClassroomRepository();
