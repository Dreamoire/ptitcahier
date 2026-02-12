import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

class AnnouncementCategoryRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT id, name, color, icon FROM announcement_category ORDER BY name ASC",
    );

    return rows;
  }

  async readById(announcementCategoryId: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM announcement_category WHERE id = ?",
      [announcementCategoryId],
    );

    return rows[0] ?? null;
  }
}

export default new AnnouncementCategoryRepository();
