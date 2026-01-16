import AbstractSeeder from "./AbstractSeeder";
import TicketSeeder from "./TicketSeeder";

class TicketStudentSeeder extends AbstractSeeder {
  constructor() {
    super({
      table: "ticket_student",
      truncate: true,
      dependencies: [TicketSeeder],
    });
  }

  run() {
    for (let j = 0; j < 6; j += 1) {
      const TicketParent1Student1 = {
        ticket_id: this.getRef(`ticket_1_${j}`).insertId,
        student_id: 1,
      };

      this.insert(TicketParent1Student1);
    }

    for (let j = 0; j < 3; j += 1) {
      const TicketParent1Student2 = {
        ticket_id: this.getRef(`ticket_1_${j}`).insertId,
        student_id: 2,
      };

      this.insert(TicketParent1Student2);
    }

    for (let j = 0; j < 6; j += 1) {
      const TicketParent2Student3 = {
        ticket_id: this.getRef(`ticket_2_${j}`).insertId,
        student_id: 3,
      };

      this.insert(TicketParent2Student3);
    }
  }
}

export default TicketStudentSeeder;
