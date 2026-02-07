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
      const announcementRef = this.getRef(`announcement_1_${j}`);

      if (announcementRef) {
        this.insert({
          announcement_id: announcementRef.insertId,
          student_id: 1,
        });
      }
    }

    const firstAnnouncement = this.getRef("announcement_1_0");
    if (firstAnnouncement) {
      this.insert({
        announcement_id: firstAnnouncement.insertId,
        student_id: 3,
      });
    }
  }
}

export default AnnouncementStudentSeeder;
