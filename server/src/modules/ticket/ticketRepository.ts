import databaseClient from "../../../database/client";

import type { Rows } from "../../../database/client";

class TicketRepository {
  async readAllBySchool(schoolId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT
        t.id,
        t.content,
        t.created_at,
        tc.name AS category_name,
        p.first_name AS parent_first_name,
        p.last_name AS parent_last_name
      FROM ticket AS t
      JOIN ticket_category AS tc
        ON t.ticket_category_id = tc.id
      JOIN parent AS p
        ON t.parent_id = p.id
      WHERE EXISTS (
        SELECT 1
        FROM student AS s
        JOIN classroom AS c
          ON c.id = s.classroom_id
        WHERE s.parent_id = p.id
          AND c.school_id = ?
      )
      ORDER BY t.created_at DESC
      `,
      [schoolId],
    );

    return rows;
  }
}

export default new TicketRepository();
