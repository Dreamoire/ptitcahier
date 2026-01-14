import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

interface Ticket {
  id: number;
  content: string;
  parent_id: number;
  ticket_category_id: number;
}

class TicketRepository {
  async createTicket(ticket: Omit<Ticket, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into ticket (content, parent_id, ticket_category_id) values (?, ?, ?)",
      [ticket.content, ticket.parent_id, ticket.ticket_category_id],
    );

    return result.insertId;
  }
}

export default new TicketRepository();
