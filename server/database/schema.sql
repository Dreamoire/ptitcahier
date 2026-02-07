CREATE TABLE school (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    school_name VARCHAR(100) NOT NULL
);

CREATE TABLE parent (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    genre VARCHAR(1) NOT NULL
);

CREATE TABLE announcement_category (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE ticket_category (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(120),
    color VARCHAR(6) NOT NULL,
    icon VARCHAR(20) NOT NULL
);

CREATE TABLE classroom (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    classroom_name VARCHAR(100) NOT NULL,
    school_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (school_id) REFERENCES school(id)
);

CREATE TABLE announcement (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    content VARCHAR(1000) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,        
    announcement_category_id INT UNSIGNED NOT NULL,
    school_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (announcement_category_id) REFERENCES announcement_category(id),
    FOREIGN KEY (school_id) REFERENCES school(id)
);

CREATE TABLE student (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    last_name VARCHAR(100) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    born_at DATE NOT NULL,
    classroom_id INT unsigned NOT NULL,
    parent_id INT unsigned NOT NULL,
    FOREIGN KEY (classroom_id) REFERENCES classroom(id),
    FOREIGN KEY (parent_id) REFERENCES parent(id)
);

CREATE TABLE announcement_student (
    announcement_id INT UNSIGNED NOT NULL,
    student_id INT UNSIGNED NOT NULL,
    PRIMARY KEY (announcement_id, student_id),
    FOREIGN KEY (announcement_id) REFERENCES announcement(id),
    FOREIGN KEY (student_id) REFERENCES student(id)
);

CREATE TABLE ticket (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    content VARCHAR(1000) NOT NULL,    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    parent_id INT UNSIGNED NOT NULL,
    ticket_category_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (parent_id) REFERENCES parent(id),
    FOREIGN KEY (ticket_category_id) REFERENCES ticket_category(id)
);

CREATE TABLE ticket_student ( 
    ticket_id INT UNSIGNED NOT NULL,
    student_id INT UNSIGNED NOT NULL,
    PRIMARY KEY (ticket_id, student_id),
    FOREIGN KEY (ticket_id) REFERENCES ticket(id),
    FOREIGN KEY (student_id) REFERENCES student(id)
);

INSERT INTO announcement_category (id, name)
VALUES
(1, "Vie de l'école"),
(2, "Administratif"),
(3, "Evénement");

INSERT INTO ticket_category (id, name, description, color, icon)
VALUES
(1, "Urgence", "Informer d'une situation nécessitant une action rapide (Changement de personne, incident…)", "e5484d", "OctagonAlert"),
(2, "Absence", "Signaler une absence prévue ou imprévue (Maladie, rendez-vous médical, retard…)", "f97015", "CalendarCheck"),
(3, "Divers", "Poser une question ou obtenir un renseignement (Cantine, horaires, documents…)", "16a249", "NotebookPen"),
(4, "Autorisation", "Demander une permission ou un accord spécifique (Sortie anticipée, droit à l'image…)", "0da2e7", "ShieldUser");

INSERT INTO school (email, password, school_name)
VALUES
("contact@greenvalley.edu", "GreenValley123!", "Ecole Primaire Emile Zola"),
("admin@riverside-intl.edu", "Riverside2024$", "Ecole Primaire Voltaire");

INSERT INTO parent (email, password, last_name, first_name, genre)
VALUES
("JeanDupont@email.com", "password123", "Dupont", "Jean", "M"),
("MarieMartin@email.com", "password123", "Martin", "Marie", "F"),
("PierreBernard@email.com", "password123", "Bernard", "Pierre", "M"),
("JulieThomas@email.com", "password123", "Thomas", "Julie", "F"),
("LucPetit@email.com", "password123", "Petit", "Luc", "M"),
("SophieRobert@email.com", "password123", "Robert", "Sophie", "F"),
("MarcRichard@email.com", "password123", "Richard", "Marc", "M"),
("IsabelleDurand@email.com", "password123", "Durand", "Isabelle", "F"),
("ThomasDubois@email.com", "password123", "Dubois", "Thomas", "M"),
("NathalieMoreau@email.com", "password123", "Moreau", "Nathalie", "F"),
("NicolasLaurent@email.com", "password123", "Laurent", "Nicolas", "M"),
("CélineSimon@email.com", "password123", "Simon", "Céline", "F"),
("DavidMichel@email.com", "password123", "Michel", "David", "M"),
("AurélieLefebvre@email.com", "password123", "Lefebvre", "Aurélie", "F"),
("ChristopheLeroy@email.com", "password123", "Leroy", "Christophe", "M"),
("ÉlodieRoux@email.com", "password123", "Roux", "Élodie", "F"),
("JulienDavid@email.com", "password123", "David", "Julien", "M"),
("StéphanieBertrand@email.com", "password123", "Bertrand", "Stéphanie", "F"),
("FrédéricMorel@email.com", "password123", "Morel", "Frédéric", "M"),
("ValérieFournier@email.com", "password123", "Fournier", "Valérie", "F"),
("SébastienGirard@email.com", "password123", "Girard", "Sébastien", "M"),
("SandrineBonnet@email.com", "password123", "Bonnet", "Sandrine", "F"),
("LaurentDupuis@email.com", "password123", "Dupuis", "Laurent", "M"),
("VéroniqueLambert@email.com", "password123", "Lambert", "Véronique", "F"),
("OlivierFaure@email.com", "password123", "Faure", "Olivier", "M"),
("ChristineRousseau@email.com", "password123", "Rousseau", "Christine", "F"),
("JérômeBlanc@email.com", "password123", "Blanc", "Jérôme", "M"),
("AnneGuerin@email.com", "password123", "Guerin", "Anne", "F"),
("GuillaumeMuller@email.com", "password123", "Muller", "Guillaume", "M"),
("CatherineHenry@email.com", "password123", "Henry", "Catherine", "F"),
("BenoîtRoussel@email.com", "password123", "Roussel", "Benoît", "M"),
("FlorenceNicolas@email.com", "password123", "Nicolas", "Florence", "F"),
("VincentPerrin@email.com", "password123", "Perrin", "Vincent", "M"),
("MagaliMorin@email.com", "password123", "Morin", "Magali", "F"),
("ArnaudMathieu@email.com", "password123", "Mathieu", "Arnaud", "M"),
("CarolineClement@email.com", "password123", "Clement", "Caroline", "F"),
("FranckGauthier@email.com", "password123", "Gauthier", "Franck", "M"),
("ÉmilieDumont@email.com", "password123", "Dumont", "Émilie", "F"),
("MatthieuLopez@email.com", "password123", "Lopez", "Matthieu", "M"),
("LaetitiaFontaine@email.com", "password123", "Fontaine", "Laetitia", "F"),
("StéphaneChevalier@email.com", "password123", "Chevalier", "Stéphane", "M"),
("HélèneRobin@email.com", "password123", "Robin", "Hélène", "F"),
("RomainMasson@email.com", "password123", "Masson", "Romain", "M"),
("AudreySanchez@email.com", "password123", "Sanchez", "Audrey", "F"),
("LudovicGerard@email.com", "password123", "Gerard", "Ludovic", "M"),
("VirginieNguyen@email.com", "password123", "Nguyen", "Virginie", "F"),
("CédricBoyer@email.com", "password123", "Boyer", "Cédric", "M"),
("KarineDenis@email.com", "password123", "Denis", "Karine", "F"),
("FabriceLemaire@email.com", "password123", "Lemaire", "Fabrice", "M"),
("MélanieDuval@email.com", "password123", "Duval", "Mélanie", "F"),
("SylvainJoly@email.com", "password123", "Joly", "Sylvain", "M"),
("DelphineGautier@email.com", "password123", "Gautier", "Delphine", "F"),
("GrégoryRoger@email.com", "password123", "Roger", "Grégory", "M"),
("LaureRoche@email.com", "password123", "Roche", "Laure", "F"),
("AnthonyRoy@email.com", "password123", "Roy", "Anthony", "M"),
("ClaireNoel@email.com", "password123", "Noel", "Claire", "F"),
("EmmanuelMeyer@email.com", "password123", "Meyer", "Emmanuel", "M"),
("AgnèsLucas@email.com", "password123", "Lucas", "Agnès", "F"),
("SamuelMeunier@email.com", "password123", "Meunier", "Samuel", "M"),
("PatriciaJean@email.com", "password123", "Jean", "Patricia", "F"),
("XavierPerez@email.com", "password123", "Perez", "Xavier", "M"),
("MoniqueMarchand@email.com", "password123", "Marchand", "Monique", "F"),
("MaximeDufour@email.com", "password123", "Dufour", "Maxime", "M"),
("SylvieBlanchard@email.com", "password123", "Blanchard", "Sylvie", "F"),
("JonathanDa Silva@email.com", "password123", "Da Silva", "Jonathan", "M"),
("CamilleBarbier@email.com", "password123", "Barbier", "Camille", "F"),
("AlexandreBrun@email.com", "password123", "Brun", "Alexandre", "M"),
("ChloéDumas@email.com", "password123", "Dumas", "Chloé", "F"),
("KévinBrunet@email.com", "password123", "Brunet", "Kévin", "M"),
("SarahSchmitt@email.com", "password123", "Schmitt", "Sarah", "F"),
("DamienLeroux@email.com", "password123", "Leroux", "Damien", "M"),
("LauraColin@email.com", "password123", "Colin", "Laura", "F"),
("FlorianVidal@email.com", "password123", "Vidal", "Florian", "M"),
("ManonCaron@email.com", "password123", "Caron", "Manon", "F"),
("BenjaminPicard@email.com", "password123", "Picard", "Benjamin", "M"),
("PaulineLeclerc@email.com", "password123", "Leclerc", "Pauline", "F"),
("AdrienArnaud@email.com", "password123", "Arnaud", "Adrien", "M"),
("AliceRenard@email.com", "password123", "Renard", "Alice", "F"),
("GabrielGaillard@email.com", "password123", "Gaillard", "Gabriel", "M"),
("MathildeRolland@email.com", "password123", "Rolland", "Mathilde", "F"),
("RaphaëlAubry@email.com", "password123", "Aubry", "Raphaël", "M"),
("LéaBesse@email.com", "password123", "Besse", "Léa", "F"),
("LéoAdam@email.com", "password123", "Adam", "Léo", "M"),
("ClémenceBailly@email.com", "password123", "Bailly", "Clémence", "F"),
("ThéoCarpentier@email.com", "password123", "Carpentier", "Théo", "M"),
("AnaïsFleury@email.com", "password123", "Fleury", "Anaïs", "F"),
("HugoKlein@email.com", "password123", "Klein", "Hugo", "M"),
("MarionMarchal@email.com", "password123", "Marchal", "Marion", "F"),
("EnzoHamon@email.com", "password123", "Hamon", "Enzo", "M"),
("HugoDupont@email.com", "password123", "Dupont", "Hugo", "M"),
("StephanieMartin@email.com", "password123", "Martin", "Stephanie", "F"),
("AurelieSmeul@email.com", "password123", "Smeul", "Aurelie", "F"),
("RichardThomas@email.com", "password123", "Thomas", "Richard", "M"),
("SophiePetit@email.com", "password123", "Petit", "Sophie", "F"),
("SarahRobert@email.com", "password123", "Robert", "Sarah", "F"),
("JaquelineRichard@email.com", "password123", "Richard", "Jaqueline", "F"),
("KevinDurand@email.com", "password123", "Durand", "Kevin", "M");

INSERT INTO classroom (classroom_name, school_id)
VALUES
("CP Les Petits Dauphins", 1),
("CE1 Les Explorateurs", 1),
("CE2 Les Artistes", 1),
("CM1 Les Genies", 1),
("CM2 Les Aventuriers", 1);

INSERT INTO student (last_name, first_name, born_at, classroom_id, parent_id)
VALUES
("Dupont", "Lucas", "2018-05-14", 1, 1),
("Martin", "Léa", "2018-06-24", 1, 2),
("Bernard", "Léo", "2019-01-04", 1, 3),
("Thomas", "Chloé", "2019-02-14", 1, 4),
("Petit", "Louis", "2018-10-21", 1, 5),
("Robert", "Emma", "2019-03-23", 1, 6),
("Richard", "Gabriel", "2019-04-05", 1, 7),
("Durand", "Jade", "2019-06-27", 1, 8),
("Dubois", "Arthur", "2018-08-24", 1, 9),
("Moreau", "Manon", "2018-08-25", 1, 10),
("Laurent", "Jules", "2018-08-26", 1, 11),
("Simon", "Louise", "2018-08-27", 1, 12),
("Michel", "Raphaël", "2018-08-28", 1, 13),
("Lefebvre", "Alice", "2018-08-29", 1, 14),
("Leroy", "Adam", "2019-03-23", 1, 15),
("Roux", "Lina", "2019-03-24", 1, 16),
("David", "Maël", "2019-03-25", 1, 17),
("Bertrand", "Mila", "2019-03-26", 1, 18),
("Morel", "Liam", "2018-09-03", 1, 19),
("Fournier", "Rose", "2014-06-18", 2, 1),
("Girard", "Noah", "2013-02-09", 2, 20),
("Bonnet", "Anna", "2012-05-27", 2, 21),
("Dupuis", "Paul", "2018-11-15", 2, 22),
("Lambert", "Inès", "2017-08-20", 2, 23),
("Faure", "Ethan", "2016-01-10", 2, 24),
("Rousseau", "Sarah", "2015-07-04", 2, 25),
("Blanc", "Sacha", "2014-09-16", 2, 26),
("Guerin", "Julia", "2013-03-22", 2, 27),
("Muller", "Gabin", "2012-10-08", 2, 28),
("Henry", "Ambre", "2018-02-14", 2, 29),
("Roussel", "Nathan", "2017-06-30", 2, 30),
("Nicolas", "Zoé", "2016-12-12", 2, 31),
("Perrin", "Mohamed", "2015-05-05", 2, 32),
("Morin", "Juliette", "2014-11-20", 2, 33),
("Mathieu", "Aaron", "2013-08-15", 2, 34),
("Clement", "Léna", "2012-01-30", 2, 35),
("Gauthier", "Tom", "2018-09-09", 2, 36),
("Dumont", "Agathe", "2017-04-04", 2, 37),
("Lopez", "Théo", "2016-10-18", 2, 38),
("Fontaine", "Mia", "2015-02-22", 2, 39),
("Chevalier", "Léon", "2014-07-14", 2, 40),
("Robin", "Lola", "2013-12-05", 3, 5),
("Masson", "Isaac", "2012-06-28", 3, 41),
("Sanchez", "Charlotte", "2018-01-19", 3, 42),
("Gerard", "Noé", "2017-08-02", 3, 43),
("Nguyen", "Eva", "2016-03-15", 3, 44),
("Boyer", "Marius", "2015-09-29", 3, 45),
("Denis", "Jeanne", "2014-12-25", 3, 46),
("Lemaire", "Victor", "2013-05-10", 3, 47),
("Duval", "Nina", "2012-11-20", 3, 48),
("Joly", "Mathis", "2018-06-06", 3, 49),
("Gautier", "Lou", "2017-10-30", 3, 50),
("Roger", "Timéo", "2016-02-15", 3, 51),
("Roche", "Camille", "2015-07-08", 3, 52),
("Roy", "Yan", "2014-04-12", 3, 53),
("Noel", "Romy", "2013-09-03", 3, 54),
("Meyer", "Enzo", "2012-12-18", 3, 55),
("Lucas", "Adèle", "2018-03-25", 3, 56),
("Meunier", "Antoine", "2017-08-09", 3, 57),
("Jean", "Iris", "2016-01-20", 3, 58),
("Perez", "Robin", "2015-06-11", 3, 59),
("Marchand", "Margaux", "2014-10-05", 4, 60),
("Dufour", "Axel", "2013-02-28", 4, 61),
("Blanchard", "Luna", "2012-05-15", 4, 62),
("Da Silva", "Nolan", "2018-11-01", 4, 63),
("Barbier", "Valentine", "2017-07-22", 4, 64),
("Brun", "Maxence", "2016-12-30", 4, 65),
("Dumas", "Clara", "2015-04-18", 4, 66),
("Brunet", "Gaspard", "2014-08-08", 4, 67),
("Schmitt", "Victoire", "2013-01-12", 4, 68),
("Leroux", "Valentin", "2012-09-25", 4, 69),
("Colin", "Éléonore", "2018-05-02", 4, 70),
("Vidal", "Augustin", "2017-03-14", 4, 71),
("Caron", "Olivia", "2016-10-22", 4, 72),
("Picard", "Clément", "2015-12-09", 4, 73),
("Leclerc", "Alix", "2014-06-03", 4, 74),
("Arnaud", "Baptiste", "2013-11-15", 4, 75),
("Renard", "Apolline", "2012-02-05", 4, 76),
("Gaillard", "Côme", "2018-08-28", 4, 77),
("Rolland", "Capucine", "2017-01-09", 4, 78),
("Aubry", "Simon", "2016-07-17", 4, 79),
("Besse", "Constance", "2015-03-30", 4, 80),
("Adam", "Martin", "2014-09-12", 4, 81),
("Bailly", "Héloïse", "2013-04-25", 5, 82),
("Carpentier", "Evan", "2012-10-10", 5, 83),
("Fleury", "Suzanne", "2018-02-18", 5, 41),
("Klein", "Max", "2017-06-05", 5, 84),
("Marchal", "Elsa", "2016-11-22", 5, 85),
("Hamon", "Sohan", "2015-05-14", 5, 86),
("Dupont", "Mathéo", "2014-02-12", 5, 87),
("Martin", "Lise", "2018-09-19", 5, 88),
("Bernard", "Hugo", "2012-12-01", 5, 89),
("Thomas", "Diane", "2017-06-25", 5, 90),
("Petit", "Arthur", "2016-04-10", 5, 91),
("Robert", "Yasmine", "2015-01-15", 5, 92),
("Richard", "Ibrahim", "2014-07-28", 5, 93),
("Durand", "Sofia", "2013-10-03", 5, 94),
("Dubois", "Oscar", "2012-05-20", 5, 95),
("Moreau", "Basile", "2018-11-14", 5, 96),
("Laurent", "Elisa", "2017-08-08", 5, 97);
