import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

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
  async readAllByParent() {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT DISTINCT
        a.id,
        a.title,
        a.content,
        a.created_at,
        ac.announcement_category_name,
        s.parent_id,
        s.first_name,
        a.school_id
        FROM PTIT_CAHIER.announcement AS a
        INNER JOIN PTIT_CAHIER.student AS s
        INNER JOIN PTIT_CAHIER.announcement_category AS ac
        ON a.announcement_category_id = ac.id
        WHERE parent_id="2" AND  a.school_id="1"
        ORDER BY a.created_at ASC`,
    );
    return rows as Announcement[];
  }
}
export default new AnnouncementRepository();
