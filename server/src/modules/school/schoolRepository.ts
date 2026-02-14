import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type { School, SchoolDashboard } from "../../types/express/School";

class SchoolRepository {
  async create(schoolName: string, newUserId: number) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO school (name, user_id) values (?, ?)",
      [schoolName, newUserId],
    );

    return result.insertId;
  }

  async readByUserId(userId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT 
        id,
        name,
        photo_url AS photoUrl
        FROM school
        WHERE user_id = ?
        LIMIT 1`,
      [userId],
    );
    return (rows[0] as School) ?? null;
  }

  async readByParent(parentId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT DISTINCT sc.id, sc.name
       FROM parent AS p
       JOIN student AS s ON s.parent_id = p.id
       JOIN classroom AS c ON s.classroom_id = c.id
       JOIN school AS sc ON c.school_id = sc.id
       WHERE p.id = ?
       LIMIT 1`,
      [parentId],
    );
    return (rows[0] as School) ?? null;
  }

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
