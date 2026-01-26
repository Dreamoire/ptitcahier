import databaseClient from "../../../database/client";

import type { Result } from "../../../database/client";
import type { Ticket } from "../../types/express/Ticket";

class TicketRepository {
  async createTicket(newTicket: Ticket, parentId: number) {
    const { content, ticketCategoryId, studentIds } = newTicket;

    const [result] = await databaseClient.query<Result>(
      "INSERT INTO ticket (content, parent_id, ticket_category_id) VALUES (?, ?, ?)",
      [content, parentId, ticketCategoryId],
    );

    const newTicketId = result.insertId;

    const ticketStudentValues = studentIds.map((studentId) => [
      newTicketId,
      studentId,
    ]);

    await databaseClient.query(
      "INSERT INTO ticket_student (ticket_id, student_id) VALUES ?",
      [ticketStudentValues],
    );

    return newTicketId;
  }
}

export default new TicketRepository();
