import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

interface Ticket {
  id: number;
  content: string;
  parent_id: number;
  ticket_category_id: number;
  student_ids: string[];
}

class TicketRepository {
  async createTicket(newTicket: Omit<Ticket, "id">) {
    const { content, parent_id, ticket_category_id, student_ids } = newTicket;

    const [result] = await databaseClient.query<Result>(
      "INSERT INTO ticket (content, parent_id, ticket_category_id) VALUES (?, ?, ?)",
      [content, parent_id, ticket_category_id],
    );

    const newTicketId = result.insertId;

    const ticket_studentValues = student_ids.map((student_id) => [
      newTicketId,
      Number(student_id),
    ]);

    await databaseClient.query(
      "INSERT INTO ticket_student (ticket_id, student_id) VALUES ?",
      [ticket_studentValues],
    );

    return newTicketId;
  }
}

export default new TicketRepository();
