import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";
import type { Announcement } from "../../types/express/Announcement";

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
  async readAllByCategory(parentId: number, categoryId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT
          a.id,
          a.title,
          a.content,
          a.created_at,
          ac.name AS announcement_category_name,
          GROUP_CONCAT(s.first_name SEPARATOR ', ') AS student_names
          FROM ptit_cahier.announcement AS a
          JOIN ptit_cahier.announcement_category AS ac ON a.announcement_category_id = ac.id
          JOIN ptit_cahier.announcement_student AS ann_stu ON a.id = ann_stu.announcement_id
          JOIN ptit_cahier.student AS s ON ann_stu.student_id = s.id
          WHERE s.parent_id = ?
          AND ac.id = ?
          GROUP BY a.id, ac.name
          ORDER BY a.created_at DESC`,
      [parentId, categoryId],
    );
    return rows as Announcement[];
  }
}
export default new AnnouncementRepository();
