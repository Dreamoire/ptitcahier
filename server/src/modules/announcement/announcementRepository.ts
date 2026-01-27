import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type AnnouncementCategory = {
  id: number;
  name: string;
};

type Classroom = {
  id: number;
  name: string;
};

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

  async getAnnouncementCategories(): Promise<AnnouncementCategory[]> {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT id, name FROM announcement_category ORDER BY name ASC",
    );

    return rows as AnnouncementCategory[];
  }

  async getClassroomsBySchool(schoolId: number): Promise<Classroom[]> {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT id, classroom_name AS name
       FROM classroom
       WHERE school_id = ?
       ORDER BY classroom_name ASC`,
      [schoolId],
    );

    return rows as Classroom[];
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

const announcementRepository = new AnnouncementRepository();

const AnnouncementCategories = async (): Promise<AnnouncementCategory[]> =>
  announcementRepository.getAnnouncementCategories();

const ClassroomsBySchool = async (schoolId: number): Promise<Classroom[]> =>
  announcementRepository.getClassroomsBySchool(schoolId);

const studentsInClassroom = async (
  classroomId: number,
  schoolId: number,
): Promise<Student[]> =>
  announcementRepository.getStudentsInClassroom(classroomId, schoolId);

export { AnnouncementCategories, ClassroomsBySchool, studentsInClassroom };

export default announcementRepository;
