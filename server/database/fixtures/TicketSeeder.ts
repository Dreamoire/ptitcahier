import AbstractSeeder from "./AbstractSeeder";

class TicketSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "ticket", truncate: true });
  }

  run() {
    for (let i = 1; i < 4; i += 1) {
      const parent = i;

      for (let j = 0; j < 6; j += 1) {
        const fakeTicket = {
          content: this.faker.lorem.sentences({ min: 1, max: 3 }),
          parent_id: parent,
          ticket_category_id: this.faker.helpers.rangeToNumber({
            min: 1,
            max: 3,
          }),
          refName: `ticket_${parent}_${j}`,
        };

        this.insert(fakeTicket);
      }
    }
  }
}

export default TicketSeeder;
