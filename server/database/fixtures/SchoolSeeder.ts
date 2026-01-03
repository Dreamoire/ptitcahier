import AbstractSeeder from "./AbstractSeeder";

class SchoolSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "school", truncate: true });
  }

  run() {
    for (let i = 0; i < 2; i += 1) {
      const color = this.faker.color.human();
      const capitalizedColor = color.charAt(0).toUpperCase() + color.slice(1);
      const animal = this.faker.animal.type();
      const capitalizedAnimal =
        animal.charAt(0).toUpperCase() + animal.slice(1);

      const fakeSchool = {
        email: this.faker.internet.email(),
        password: this.faker.internet.password(),
        school_name: `${capitalizedColor} ${capitalizedAnimal} ${this.faker.helpers.arrayElement(["School", "Academy", "Institute"])}`,
        refName: `school_${i}`,
      };

      this.insert(fakeSchool);
    }
  }
}

export default SchoolSeeder;
