import databaseClient from "../../../database/client";

import type { Rows } from "../../../database/client";
import type { TicketCategory } from "../../types/express/TicketCategory";

class TicketCategoryRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      "select * from ticket_category order by id",
    );

    return rows as TicketCategory[];
  }
}

export default new TicketCategoryRepository();
