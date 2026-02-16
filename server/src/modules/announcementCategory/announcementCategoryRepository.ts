import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type { AnnouncementCategory } from "../../types/express/AnnouncementCategory";

class AnnouncementCategoryRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM announcement_category ORDER BY id",
    );

    return rows as AnnouncementCategory[];
  }

  async readById(announcementCategoryId: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM announcement_category WHERE id = ?",
      [announcementCategoryId],
    );

    return (rows[0] as AnnouncementCategory) ?? null;
  }
}

export default new AnnouncementCategoryRepository();
