import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Student = {
  id: number;
  firstName: string;
  lastName: string;
};

type Announcement = {
  id: number;
  title: string;
  content: string;
  announcementCategoryId: number;
  studentIds: number[];
};

class AnnouncementRepository {
  async createAnnouncement(
    newAnnouncement: Omit<Announcement, "id">,
    schoolId: number,
  ) {
    const { title, content, announcementCategoryId, studentIds } =
      newAnnouncement;

    const [result] = await databaseClient.query<Result>(
      `INSERT INTO announcement (title, content, announcement_category_id, school_id)
			VALUES (?, ?, ?, ?)`,
      [title, content, announcementCategoryId, schoolId],
    );

    const newAnnouncementId = result.insertId;

    const announcementStudentValues = studentIds.map((studentId) => [
      newAnnouncementId,
      studentId,
    ]);

    await databaseClient.query<Result>(
      "INSERT INTO announcement_student (announcement_id, student_id) VALUES ?",
      [announcementStudentValues],
    );

    return newAnnouncementId;
  }

  async getStudentsInClassroom(
    classroomId: number,
    schoolId: number,
  ): Promise<Student[]> {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT s.id
       FROM student s
       JOIN classroom c ON c.id = s.classroom_id
       WHERE c.id = ? AND c.school_id = ?
       ORDER BY s.last_name ASC, s.first_name ASC`,
      [classroomId, schoolId],
    );

    return rows as Student[];
  }
}

export default new AnnouncementRepository();
