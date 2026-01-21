import client, { type Result, type Rows } from "../../../database/client";

type AnnouncementCategory = {
  id: number;
  name: string;
};

type ClassroomStudentRow = {
  classroomId: number;
  classroomName: string;
  studentId: number;
  studentFirstName: string;
  studentLastName: string;
};

type AnnouncementPayload = {
  schoolId: number;
  title: string;
  content: string;
  categoryId: number;
};

type AnnouncementWithStudentsPayload = AnnouncementPayload & {
  studentIds: number[];
};

const countStudentsBelongingToSchool = async (
  schoolId: number,
  studentIds: number[],
): Promise<number> => {
  const [rows] = await client.query<Rows>(
    `SELECT COUNT(*) AS count
		FROM student s
		JOIN classroom c ON c.id = s.classroom_id
		WHERE c.school_id = ?
		AND s.id IN (?)`,
    [schoolId, studentIds],
  );

  return Number((rows[0] as { count: number }).count);
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

const announcementCategoryExists = async (
  categoryId: number,
): Promise<boolean> => {
  const [rows] = await client.query<Rows>(
    "SELECT id FROM announcement_category WHERE id = ?",
    [categoryId],
  );
  return rows.length > 0;
};

const createAnnouncement = async (
  payload: AnnouncementPayload,
): Promise<number> => {
  const { schoolId, title, content, categoryId } = payload;

  const [result] = await client.query<Result>(
    `INSERT INTO announcement (title, content, announcement_category_id, school_id)
		VALUES (?, ?, ?, ?)`,
    [title, content, categoryId, schoolId],
  );

  return result.insertId;
};

const createStudentAnnouncement = async (
  announcementId: number,
  studentIds: number[],
): Promise<void> => {
  if (studentIds.length === 0) return;

  const values = studentIds.map((studentId) => [announcementId, studentId]);

  await client.query<Result>(
    "INSERT INTO announcement_student (announcement_id, student_id) VALUES ?",
    [values],
  );
};

// alternative implementation with transaction for production use (more robust), use by POST /announcements/ later

const createStudentAnnouncementTransaction = async (
  payload: AnnouncementWithStudentsPayload,
): Promise<number> => {
  const { schoolId, title, content, categoryId, studentIds } = payload;

  const connection = await client.getConnection();

  try {
    await connection.beginTransaction();

    const [result] = await connection.query<Result>(
      `INSERT INTO announcement (title, content, announcement_category_id, school_id)
			VALUES (?, ?, ?, ?)`,
      [title, content, categoryId, schoolId],
    );

    const announcementId = result.insertId;

    const values = studentIds.map((studentId) => [announcementId, studentId]);

    await connection.query<Result>(
      "INSERT INTO announcement_student (announcement_id, student_id) VALUES ?",
      [values],
    );

    await connection.commit();
    return announcementId;
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
};

export {
  countStudentsBelongingToSchool,
  findAnnouncementCategories,
  findClassroomsWithStudents,
  announcementCategoryExists,
  createAnnouncement,
  createStudentAnnouncement,
};

export { createStudentAnnouncementTransaction };
