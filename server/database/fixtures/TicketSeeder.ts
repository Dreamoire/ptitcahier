import AbstractSeeder from "./AbstractSeeder";

class TicketSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "ticket", truncate: true });
  }

  run() {
    const startDate = new Date("2025-11-25T08:00:00.000Z");
    const endDate = new Date("2026-03-31T18:00:00.000Z");

    const toMysqlDatetime = (date: Date) =>
      date.toISOString().slice(0, 19).replace("T", " ");

    const randomCreatedAt = () =>
      toMysqlDatetime(
        this.faker.date.between({
          from: startDate,
          to: endDate,
        }),
      );

    const urgentCategoryId = 1;
    const eventsCategoryId = 4;
    const newsCategoryId = 3;
    const noticeCategoryId = 2;

    const ticketsByType = {
      urgent: [
        "Objet : Épidémie de grippe - Rappel sanitaire. Plusieurs cas de grippe ayant été signalés dans les classes de CP et CE1, nous vous prions de garder votre enfant à la maison en cas de fièvre.",
        "Objet : Fermeture exceptionnelle de la cantine. En raison d'une grève imprévue du personnel municipal, la cantine sera fermée ce jeudi. Merci de prévoir un panier repas.",
        "Objet : Alerte météo - Sortie annulée. En raison des vents violents annoncés, la sortie en forêt prévue cet après-midi est annulée pour des raisons de sécurité.",
      ],
      events: [
        "Objet : Visite du Musée d'Orsay. Dans le cadre de notre projet sur l'impressionnisme, les classes de CM1 et CM2 visiteront le musée le vendredi 6 février.",
        "Objet : Séance de piscine - Cycle 2. Nous rappelons aux parents de CE1 que les séances débutent lundi. Merci de préparer un sac avec maillot et bonnet de bain.",
        "Objet : Atelier découverte : Les robots à l'école. La semaine prochaine, un intervenant animera un atelier de programmation pour toutes les classes de CM2.",
        "Objet : Sortie à la ferme pédagogique. Le mardi 10 février, les élèves de CP découvriront les animaux de la ferme. Prévoir des bottes en caoutchouc.",
      ],
      news: [
        "Objet : Permis Piéton pour les CE2. Les gendarmes interviendront jeudi matin pour faire passer l'examen aux élèves. Bonne chance à nos futurs marcheurs!",
        "Objet : Spectacle de Noël - Rappel. Le spectacle se tiendra le vendredi 19 décembre à la salle des fêtes. Un goûter sera offert à l'issue de la fête.",
        "Objet : Photos de classe. Le photographe scolaire passera dans l'école lundi matin. Merci de veiller à ce que les enfants arrivent à l'heure pour la photo de groupe.",
      ],
      notice: [
        "Objet : Assurance scolaire manquante. Bonjour, après vérification de votre dossier administratif, il apparaît que l'attestation d'assurance scolaire pour l'année en cours est manquante. Merci de nous la transmettre par email ou de la déposer au secrétariat dans les plus brefs délais.",
        "Objet : Objets trouvés - Rappel. Nous avons retrouvé un vêtement (pull bleu marine) marqué au nom de votre enfant dans la cour de récréation. Vous pouvez venir le récupérer à l'accueil de l'école dès ce soir après la classe.",
      ],
    } as const;

    const categoryIdByType = {
      urgent: urgentCategoryId,
      events: eventsCategoryId,
      news: newsCategoryId,
      notice: noticeCategoryId,
    } as const;

    const ticketsPlan = [
      {
        parent_id: 1,
        refName: "ticket_1_0",
        type: "urgent" as const,
        index: 0,
      },
      {
        parent_id: 1,
        refName: "ticket_1_1",
        type: "urgent" as const,
        index: 1,
      },
      {
        parent_id: 1,
        refName: "ticket_1_2",
        type: "urgent" as const,
        index: 2,
      },
      {
        parent_id: 1,
        refName: "ticket_1_3",
        type: "events" as const,
        index: 0,
      },
      {
        parent_id: 1,
        refName: "ticket_1_4",
        type: "events" as const,
        index: 1,
      },
      {
        parent_id: 1,
        refName: "ticket_1_5",
        type: "events" as const,
        index: 2,
      },

      {
        parent_id: 2,
        refName: "ticket_2_0",
        type: "events" as const,
        index: 3,
      },
      { parent_id: 2, refName: "ticket_2_1", type: "news" as const, index: 0 },
      { parent_id: 2, refName: "ticket_2_2", type: "news" as const, index: 1 },
      { parent_id: 2, refName: "ticket_2_3", type: "news" as const, index: 2 },

      {
        parent_id: 2,
        refName: "ticket_2_4",
        type: "notice" as const,
        index: 0,
      },
      {
        parent_id: 2,
        refName: "ticket_2_5",
        type: "notice" as const,
        index: 1,
      },
    ] as const;

    for (const item of ticketsPlan) {
      const content = ticketsByType[item.type][item.index];

      const fakeTicket = {
        content,
        created_at: randomCreatedAt(),
        parent_id: item.parent_id,
        ticket_category_id: categoryIdByType[item.type],
        refName: item.refName,
      };

      this.insert(fakeTicket);
    }
  }
}

export default TicketSeeder;
