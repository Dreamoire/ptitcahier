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
          GROUP BY a.id, ac.name
          ORDER BY a.created_at ASC`,
      [parentId],
    );
    return rows as Announcement[];
  }
}
export default new AnnouncementRepository();
