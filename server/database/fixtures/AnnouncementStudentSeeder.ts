import AbstractSeeder from "./AbstractSeeder";
import AnnouncementSeeder from "./AnnouncementSeeder";

class AnnouncementStudentSeeder extends AbstractSeeder {
  constructor() {
    super({
      table: "announcement_student",
      truncate: true,
      dependencies: [AnnouncementSeeder],
    });
  }

  run() {
    const studentIds = Array.from({ length: 100 }, (_, i) => i + 1);

    for (let j = 0; j < 200; j += 1) {
      const announcementRef = this.getRef(`announcement_1_${j}`);

      if (announcementRef) {
        const randomStudents = this.faker.helpers.arrayElements(
          studentIds as number[],
          { min: 1, max: 100 },
        );

        for (const studentId of randomStudents) {
          this.insert({
            announcement_id: announcementRef.insertId,
            student_id: studentId,
          });
        }
      }
    }
  }
}

export default AnnouncementStudentSeeder;
