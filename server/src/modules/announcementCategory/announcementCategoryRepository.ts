import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

class AnnouncementCategoryRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT id, name FROM announcement_category ORDER BY name ASC",
    );

    return rows;
  }
}

export default new AnnouncementCategoryRepository();
