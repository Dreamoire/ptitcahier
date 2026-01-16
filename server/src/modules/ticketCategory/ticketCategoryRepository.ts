import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

class TicketCategoryRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      "select * from ticket_category order by id",
    );

    return rows;
  }
}

export default new TicketCategoryRepository();
