import databaseClient from "../../../database/client";

import type { Rows } from "../../../database/client";
import type { TicketCategory } from "../../types/express/TicketCategory";

class TicketCategoryRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM ticket_category ORDER BY id",
    );

    return rows as TicketCategory[];
  }
}

export default new TicketCategoryRepository();
