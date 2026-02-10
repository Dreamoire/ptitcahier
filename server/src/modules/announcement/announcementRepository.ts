import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";
import type { Announcement } from "../../types/express/Announcement";

class AnnouncementRepository {
  async readAllByParent(
    parentId: number,
    categoryId?: number,
    studentId?: number,
  ) {
    let sql = `
      SELECT 
        a.id,
        a.title,
        a.content,
        a.created_at AS createdAt,
        ac.name AS announcementCategoryName,
        GROUP_CONCAT(s.first_name SEPARATOR ', ') AS studentNames
      FROM announcement AS a
      JOIN announcement_category AS ac ON a.announcement_category_id = ac.id
      JOIN announcement_student AS ann_stu ON a.id = ann_stu.announcement_id
      JOIN student AS s ON ann_stu.student_id = s.id
      WHERE s.parent_id = ?
    `;

    const sqlParams: (number | string)[] = [parentId];

    if (categoryId) {
      sql += " AND a.announcement_category_id = ? ";
      sqlParams.push(categoryId);
    }

    if (studentId) {
      sql += " AND s.id = ? ";
      sqlParams.push(studentId);
    }

    sql += `
      GROUP BY a.id, ac.name, a.created_at
      ORDER BY a.created_at DESC
    `;

    const [rows] = await databaseClient.query<Rows>(sql, sqlParams);
    return rows as Announcement[];
  }

  async readLastThreeByParent(parentId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT
        a.id,
        a.title,
        a.content,
        a.created_at AS createdAt,
        ac.name AS announcementCategoryName, 
        GROUP_CONCAT(s.first_name SEPARATOR ', ') AS studentNames
      FROM announcement AS a
      JOIN announcement_category AS ac ON a.announcement_category_id = ac.id
      JOIN announcement_student AS ann_stu ON a.id = ann_stu.announcement_id
      JOIN student AS s ON ann_stu.student_id = s.id
      WHERE s.parent_id = ?
      GROUP BY a.id, ac.name, a.created_at
      ORDER BY a.created_at DESC
      LIMIT 3`,
      [parentId],
    );
    return rows as Announcement[];
  }
  async readAllBySchool(schoolId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT 
    a.id, 
    a.title, 
    a.content, 
    a.created_at AS createdAt,
    ac.name AS categoryName,
    COUNT(DISTINCT s.id) AS studentCount,
    (
          SELECT COUNT(*) 
          FROM student s2 
          JOIN classroom c2 ON s2.classroom_id = c2.id 
          WHERE c2.school_id = ?
        ) AS totalStudents,
    GROUP_CONCAT(DISTINCT CONCAT(s.first_name, ' ', s.last_name) SEPARATOR ', ') AS studentNames,
    GROUP_CONCAT(DISTINCT c.classroom_name SEPARATOR ',') AS classroomNames
FROM PTIT_CAHIER.announcement AS a
JOIN PTIT_CAHIER.announcement_category AS ac ON a.announcement_category_id = ac.id
LEFT JOIN PTIT_CAHIER.announcement_student AS ans ON ans.announcement_id = a.id
LEFT JOIN PTIT_CAHIER.student AS s ON ans.student_id = s.id
LEFT JOIN PTIT_CAHIER.classroom AS c ON s.classroom_id=c.id
WHERE a.school_id = ?
GROUP BY 
    a.id, 
    ac.name,
    a.created_at
ORDER BY a.created_at DESC;
      `,
      [schoolId, schoolId],
    );
    return rows as Announcement[];
  }
}
export default new AnnouncementRepository();
