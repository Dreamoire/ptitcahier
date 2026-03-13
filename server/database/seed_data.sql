-- ============================================================
-- P'tit Cahier — Données réalistes pour la démonstration
-- ============================================================
-- ÉTAPE 1 : Vider les anciennes données (lorem ipsum)
-- On supprime d'abord les tables de liaison, puis les données principales
-- ============================================================

USE ptit_cahier;

-- Forcer la lecture en UTF-8
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

-- Désactiver temporairement les vérifications de clés étrangères
SET FOREIGN_KEY_CHECKS = 0;

-- Vider les tables de liaison
TRUNCATE TABLE announcement_student;
TRUNCATE TABLE ticket_student;

-- Vider les tables principales
TRUNCATE TABLE announcement;
TRUNCATE TABLE ticket;

-- Réactiver les vérifications
SET FOREIGN_KEY_CHECKS = 1;

-- ============================================================
-- ÉTAPE 2 : Insérer les annonces (announcements)
-- Catégories existantes :
--   1 = Vie de l'école
--   2 = Administratif
--   3 = Événement
-- school_id = 1 (École Primaire Émile Zola)
-- ============================================================

INSERT INTO announcement (title, content, announcement_category_id, school_id) VALUES

-- ── Vie de l'école (category_id = 1) ──

('Photos de classe',
'Le photographe scolaire sera présent lundi 17 mars toute la matinée. Les photos individuelles et de groupe seront prises dans la salle polyvalente. Merci de veiller à ce que les enfants arrivent à l''heure et soient bien coiffés pour l''occasion.',
1, 1),

('Don de livres pour la bibliothèque',
'Nous organisons une grande collecte de livres jeunesse pour enrichir notre coin lecture. Romans, albums illustrés, BD, documentaires : tout est le bienvenu ! Vous pouvez déposer vos dons à l''accueil de l''école jusqu''au vendredi 28 mars.',
1, 1),

('Nouveau coin lecture aménagé',
'Grâce à vos généreux dons de livres, un tout nouveau coin lecture a été aménagé dans le préau couvert. Les élèves pourront en profiter pendant les récréations et les temps calmes. Un grand merci à l''association des parents pour le financement des coussins et des étagères.',
1, 1),

('Permis Piéton pour les CE2',
'Dans le cadre de l''éducation à la sécurité routière, les gendarmes de la brigade de prévention interviendront jeudi 20 mars dans la classe de CE2. Les élèves passeront un petit examen pour obtenir leur Permis Piéton. Bonne chance à nos futurs marcheurs responsables !',
1, 1),

('Intervention sur le tri sélectif',
'Un animateur de la communauté d''agglomération viendra sensibiliser les élèves de CM1 et CM2 au tri des déchets et au recyclage, le mardi 25 mars de 14h à 15h30. Les enfants sont invités à apporter un emballage vide de la maison pour l''atelier pratique.',
1, 1),

('Semaine du goût : ateliers cuisine',
'À l''occasion de la Semaine du goût, des ateliers cuisine seront organisés dans chaque classe du 13 au 17 octobre. Les parents volontaires pour encadrer les ateliers sont priés de se signaler auprès de l''enseignant de leur enfant avant le 6 octobre.',
1, 1),

-- ── Administratif (category_id = 2) ──

('Épidémie de grippe — Rappel sanitaire',
'Plusieurs cas de grippe ont été signalés dans les classes de CP et CE1 ces derniers jours. Nous vous rappelons les gestes barrières essentiels : lavage fréquent des mains, mouchoir à usage unique, et toux dans le coude. En cas de fièvre supérieure à 38°C, merci de garder votre enfant à la maison et de prévenir l''école.',
2, 1),

('Fermeture exceptionnelle de la cantine',
'En raison d''un mouvement de grève du personnel municipal, la cantine sera fermée ce jeudi 13 mars. Les familles sont priées de prévoir un panier repas pour leur enfant. L''accueil périscolaire du matin et du soir fonctionnera normalement.',
2, 1),

('Mise à jour des fiches de renseignements',
'Nous vous demandons de vérifier et mettre à jour les fiches de renseignements de vos enfants avant le 31 mars. Numéros de téléphone, adresse, personnes autorisées à récupérer l''enfant : toute modification doit être signalée au secrétariat.',
2, 1),

('Rappel : assurance scolaire obligatoire',
'Pour toute participation aux sorties scolaires, l''attestation d''assurance responsabilité civile et individuelle accident est obligatoire. Merci de transmettre le document au plus vite si ce n''est pas déjà fait. Sans cette attestation, votre enfant ne pourra pas participer aux activités extérieures.',
2, 1),

('Grève nationale — Organisation du 18 mars',
'En raison du mouvement de grève nationale annoncé pour le mardi 18 mars, un service minimum d''accueil sera mis en place. Seules les classes de CP et CM2 seront assurées. Les familles concernées par les autres niveaux sont invitées à prendre leurs dispositions.',
2, 1),

('Horaires de la rentrée de janvier',
'La rentrée après les vacances de Noël aura lieu le lundi 6 janvier à 8h30. L''accueil périscolaire reprendra dès 7h30. Le service de cantine fonctionnera normalement dès le premier jour.',
2, 1),

-- ── Événement (category_id = 3) ──

('Spectacle de Noël — Invitation',
'Le traditionnel spectacle de Noël de l''école se tiendra le vendredi 19 décembre à 18h à la salle des fêtes municipale. Chaque classe présentera un numéro préparé avec soin. Un goûter offert par l''association des parents clôturera la soirée. Entrée libre, venez nombreux !',
3, 1),

('Sortie à la ferme pédagogique',
'Le mardi 10 février, les élèves de CP partiront à la découverte de la ferme pédagogique des Quatre Saisons. Au programme : visite des animaux, atelier fabrication de beurre et balade en tracteur. Départ en bus à 9h, retour prévu à 16h. Prévoir des bottes en caoutchouc et un pique-nique.',
3, 1),

('Alerte météo — Sortie annulée',
'En raison des vents violents annoncés par Météo France (vigilance orange), la sortie en forêt de Sénart prévue cet après-midi pour les CE1 est annulée pour des raisons de sécurité. Les élèves resteront en classe avec un programme adapté. La sortie sera reprogrammée ultérieurement.',
3, 1),

('Carnaval de l''école',
'Le carnaval aura lieu le vendredi 14 février. Les enfants sont invités à venir déguisés dès le matin. Un défilé dans le quartier est prévu à 14h30, suivi d''un goûter offert par l''association des parents dans la cour de l''école. Pas de confettis à l''intérieur des bâtiments, merci !',
3, 1),

('Kermesse de fin d''année',
'La kermesse de fin d''année se déroulera le samedi 28 juin de 14h à 18h dans la cour de l''école. Au programme : stands de jeux, tombola, buvette et spectacle des élèves. L''association des parents recherche des volontaires pour la tenue des stands. Inscrivez-vous au tableau d''affichage !',
3, 1),

('Visite guidée au Musée du Chocolat',
'Le jeudi 3 avril, les classes de CE2 et CM1 se rendront au Musée du Chocolat à Paris pour une visite guidée suivie d''un atelier dégustation. Rendez-vous à 8h30 dans la cour, devant le bus. Retour prévu vers 16h30. Merci de prévoir un pique-nique sans chocolat... l''ironie serait trop grande !',
3, 1);


-- ============================================================
-- ÉTAPE 3 : Insérer les tickets (demandes des parents)
-- Catégories existantes :
--   1 = Urgence
--   2 = Absence
--   3 = Divers
--   4 = Autorisation
-- parent_id : 1 = Jean Dupont, 2 = Marie Martin
-- ============================================================

INSERT INTO ticket (title, content, processed, parent_id, ticket_category_id) VALUES

-- ── Urgence (category_id = 1) ──

('Allergie alimentaire non signalée',
'Bonjour, je vous écris en urgence car j''ai oublié de signaler que Lucas a développé une allergie aux fruits à coque cet été. Le médecin nous a remis un PAI que je vous apporterai demain matin. En attendant, merci de veiller à ce qu''il ne consomme aucun produit contenant des noisettes, noix ou amandes à la cantine.',
0, 1, 1),

('Accident sur le trajet — retard',
'Bonjour, un accident de circulation bloque la rue de la République. Je suis coincée dans les embouteillages avec Léa et je serai en retard d''environ 20 minutes. Merci de bien vouloir prévenir sa maîtresse.',
0, 2, 1),

('Enfant malade — prise de médicament',
'Bonjour, Lucas a une otite et le médecin lui a prescrit un antibiotique à prendre à midi. Est-il possible que l''infirmière scolaire lui administre le médicament ? Je joindrai l''ordonnance et le médicament dans son sac. Merci beaucoup.',
0, 1, 1),

('Problème de harcèlement',
'Bonjour, Rose m''a confié hier soir qu''un élève de sa classe lui prend régulièrement son goûter et se moque d''elle pendant la récréation. Elle ne veut plus aller à l''école le matin. Pourriez-vous m''accorder un rendez-vous rapidement pour en discuter avec l''enseignante ? C''est assez urgent.',
0, 1, 1),

-- ── Absence (category_id = 2) ──

('Absence pour rendez-vous médical',
'Bonjour, Léa a un rendez-vous chez l''orthodontiste le mardi 18 mars à 14h. Je viendrai la chercher à 13h30 après la cantine. Elle sera de retour à l''école le lendemain matin. Cordialement.',
0, 2, 2),

('Absence maladie — gastro-entérite',
'Bonjour, Lucas est malade depuis hier soir (gastro-entérite). Le médecin recommande 48 heures de repos. Il ne sera donc pas présent jeudi et vendredi. Je vous tiendrai informés de son retour. Merci de bien vouloir transmettre les devoirs si possible.',
1, 1, 2),

('Retard prévu lundi matin',
'Bonjour, en raison d''un rendez-vous médical tôt le matin, Léa arrivera à l''école vers 9h30 lundi. Merci de prévenir la maîtresse. Bonne journée.',
1, 2, 2),

('Absence pour fête religieuse',
'Bonjour, nous souhaitons vous informer que Lucas et Rose seront absents le jeudi 20 mars à l''occasion d''une fête religieuse familiale. Merci de bien vouloir excuser leur absence. Ils rattraperont les cours manqués.',
0, 1, 2),

('Absence — décès dans la famille',
'Bonjour, je vous informe avec tristesse que Rose et Lucas seront absents cette semaine en raison du décès de leur grand-père. Nous vous remercions de votre compréhension dans cette période difficile. Cordialement.',
1, 1, 2),

-- ── Divers (category_id = 3) ──

('Question sur les menus de la cantine',
'Bonjour, Léa me dit qu''elle n''aime pas les repas servis le jeudi. Serait-il possible de consulter les menus de la cantine à l''avance ? Existe-t-il une alternative quand le plat principal contient du poisson ? Merci pour votre retour.',
1, 2, 3),

('Objet perdu — manteau bleu',
'Bonjour, Lucas a perdu son manteau bleu marine avec une capuche et une fermeture éclair rouge, probablement mardi dernier. Nous avons cherché dans le bac des objets trouvés sans succès. Pourriez-vous vérifier dans sa classe ou au gymnase ? Merci.',
0, 1, 3),

('Demande de certificat de scolarité',
'Bonjour, j''aurais besoin d''un certificat de scolarité pour Rose et Lucas pour une démarche administrative auprès de la CAF. Serait-il possible de me le fournir d''ici la fin de la semaine ? Merci d''avance.',
1, 1, 3),

('Question sur les devoirs',
'Bonjour, Léa n''a pas noté ses devoirs pour lundi dans son cahier de textes. Pourriez-vous me confirmer s''il y avait de la lecture et des opérations de mathématiques à faire ? Merci beaucoup, bonne soirée.',
1, 2, 3),

-- ── Autorisation (category_id = 4) ──

('Sortie anticipée pour rendez-vous',
'Bonjour, je souhaiterais récupérer Lucas à 15h30 le jeudi 20 mars pour un rendez-vous chez l''ophtalmologue. Pourriez-vous préparer une autorisation de sortie anticipée ? Merci.',
0, 1, 4),

('Droit à l''image — refus partiel',
'Bonjour, nous autorisons la prise de photos de Léa dans le cadre des activités scolaires, mais nous ne souhaitons pas que son image soit publiée sur le site internet de l''école ni sur les réseaux sociaux. Merci de bien vouloir en prendre note.',
1, 2, 4),

('Autorisation de sortie avec un tiers',
'Bonjour, je vous informe que ma sœur, Mme Sophie Durand, viendra chercher Rose et Lucas mercredi à 16h30. Elle est déjà inscrite sur la liste des personnes autorisées. Voici son numéro de téléphone pour vérification : 06 12 34 56 78.',
0, 1, 4),

('Autorisation de participation à la piscine',
'Bonjour, suite au courrier reçu concernant les séances de piscine pour les CE1, je confirme que Léa est autorisée à participer. Elle sait nager mais n''est pas encore très à l''aise en grande profondeur. Merci de bien vouloir en informer le maître-nageur.',
1, 2, 4);


-- ============================================================
-- ÉTAPE 4 : Remplir les tables de liaison
-- On associe les annonces aux élèves par classe
-- ============================================================

-- Annonces "Vie de l'école" et "Administratif" → toute l'école (tous les élèves, id 1 à 50)
-- On crée les associations pour les annonces générales (id 1 à 12)

INSERT INTO announcement_student (announcement_id, student_id)
SELECT a.id, s.id
FROM announcement a
CROSS JOIN student s
WHERE a.id BETWEEN 1 AND 12;

-- Annonces "Événement" spécifiques à certaines classes :
-- id 13 (Spectacle Noël) → toute l'école
INSERT INTO announcement_student (announcement_id, student_id)
SELECT 13, id FROM student;

-- id 14 (Ferme pédagogique) → CP seulement (classroom_id = 1, students 1-10)
INSERT INTO announcement_student (announcement_id, student_id)
SELECT 14, id FROM student WHERE classroom_id = 1;

-- id 15 (Alerte météo) → CE1 seulement (classroom_id = 2, students 11-20)
INSERT INTO announcement_student (announcement_id, student_id)
SELECT 15, id FROM student WHERE classroom_id = 2;

-- id 16 (Carnaval) → toute l'école
INSERT INTO announcement_student (announcement_id, student_id)
SELECT 16, id FROM student;

-- id 17 (Kermesse) → toute l'école
INSERT INTO announcement_student (announcement_id, student_id)
SELECT 17, id FROM student;

-- id 18 (Musée Chocolat) → CE2 + CM1 (classroom_id = 3 et 4)
INSERT INTO announcement_student (announcement_id, student_id)
SELECT 18, id FROM student WHERE classroom_id IN (3, 4);


-- Associations ticket_student
-- Parent 1 (Jean Dupont) a Lucas (id=1) et Rose (id=11)
-- Parent 2 (Marie Martin) a Léa (id=2)

-- Tickets parent 1 concernant Lucas
INSERT INTO ticket_student (ticket_id, student_id) VALUES
(1, 1),   -- Allergie → Lucas
(3, 1),   -- Médicament → Lucas
(4, 11),  -- Harcèlement → Rose
(6, 1),   -- Gastro → Lucas
(8, 1),   -- Fête religieuse → Lucas
(8, 11),  -- Fête religieuse → Rose
(9, 1),   -- Décès → Lucas
(9, 11),  -- Décès → Rose
(11, 1),  -- Manteau perdu → Lucas
(12, 1),  -- Certificat → Lucas
(12, 11), -- Certificat → Rose
(14, 1),  -- Sortie anticipée → Lucas
(16, 1),  -- Sortie tiers → Lucas
(16, 11); -- Sortie tiers → Rose

-- Tickets parent 2 concernant Léa
INSERT INTO ticket_student (ticket_id, student_id) VALUES
(2, 2),   -- Accident trajet → Léa
(5, 2),   -- Orthodontiste → Léa
(7, 2),   -- Retard lundi → Léa
(10, 2),  -- Menus cantine → Léa
(13, 2),  -- Devoirs → Léa
(15, 2),  -- Droit image → Léa
(17, 2);  -- Piscine → Léa
