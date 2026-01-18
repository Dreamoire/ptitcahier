import client, { type Result, type Rows } from "../../../database/client";

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

export type CreateAnnouncementPayload = {
  schoolId: number;
  title: string;
  content: string;
  categoryId: number;
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

const createAnnouncement = async (
  payload: CreateAnnouncementPayload,
): Promise<number> => {
  const { schoolId, title, content, categoryId } = payload;

  const [result] = await client.query<Result>(
    `INSERT INTO announcement (title, content, announcement_category_id, school_id)
		VALUES (?, ?, ?, ?)`,
    [title, content, categoryId, schoolId],
  );

  return result.insertId;
};

const addAnnouncementTargets = async (
  announcementId: number,
  studentIds: number[],
): Promise<void> => {
  if (studentIds.length === 0) {
    throw new Error("studentIds array must not be empty");
  }

  const values = studentIds.map((studentId) => [announcementId, studentId]);

  await client.query<Result>(
    "INSERT INTO announcement_student (announcement_id, student_id) VALUES ?",
    [values],
  );
};

export {
  findAnnouncementCategories,
  findClassroomsWithStudents,
  createAnnouncement,
  addAnnouncementTargets,
};
