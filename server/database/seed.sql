USE ptit_cahier;

SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

DELETE FROM ticket_student;
DELETE FROM announcement_student;
DELETE FROM ticket;
DELETE FROM announcement;

ALTER TABLE announcement AUTO_INCREMENT = 1;
ALTER TABLE ticket AUTO_INCREMENT = 1;

INSERT INTO `announcement`
(`id`, `title`, `content`, `created_at`, `announcement_category_id`, `school_id`, `classroom_id`, `image_url`)
VALUES
(1,'Photos de classe','Le photographe scolaire sera présent lundi 17 mars toute la matinée. Les photos individuelles et de groupe seront prises dans la salle polyvalente. Merci de veiller à ce que les enfants arrivent à l\'heure et soient bien coiffés pour l\'occasion.','2025-09-10 12:15:00',1,1,NULL,NULL),
(2,'Don de livres pour la bibliothèque','Nous organisons une grande collecte de livres jeunesse pour enrichir notre coin lecture. Romans, albums illustrés, BD, documentaires : tout est le bienvenu ! Vous pouvez déposer vos dons à l\'accueil de l\'école jusqu\'au vendredi 28 mars.','2025-11-05 07:15:00',1,1,NULL,'/images/announcements/giving_books.jpg'),
(3,'Nouveau coin lecture aménagé','Grâce à vos généreux dons de livres, un tout nouveau coin lecture a été aménagé dans le préau couvert. Les élèves pourront en profiter pendant les récréations et les temps calmes. Un grand merci à l\'association des parents pour le financement des coussins et des étagères.','2026-01-15 16:20:00',1,1,NULL,'/images/announcements/reading_corner.jpg'),
(4,'Permis Piéton pour les CE2','Dans le cadre de l\'éducation à la sécurité routière, les gendarmes de la brigade de prévention interviendront jeudi 20 mars dans la classe de CE2. Les élèves passeront un petit examen pour obtenir leur Permis Piéton. Bonne chance à nos futurs marcheurs responsables !','2025-10-20 09:00:00',1,1,NULL,'/images/announcements/road_safety.jpg'),
(5,'Intervention sur le tri sélectif','Un animateur de la communauté d\'agglomération viendra sensibiliser les élèves de CM1 et CM2 au tri des déchets et au recyclage, le mardi 25 mars de 14h à 15h30. Les enfants sont invités à apporter un emballage vide de la maison pour l\'atelier pratique.','2026-01-28 08:45:00',1,1,NULL,'/images/announcements/recycling_bins.jpg'),
(6,'Semaine du goût : ateliers cuisine','À l\'occasion de la Semaine du goût, des ateliers cuisine seront organisés dans chaque classe du 13 au 17 octobre. Les parents volontaires pour encadrer les ateliers sont priés de se signaler auprès de l\'enseignant de leur enfant avant le 6 octobre.','2025-10-09 07:30:00',1,1,NULL,'/images/announcements/cooking_workshop.jpg'),
(7,'Épidémie de grippe — Rappel sanitaire','Plusieurs cas de grippe ont été signalés dans les classes de CP et CE1 ces derniers jours. Nous vous rappelons les gestes barrières essentiels : lavage fréquent des mains, mouchoir à usage unique, et toux dans le coude. En cas de fièvre supérieure à 38°C, merci de garder votre enfant à la maison et de prévenir l\'école.','2025-10-01 14:45:00',2,1,NULL,'/images/announcements/plush_teddy.jpg'),
(8,'Fermeture exceptionnelle de la cantine','En raison d\'un mouvement de grève du personnel municipal, la cantine sera fermée ce jeudi 13 mars. Les familles sont priées de prévoir un panier repas pour leur enfant. L\'accueil périscolaire du matin et du soir fonctionnera normalement.','2025-12-17 13:00:00',2,1,NULL,'/images/announcements/school_cafeteria.jpg'),
(9,'Mise à jour des fiches de renseignements','Nous vous demandons de vérifier et mettre à jour les fiches de renseignements de vos enfants avant le 31 mars. Numéros de téléphone, adresse, personnes autorisées à récupérer l\'enfant : toute modification doit être signalée au secrétariat.','2025-09-03 06:30:00',2,1,NULL,NULL),
(10,'Rappel : assurance scolaire obligatoire','Pour toute participation aux sorties scolaires, l\'attestation d\'assurance responsabilité civile et individuelle accident est obligatoire. Merci de transmettre le document au plus vite si ce n\'est pas déjà fait. Sans cette attestation, votre enfant ne pourra pas participer aux activités extérieures.','2025-12-01 09:45:00',2,1,NULL,'/images/announcements/school_assurance.jpg'),
(11,'Grève nationale — Organisation du 18 mars','En raison du mouvement de grève nationale annoncé pour le mardi 18 mars, un service minimum d\'accueil sera mis en place. Seules les classes de CP et CM2 seront assurées. Les familles concernées par les autres niveaux sont invitées à prendre leurs dispositions.','2026-02-14 07:00:00',2,1,NULL,'/images/announcements/school_strike.jpg'),
(12,'Horaires de la rentrée de janvier','La rentrée après les vacances de Noël aura lieu le lundi 6 janvier à 8h30. L\'accueil périscolaire reprendra dès 7h30. Le service de cantine fonctionnera normalement dès le premier jour.','2026-01-06 07:00:00',2,1,NULL,'/images/announcements/winter_time.jpg'),
(13,'Spectacle de Noël — Invitation','Le traditionnel spectacle de Noël de l\'école se tiendra le vendredi 19 décembre à 18h à la salle des fêtes municipale. Chaque classe présentera un numéro préparé avec soin. Un goûter offert par l\'association des parents clôturera la soirée. Entrée libre, venez nombreux !','2025-09-22 08:00:00',3,1,NULL,'/images/announcements/christmas_show.jpg'),
(14,'Sortie à la ferme pédagogique','Le mardi 10 février, les élèves de CP partiront à la découverte de la ferme pédagogique des Quatre Saisons. Au programme : visite des animaux, atelier fabrication de beurre et balade en tracteur. Départ en bus à 9h, retour prévu à 16h. Prévoir des bottes en caoutchouc et un pique-nique.','2025-11-18 14:30:00',3,1,NULL,'/images/announcements/farme_education.jpg'),
(15,'Alerte météo — Sortie annulée','En raison des vents violents annoncés par Météo France (vigilance orange), la sortie en forêt de Sénart prévue cet après-midi pour les CE1 est annulée pour des raisons de sécurité. Les élèves resteront en classe avec un programme adapté. La sortie sera reprogrammée ultérieurement.','2026-02-05 10:30:00',3,1,NULL,'/images/announcements/alerte_meteo.jpg'),
(16,'Carnaval de l\'école','Le carnaval aura lieu le vendredi 14 février. Les enfants sont invités à venir déguisés dès le matin. Un défilé dans le quartier est prévu à 14h30, suivi d\'un goûter offert par l\'association des parents dans la cour de l\'école. Pas de confettis à l\'intérieur des bâtiments, merci !','2025-12-12 06:50:00',3,1,NULL,'/images/announcements/school_carnival.jpg'),
(17,'Kermesse de fin d\'année','La kermesse de fin d\'année se déroulera le samedi 28 juin de 14h à 18h dans la cour de l\'école. Au programme : stands de jeux, tombola, buvette et spectacle des élèves. L\'association des parents recherche des volontaires pour la tenue des stands. Inscrivez-vous au tableau d\'affichage !','2026-03-03 12:15:00',3,1,NULL,'/images/announcements/kermesse.jpg'),
(18,'Visite guidée au Musée du Chocolat','Le jeudi 3 avril, les classes de CE2 et CM1 se rendront au Musée du Chocolat à Paris pour une visite guidée suivie d\'un atelier dégustation. Rendez-vous à 8h30 dans la cour, devant le bus. Retour prévu vers 16h30. Merci de prévoir un pique-nique sans chocolat... l\'ironie serait trop grande !','2026-03-06 09:00:00',3,1,NULL,'/images/announcements/chocolate_museum.jpg');

INSERT INTO `announcement_student` VALUES
(1,1),(2,1),(3,1),(4,1),(5,1),(6,1),(7,1),(8,1),(9,1),(10,1),(11,1),(12,1),(13,1),(14,1),(16,1),(17,1),
(1,2),(2,2),(3,2),(4,2),(5,2),(6,2),(7,2),(8,2),(9,2),(10,2),(11,2),(12,2),(13,2),(14,2),(16,2),(17,2),
(1,3),(2,3),(3,3),(4,3),(5,3),(6,3),(7,3),(8,3),(9,3),(10,3),(11,3),(12,3),(13,3),(14,3),(16,3),(17,3),
(1,4),(2,4),(3,4),(4,4),(5,4),(6,4),(7,4),(8,4),(9,4),(10,4),(11,4),(12,4),(13,4),(14,4),(16,4),(17,4),
(1,5),(2,5),(3,5),(4,5),(5,5),(6,5),(7,5),(8,5),(9,5),(10,5),(11,5),(12,5),(13,5),(14,5),(16,5),(17,5),
(1,6),(2,6),(3,6),(4,6),(5,6),(6,6),(7,6),(8,6),(9,6),(10,6),(11,6),(12,6),(13,6),(14,6),(16,6),(17,6),
(1,7),(2,7),(3,7),(4,7),(5,7),(6,7),(7,7),(8,7),(9,7),(10,7),(11,7),(12,7),(13,7),(14,7),(16,7),(17,7),
(1,8),(2,8),(3,8),(4,8),(5,8),(6,8),(7,8),(8,8),(9,8),(10,8),(11,8),(12,8),(13,8),(14,8),(16,8),(17,8),
(1,9),(2,9),(3,9),(4,9),(5,9),(6,9),(7,9),(8,9),(9,9),(10,9),(11,9),(12,9),(13,9),(14,9),(16,9),(17,9),
(1,10),(2,10),(3,10),(4,10),(5,10),(6,10),(7,10),(8,10),(9,10),(10,10),(11,10),(12,10),(13,10),(14,10),(16,10),(17,10),
(1,11),(2,11),(3,11),(4,11),(5,11),(6,11),(7,11),(8,11),(9,11),(10,11),(11,11),(12,11),(13,11),(15,11),(16,11),(17,11),
(1,12),(2,12),(3,12),(4,12),(5,12),(6,12),(7,12),(8,12),(9,12),(10,12),(11,12),(12,12),(13,12),(15,12),(16,12),(17,12),
(1,13),(2,13),(3,13),(4,13),(5,13),(6,13),(7,13),(8,13),(9,13),(10,13),(11,13),(12,13),(13,13),(15,13),(16,13),(17,13),
(1,14),(2,14),(3,14),(4,14),(5,14),(6,14),(7,14),(8,14),(9,14),(10,14),(11,14),(12,14),(13,14),(15,14),(16,14),(17,14),
(1,15),(2,15),(3,15),(4,15),(5,15),(6,15),(7,15),(8,15),(9,15),(10,15),(11,15),(12,15),(13,15),(15,15),(16,15),(17,15),
(1,16),(2,16),(3,16),(4,16),(5,16),(6,16),(7,16),(8,16),(9,16),(10,16),(11,16),(12,16),(13,16),(15,16),(16,16),(17,16),
(1,17),(2,17),(3,17),(4,17),(5,17),(6,17),(7,17),(8,17),(9,17),(10,17),(11,17),(12,17),(13,17),(15,17),(16,17),(17,17),
(1,18),(2,18),(3,18),(4,18),(5,18),(6,18),(7,18),(8,18),(9,18),(10,18),(11,18),(12,18),(13,18),(15,18),(16,18),(17,18),
(1,19),(2,19),(3,19),(4,19),(5,19),(6,19),(7,19),(8,19),(9,19),(10,19),(11,19),(12,19),(13,19),(15,19),(16,19),(17,19),
(1,20),(2,20),(3,20),(4,20),(5,20),(6,20),(7,20),(8,20),(9,20),(10,20),(11,20),(12,20),(13,20),(15,20),(16,20),(17,20),
(1,21),(2,21),(3,21),(4,21),(5,21),(6,21),(7,21),(8,21),(9,21),(10,21),(11,21),(12,21),(13,21),(16,21),(17,21),(18,21),
(1,22),(2,22),(3,22),(4,22),(5,22),(6,22),(7,22),(8,22),(9,22),(10,22),(11,22),(12,22),(13,22),(16,22),(17,22),(18,22),
(1,23),(2,23),(3,23),(4,23),(5,23),(6,23),(7,23),(8,23),(9,23),(10,23),(11,23),(12,23),(13,23),(16,23),(17,23),(18,23),
(1,24),(2,24),(3,24),(4,24),(5,24),(6,24),(7,24),(8,24),(9,24),(10,24),(11,24),(12,24),(13,24),(16,24),(17,24),(18,24),
(1,25),(2,25),(3,25),(4,25),(5,25),(6,25),(7,25),(8,25),(9,25),(10,25),(11,25),(12,25),(13,25),(16,25),(17,25),(18,25),
(1,26),(2,26),(3,26),(4,26),(5,26),(6,26),(7,26),(8,26),(9,26),(10,26),(11,26),(12,26),(13,26),(16,26),(17,26),(18,26),
(1,27),(2,27),(3,27),(4,27),(5,27),(6,27),(7,27),(8,27),(9,27),(10,27),(11,27),(12,27),(13,27),(16,27),(17,27),(18,27),
(1,28),(2,28),(3,28),(4,28),(5,28),(6,28),(7,28),(8,28),(9,28),(10,28),(11,28),(12,28),(13,28),(16,28),(17,28),(18,28),
(1,29),(2,29),(3,29),(4,29),(5,29),(6,29),(7,29),(8,29),(9,29),(10,29),(11,29),(12,29),(13,29),(16,29),(17,29),(18,29),
(1,30),(2,30),(3,30),(4,30),(5,30),(6,30),(7,30),(8,30),(9,30),(10,30),(11,30),(12,30),(13,30),(16,30),(17,30),(18,30),
(1,31),(2,31),(3,31),(4,31),(5,31),(6,31),(7,31),(8,31),(9,31),(10,31),(11,31),(12,31),(13,31),(16,31),(17,31),(18,31),
(1,32),(2,32),(3,32),(4,32),(5,32),(6,32),(7,32),(8,32),(9,32),(10,32),(11,32),(12,32),(13,32),(16,32),(17,32),(18,32),
(1,33),(2,33),(3,33),(4,33),(5,33),(6,33),(7,33),(8,33),(9,33),(10,33),(11,33),(12,33),(13,33),(16,33),(17,33),(18,33),
(1,34),(2,34),(3,34),(4,34),(5,34),(6,34),(7,34),(8,34),(9,34),(10,34),(11,34),(12,34),(13,34),(16,34),(17,34),(18,34),
(1,35),(2,35),(3,35),(4,35),(5,35),(6,35),(7,35),(8,35),(9,35),(10,35),(11,35),(12,35),(13,35),(16,35),(17,35),(18,35),
(1,36),(2,36),(3,36),(4,36),(5,36),(6,36),(7,36),(8,36),(9,36),(10,36),(11,36),(12,36),(13,36),(16,36),(17,36),(18,36),
(1,37),(2,37),(3,37),(4,37),(5,37),(6,37),(7,37),(8,37),(9,37),(10,37),(11,37),(12,37),(13,37),(16,37),(17,37),(18,37),
(1,38),(2,38),(3,38),(4,38),(5,38),(6,38),(7,38),(8,38),(9,38),(10,38),(11,38),(12,38),(13,38),(16,38),(17,38),(18,38),
(1,39),(2,39),(3,39),(4,39),(5,39),(6,39),(7,39),(8,39),(9,39),(10,39),(11,39),(12,39),(13,39),(16,39),(17,39),(18,39),
(1,40),(2,40),(3,40),(4,40),(5,40),(6,40),(7,40),(8,40),(9,40),(10,40),(11,40),(12,40),(13,40),(16,40),(17,40),(18,40),
(1,41),(2,41),(3,41),(4,41),(5,41),(6,41),(7,41),(8,41),(9,41),(10,41),(11,41),(12,41),(13,41),(16,41),(17,41),
(1,42),(2,42),(3,42),(4,42),(5,42),(6,42),(7,42),(8,42),(9,42),(10,42),(11,42),(12,42),(13,42),(16,42),(17,42),
(1,43),(2,43),(3,43),(4,43),(5,43),(6,43),(7,43),(8,43),(9,43),(10,43),(11,43),(12,43),(13,43),(16,43),(17,43),
(1,44),(2,44),(3,44),(4,44),(5,44),(6,44),(7,44),(8,44),(9,44),(10,44),(11,44),(12,44),(13,44),(16,44),(17,44),
(1,45),(2,45),(3,45),(4,45),(5,45),(6,45),(7,45),(8,45),(9,45),(10,45),(11,45),(12,45),(13,45),(16,45),(17,45),
(1,46),(2,46),(3,46),(4,46),(5,46),(6,46),(7,46),(8,46),(9,46),(10,46),(11,46),(12,46),(13,46),(16,46),(17,46),
(1,47),(2,47),(3,47),(4,47),(5,47),(6,47),(7,47),(8,47),(9,47),(10,47),(11,47),(12,47),(13,47),(16,47),(17,47),
(1,48),(2,48),(3,48),(4,48),(5,48),(6,48),(7,48),(8,48),(9,48),(10,48),(11,48),(12,48),(13,48),(16,48),(17,48),
(1,49),(2,49),(3,49),(4,49),(5,49),(6,49),(7,49),(8,49),(9,49),(10,49),(11,49),(12,49),(13,49),(16,49),(17,49),
(1,50),(2,50),(3,50),(4,50),(5,50),(6,50),(7,50),(8,50),(9,50),(10,50),(11,50),(12,50),(13,50),(16,50),(17,50);

INSERT INTO `ticket`
(`id`, `title`, `content`, `created_at`, `processed`, `parent_id`, `ticket_category_id`)
VALUES
(1,'Allergie alimentaire non signalée','Bonjour, je vous écris en urgence car j\'ai oublié de signaler que Lucas a développé une allergie aux fruits à coque cet été. Le médecin nous a remis un PAI que je vous apporterai demain matin. En attendant, merci de veiller à ce qu\'il ne consomme aucun produit contenant des noisettes, noix ou amandes à la cantine.','2025-10-02 06:10:00',0,1,1),
(2,'Accident sur le trajet — retard','Bonjour, un accident de circulation bloque la rue de la République. Je suis coincée dans les embouteillages avec Léa et je serai en retard d\'environ 20 minutes. Merci de bien vouloir prévenir sa maîtresse.','2025-11-19 06:55:00',0,2,1),
(3,'Enfant malade — prise de médicament','Bonjour, Lucas a une otite et le médecin lui a prescrit un antibiotique à prendre à midi. Est-il possible que l\'infirmière scolaire lui administre le médicament ? Je joindrai l\'ordonnance et le médicament dans son sac. Merci beaucoup.','2026-02-18 06:30:00',0,1,1),
(4,'Problème de harcèlement','Bonjour, Rose m\'a confié hier soir qu\'un élève de sa classe lui prend régulièrement son goûter et se moque d\'elle pendant la récréation. Elle ne veut plus aller à l\'école le matin. Pourriez-vous m\'accorder un rendez-vous rapidement pour en discuter avec l\'enseignante ? C\'est assez urgent.','2025-12-18 18:45:00',0,1,1),
(5,'Absence pour rendez-vous médical','Bonjour, Léa a un rendez-vous chez l\'orthodontiste le mardi 18 mars à 14h. Je viendrai la chercher à 13h30 après la cantine. Elle sera de retour à l\'école le lendemain matin. Cordialement.','2025-09-18 17:20:00',0,2,2),
(6,'Absence maladie — gastro-entérite','Bonjour, Lucas est malade depuis hier soir (gastro-entérite). Le médecin recommande 48 heures de repos. Il ne sera donc pas présent jeudi et vendredi. Je vous tiendrai informés de son retour. Merci de bien vouloir transmettre les devoirs si possible.','2025-09-10 05:45:00',1,1,2),
(7,'Retard prévu lundi matin','Bonjour, en raison d\'un rendez-vous médical tôt le matin, Léa arrivera à l\'école vers 9h30 lundi. Merci de prévenir la maîtresse. Bonne journée.','2026-01-09 07:20:00',1,2,2),
(8,'Absence pour fête religieuse','Bonjour, nous souhaitons vous informer que Lucas et Rose seront absents le jeudi 20 mars à l\'occasion d\'une fête religieuse familiale. Merci de bien vouloir excuser leur absence. Ils rattraperont les cours manqués.','2025-11-06 19:45:00',0,1,2),
(9,'Absence — décès dans la famille','Bonjour, je vous informe avec tristesse que Rose et Lucas seront absents cette semaine en raison du décès de leur grand-père. Nous vous remercions de votre compréhension dans cette période difficile. Cordialement.','2026-01-30 13:00:00',1,1,2),
(10,'Question sur les menus de la cantine','Bonjour, Léa me dit qu\'elle n\'aime pas les repas servis le jeudi. Serait-il possible de consulter les menus de la cantine à l\'avance ? Existe-t-il une alternative quand le plat principal contient du poisson ? Merci pour votre retour.','2025-10-14 16:30:00',1,2,3),
(11,'Objet perdu — manteau bleu','Bonjour, Lucas a perdu son manteau bleu marine avec une capuche et une fermeture éclair rouge, probablement mardi dernier. Nous avons cherché dans le bac des objets trouvés sans succès. Pourriez-vous vérifier dans sa classe ou au gymnase ? Merci.','2025-12-03 16:30:00',0,1,3),
(12,'Demande de certificat de scolarité','Bonjour, j\'aurais besoin d\'un certificat de scolarité pour Rose et Lucas pour une démarche administrative auprès de la CAF. Serait-il possible de me le fournir d\'ici la fin de la semaine ? Merci d\'avance.','2026-01-21 20:10:00',1,1,3),
(13,'Question sur les devoirs','Bonjour, Léa n\'a pas noté ses devoirs pour lundi dans son cahier de textes. Pourriez-vous me confirmer s\'il y avait de la lecture et des opérations de mathématiques à faire ? Merci beaucoup, bonne soirée.','2026-02-27 18:50:00',1,2,3),
(14,'Sortie anticipée pour rendez-vous','Bonjour, je souhaiterais récupérer Lucas à 15h30 le jeudi 20 mars pour un rendez-vous chez l\'ophtalmologue. Pourriez-vous préparer une autorisation de sortie anticipée ? Merci.','2025-10-28 11:15:00',0,1,4),
(15,'Droit à l\'image — refus partiel','Bonjour, nous autorisons la prise de photos de Léa dans le cadre des activités scolaires, mais nous ne souhaitons pas que son image soit publiée sur le site internet de l\'école ni sur les réseaux sociaux. Merci de bien vouloir en prendre note.','2025-12-11 08:00:00',1,2,4),
(16,'Autorisation de sortie avec un tiers','Bonjour, je vous informe que ma sœur, Mme Sophie Durand, viendra chercher Rose et Lucas mercredi à 16h30. Elle est déjà inscrite sur la liste des personnes autorisées. Voici son numéro de téléphone pour vérification : 06 12 34 56 78.','2026-02-06 17:15:00',0,1,4),
(17,'Autorisation de participation à la piscine','Bonjour, suite au courrier reçu concernant les séances de piscine pour les CE1, je confirme que Léa est autorisée à participer. Elle sait nager mais n\'est pas encore très à l\'aise en grande profondeur. Merci de bien vouloir en informer le maître-nageur.','2026-03-05 09:30:00',1,2,4);

INSERT INTO `ticket_student` VALUES
(1,1),(3,1),(6,1),(8,1),(9,1),(11,1),(12,1),(14,1),(16,1),
(2,2),(5,2),(7,2),(10,2),(13,2),(15,2),(17,2),
(4,11),(8,11),(9,11),(12,11),(16,11);

SET FOREIGN_KEY_CHECKS = 1;