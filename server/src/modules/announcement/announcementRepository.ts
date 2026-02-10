import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Student = {
  id: number;
  firstName: string;
  lastName: string;
};

type Announcement = {
  id: number;
  title: string;
  content: string;
  announcementCategoryId: number;
  studentIds: number[];
};

class AnnouncementRepository {
  async create(newAnnouncement: Omit<Announcement, "id">, schoolId: number) {
    const { title, content, announcementCategoryId, studentIds } =
      newAnnouncement;

    const [result] = await databaseClient.query<Result>(
      `INSERT INTO announcement (title, content, announcement_category_id, school_id)
			VALUES (?, ?, ?, ?)`,
      [title, content, announcementCategoryId, schoolId],
    );

    const newAnnouncementId = result.insertId;

    const announcementStudentValues = studentIds.map((studentId) => [
      newAnnouncementId,
      studentId,
    ]);

    await databaseClient.query<Result>(
      "INSERT INTO announcement_student (announcement_id, student_id) VALUES ?",
      [announcementStudentValues],
    );

    return newAnnouncementId;
  }

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

  async readAllBySchool(SCHOOL_ID: number) {
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
          WHERE s.school_id = ?
          GROUP BY a.id, ac.name
          ORDER BY a.created_at DESC`,
      [SCHOOL_ID],
    );
    return rows;
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
}

export default new AnnouncementRepository();
