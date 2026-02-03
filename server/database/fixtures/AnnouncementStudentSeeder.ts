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
    for (let j = 0; j < 5; j += 1) {
      const AnnouncementStudent1 = {
        announcement_id: this.getRef(`announcement_1_${j}`).insertId,
        student_id: 1,
      };

      this.insert(AnnouncementStudent1);
    }

    for (let j = 0; j < 3; j += 1) {
      const AnnouncementStudent2 = {
        announcement_id: this.getRef(`announcement_1_${j}`).insertId,
        student_id: 2,
      };

      this.insert(AnnouncementStudent2);
    }

    for (let j = 0; j < 1; j += 1) {
      const AnnouncementStudent3 = {
        announcement_id: this.getRef(`announcement_1_${j}`).insertId,
        student_id: 3,
      };

      this.insert(AnnouncementStudent3);
    }
  }
}

export default AnnouncementStudentSeeder;
