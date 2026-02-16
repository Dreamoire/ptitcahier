import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";
import type { School, SchoolDashboard } from "../../types/express/School";

class SchoolRepository {
  async findSchoolByParent(parentId: number): Promise<School> {
    const sql = `
      SELECT DISTINCT sc.id, sc.school_name AS name
      FROM parent p
      JOIN student s ON s.parent_id = p.id
      JOIN classroom c ON s.classroom_id = c.id
      JOIN school sc ON c.school_id = sc.id
      WHERE p.id = ?
      LIMIT 1
    `;

    const [rows] = await databaseClient.query<Rows>(sql, [parentId]);

    return rows[0] as School;
  }

  async getDashboardData(schoolId: number): Promise<SchoolDashboard> {
    const sql = `
      SELECT 
        s.id,
        s.school_name AS name,
        (SELECT COUNT(*) FROM announcement WHERE school_id = s.id) AS totalAnnouncements,
        (SELECT COUNT(*) FROM classroom WHERE school_id = s.id) AS totalClassrooms,
        (SELECT COUNT(*) FROM student st 
         JOIN classroom cl ON st.classroom_id = cl.id 
         WHERE cl.school_id = s.id) AS totalStudents,
        (SELECT COUNT(DISTINCT p.id) FROM parent p 
         JOIN student st2 ON st2.parent_id = p.id 
         JOIN classroom cl2 ON st2.classroom_id = cl2.id 
         WHERE cl2.school_id = s.id) AS totalParents
      FROM school s
      WHERE s.id = ?
    `;

    const [rows] = await databaseClient.query<Rows>(sql, [schoolId]);

    return rows[0] as SchoolDashboard;
  }
}

export default new SchoolRepository();
