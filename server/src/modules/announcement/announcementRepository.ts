import client, { type Rows } from "../../../database/client";

export type AnnouncementCategory = {
  id: number;
  name: string;
};

export type ClassroomStudentRow = {
  classroomId: number;
  classroomName: string;
  studentId: number;
  studentFirstName: string;
  studentLastName: string;
};

const findAnnouncementCategories = async (): Promise<
  AnnouncementCategory[]
> => {
  const [rows] = await client.query<Rows>(
    "SELECT id, name FROM announcement_category ORDER BY name ASC",
  );

  return rows as AnnouncementCategory[];
};

const findClassroomsWithStudents = async (
  schoolId: number,
): Promise<ClassroomStudentRow[]> => {
  const [rows] = await client.query<Rows>(
    `SELECT
			c.id AS classroomId,
			c.classroom_name AS classroomName,
			s.id AS studentId,
			s.first_name AS studentFirstName,
			s.last_name AS studentLastName
		FROM classroom c
		INNER JOIN student s ON s.classroom_id = c.id
		WHERE c.school_id = ?
		ORDER BY
			c.classroom_name ASC,
			s.last_name ASC,
			s.first_name ASC`,
    [schoolId],
  );

  return rows as ClassroomStudentRow[];
};

export { findAnnouncementCategories, findClassroomsWithStudents };
