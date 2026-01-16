import AbstractSeeder from "./AbstractSeeder";

class AnnouncementSeeder extends AbstractSeeder {
  constructor() {
    super({
      table: "announcement",
      truncate: true,
    });
  }

  run() {
    const sortedFakeTitles: Record<string, string[]> = {
      "1": [
        "Nouvelle cantine",
        "Photos de la sortie au musée",
        "Nouveau coin lecture à la bibliothèque",
        "Coin technologique : découverte des robots",
        "Projet collectif d'histoire en images",
      ],
      "2": [
        "Bulletin disponible",
        "Absence prof",
        "Changement d'emploi du temps",
        "Rappel de paiement",
        "Comportement à améliorer",
      ],
      "3": [
        "Père Noël vient",
        "Sortie au musée",
        "Spectacle de théâtre",
        "Fête de fin d'année",
        "Tournoi de football",
      ],
    };

    for (let i = 1; i < 3; i += 1) {
      const school = i;

      for (let j = 0; j < 5; j += 1) {
        const category = Number(
          this.faker.helpers.arrayElement(Object.keys(sortedFakeTitles)),
        );
        const fakeAnnouncement = {
          title: this.faker.helpers.arrayElement(sortedFakeTitles[category]),
          content: this.faker.lorem.sentences({ min: 1, max: 3 }),
          announcement_category_id: category,
          school_id: school,
          refName: `announcement_${school}_${j}`,
        };

        this.insert(fakeAnnouncement);
      }
    }
  }
}

export default AnnouncementSeeder;
