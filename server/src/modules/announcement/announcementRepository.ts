import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

type Announcement = {
  id: number;
  createdAt: Date;
  announcementCategoryName: string;
  studentNames: string;
  title: string;
  content: string;
};

class AnnouncementRepository {
  async readAllByParent(parentId: number) {
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
          ORDER BY a.created_at ASC`,
      [parentId],
    );
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
}

export default new AnnouncementRepository();
