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
    // Student 1 → 13 announcements
    for (let j = 0; j < 13; j += 1) {
      this.insert({
        announcement_id: this.getRef(`announcement_1_${j}`).insertId,
        student_id: 1,
      });
    }

    // Student 2 → 6 announcements
    for (let j = 0; j < 6; j += 1) {
      this.insert({
        announcement_id: this.getRef(`announcement_1_${j}`).insertId,
        student_id: 2,
      });
    }

    // Student 3 → 2 announcements
    for (let j = 0; j < 2; j += 1) {
      this.insert({
        announcement_id: this.getRef(`announcement_1_${j}`).insertId,
        student_id: 3,
      });
    }
  }
}

export default AnnouncementStudentSeeder;
