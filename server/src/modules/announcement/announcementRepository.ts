import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

type Announcement = {
  id: number;
  created_at: Date;
  announcement_category_name: string;
  first_name: string;
  title: string;
  content: string;
  school_id: number;
};

class AnnouncementRepository {
  async readAllByParent(parentId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT 
          a.id,
          a.title,
          a.content,
          a.created_at,
          ac.name AS announcement_category_name,
          GROUP_CONCAT(s.first_name SEPARATOR ', ') AS student_names
          FROM ptit_cahier.announcement AS a
          INNER JOIN ptit_cahier.announcement_category AS ac
          ON a.announcement_category_id = ac.id
          INNER JOIN ptit_cahier.announcement_student AS ann_stu
          ON a.id = ann_stu.announcement_id
          INNER JOIN student AS s
          ON ann_stu.student_id = s.id
          WHERE parent_id= ?
          GROUP BY a.id, ac.name
          ORDER BY a.created_at DESC`,
      [parentId],
    );
    return rows as Announcement[];
  }
}
export default new AnnouncementRepository();
