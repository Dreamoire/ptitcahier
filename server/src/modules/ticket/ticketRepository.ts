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
        p.last_name AS parent_last_name,
        tic_stu.ticket_id,
    GROUP_CONCAT(
        CONCAT(s.first_name, ' ', s.last_name)
        ORDER BY s.first_name
        SEPARATOR ', '
    ) AS student_names
    FROM ticket AS t
    JOIN ticket_category AS tc
    ON t.ticket_category_id = tc.id
    JOIN parent AS p
    ON t.parent_id = p.id
    JOIN ticket_student AS tic_stu
    ON tic_stu.ticket_id = t.id
    JOIN student AS s
    ON tic_stu.student_id = s.id
    JOIN classroom AS c
    ON s.classroom_id = c.id
    WHERE c.school_id = ?
    GROUP BY t.id
    ORDER BY t.created_at ASC
      `,
      [schoolId],
    );

    return rows;
  }
}

export default new TicketRepository();
