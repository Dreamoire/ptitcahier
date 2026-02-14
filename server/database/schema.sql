CREATE TABLE user (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    hashed_password VARCHAR(255) NOT NULL,
    role ENUM('parent', 'school') NOT NULL
);

CREATE TABLE announcement_category (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    color VARCHAR(6) NOT NULL,
    icon VARCHAR(30) NOT NULL
);

CREATE TABLE ticket_category (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(120) NOT NULL UNIQUE,
    description VARCHAR(120),
    color VARCHAR(6) NOT NULL,
    icon VARCHAR(20) NOT NULL
);

CREATE TABLE school (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(120) NOT NULL,
    photo_url VARCHAR(255) NULL,
    user_id INT UNSIGNED NOT NULL UNIQUE,
    FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE parent (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    last_name VARCHAR(120) NOT NULL,
    first_name VARCHAR(120) NOT NULL,
    genre VARCHAR(1) NOT NULL,
    photo_url VARCHAR(255) NULL,
    user_id INT UNSIGNED NOT NULL UNIQUE,
    FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE classroom (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    school_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (school_id) REFERENCES school(id)
);

CREATE TABLE announcement (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
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
    classroom_id INT unsigned NOT NULL,
    parent_id INT unsigned NULL,
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

INSERT INTO user (email, hashed_password, role)
VALUES
  ("example@school1.com", "$argon2id$v=19$m=19456,t=2,p=1$xsYzDUDCSLYdyxW34L88bw$kfEBBkMtmsHPuN7RVZYJ8tNfG6jj1an6aUB5Tiobf+c", "school"),
("example@school2.com", "$argon2id$v=19$m=19456,t=2,p=1$xsYzDUDCSLYdyxW34L88bw$kfEBBkMtmsHPuN7RVZYJ8tNfG6jj1an6aUB5Tiobf+c", "school");

INSERT INTO user (email, hashed_password, role)
VALUES
("example@parent1.com", "$argon2id$v=19$m=19456,t=2,p=1$xsYzDUDCSLYdyxW34L88bw$kfEBBkMtmsHPuN7RVZYJ8tNfG6jj1an6aUB5Tiobf+c", "parent"),
("example@parent2.com", "$argon2id$v=19$m=19456,t=2,p=1$xsYzDUDCSLYdyxW34L88bw$kfEBBkMtmsHPuN7RVZYJ8tNfG6jj1an6aUB5Tiobf+c", "parent"),
("PierreBernard@email.com", "password123", 'parent'),
("JulieThomas@email.com", "password123", 'parent'),
("LucPetit@email.com", "password123", 'parent'),
("SophieRobert@email.com", "password123", 'parent'),
("MarcRichard@email.com", "password123", 'parent'),
("IsabelleDurand@email.com", "password123", 'parent'),
("ThomasDubois@email.com", "password123", 'parent'),
("NathalieMoreau@email.com", "password123", 'parent'),
("NicolasLaurent@email.com", "password123", 'parent'),
("CélineSimon@email.com", "password123", 'parent'),
("DavidMichel@email.com", "password123", 'parent'),
("AurélieLefebvre@email.com", "password123", 'parent'),
("ChristopheLeroy@email.com", "password123", 'parent'),
("ÉlodieRoux@email.com", "password123", 'parent'),
("JulienDavid@email.com", "password123", 'parent'),
("StéphanieBertrand@email.com", "password123", 'parent'),
("FrédéricMorel@email.com", "password123", 'parent'),
("ValérieFournier@email.com", "password123", 'parent'),
("SébastienGirard@email.com", "password123", 'parent'),
("SandrineBonnet@email.com", "password123", 'parent'),
("LaurentDupuis@email.com", "password123", 'parent'),
("VéroniqueLambert@email.com", "password123", 'parent'),
("OlivierFaure@email.com", "password123", 'parent'),
("ChristineRousseau@email.com", "password123", 'parent'),
("JérômeBlanc@email.com", "password123", 'parent'),
("AnneGuerin@email.com", "password123", 'parent'),
("GuillaumeMuller@email.com", "password123", 'parent'),
("CatherineHenry@email.com", "password123", 'parent'),
("BenoîtRoussel@email.com", "password123", 'parent'),
("FlorenceNicolas@email.com", "password123", 'parent'),
("VincentPerrin@email.com", "password123", 'parent'),
("MagaliMorin@email.com", "password123", 'parent'),
("ArnaudMathieu@email.com", "password123", 'parent'),
("CarolineClement@email.com", "password123", 'parent'),
("FranckGauthier@email.com", "password123", 'parent'),
("ÉmilieDumont@email.com", "password123", 'parent'),
("MatthieuLopez@email.com", "password123", 'parent'),
("LaetitiaFontaine@email.com", "password123", 'parent'),
("StéphaneChevalier@email.com", "password123", 'parent'),
("HélèneRobin@email.com", "password123", 'parent'),
("RomainMasson@email.com", "password123", 'parent'),
("AudreySanchez@email.com", "password123", 'parent'),
("LudovicGerard@email.com", "password123", 'parent'),
("VirginieNguyen@email.com", "password123", 'parent'),
("CédricBoyer@email.com", "password123", 'parent'),
("KarineDenis@email.com", "password123", 'parent'),
("FabriceLemaire@email.com", "password123", 'parent'),
("MélanieDuval@email.com", "password123", 'parent'),
("SylvainJoly@email.com", "password123", 'parent'),
("DelphineGautier@email.com", "password123", 'parent'),
("GrégoryRoger@email.com", "password123", 'parent'),
("LaureRoche@email.com", "password123", 'parent'),
("AnthonyRoy@email.com", "password123", 'parent'),
("ClaireNoel@email.com", "password123", 'parent'),
("EmmanuelMeyer@email.com", "password123", 'parent'),
("AgnèsLucas@email.com", "password123", 'parent'),
("SamuelMeunier@email.com", "password123", 'parent'),
("PatriciaJean@email.com", "password123", 'parent'),
("XavierPerez@email.com", "password123", 'parent'),
("MoniqueMarchand@email.com", "password123", 'parent'),
("MaximeDufour@email.com", "password123", 'parent'),
("SylvieBlanchard@email.com", "password123", 'parent'),
("JonathanDa Silva@email.com", "password123", 'parent'),
("CamilleBarbier@email.com", "password123", 'parent'),
("AlexandreBrun@email.com", "password123", 'parent'),
("ChloéDumas@email.com", "password123", 'parent'),
("KévinBrunet@email.com", "password123", 'parent'),
("SarahSchmitt@email.com", "password123", 'parent'),
("DamienLeroux@email.com", "password123", 'parent'),
("LauraColin@email.com", "password123", 'parent'),
("FlorianVidal@email.com", "password123", 'parent'),
("ManonCaron@email.com", "password123", 'parent'),
("BenjaminPicard@email.com", "password123", 'parent'),
("PaulineLeclerc@email.com", "password123", 'parent'),
("AdrienArnaud@email.com", "password123", 'parent'),
("AliceRenard@email.com", "password123", 'parent'),
("GabrielGaillard@email.com", "password123", 'parent'),
("MathildeRolland@email.com", "password123", 'parent'),
("RaphaëlAubry@email.com", "password123", 'parent'),
("LéaBesse@email.com", "password123", 'parent'),
("LéoAdam@email.com", "password123", 'parent'),
("ClémenceBailly@email.com", "password123", 'parent'),
("ThéoCarpentier@email.com", "password123", 'parent'),
("AnaïsFleury@email.com", "password123", 'parent'),
("HugoKlein@email.com", "password123", 'parent'),
("MarionMarchal@email.com", "password123", 'parent'),
("EnzoHamon@email.com", "password123", 'parent'),
("HugoDupont@email.com", "password123", 'parent'),
("StephanieMartin@email.com", "password123", 'parent'),
("AurelieSmeul@email.com", "password123", 'parent'),
("RichardThomas@email.com", "password123", 'parent'),
("SophiePetit@email.com", "password123", 'parent'),
("SarahRobert@email.com", "password123", 'parent'),
("JaquelineRichard@email.com", "password123", 'parent'),
("KevinDurand@email.com", "password123", 'parent');

INSERT INTO announcement_category (id, name, color, icon)
VALUES
(1, "Vie de l'école", "6d5bd0", "School"),
(2, "Administratif", "16a249", "ClipboardList"),
(3, "Evénement", "0da2e7", "CalendarDays");

INSERT INTO ticket_category (id, name, description, color, icon)
VALUES
(1, "Urgence", "Informer d'une situation nécessitant une action rapide (Changement de personne, incident…)", "e5484d", "OctagonAlert"),
(2, "Absence", "Signaler une absence prévue ou imprévue (Maladie, rendez-vous médical, retard…)", "f97015", "CalendarCheck"),
(3, "Divers", "Poser une question ou obtenir un renseignement (Cantine, horaires, documents…)", "16a249", "NotebookPen"),
(4, "Autorisation", "Demander une permission ou un accord spécifique (Sortie anticipée, droit à l'image…)", "0da2e7", "ShieldUser");


INSERT INTO school (name, photo_url, user_id)
VALUES
  ("École Primaire Émile Zola", "/images/schools/school_profile_1_zola.png", 1),
  ("École Primaire Voltaire", "/images/schools/school_profile_2_voltaire.png", 2);

INSERT INTO parent (last_name, first_name, genre, photo_url, user_id)
VALUES
("Dupont", "Jean", "M", "/images/parents/parent_profile_male.png", 3),
("Martin", "Marie", "F", "/images/parents/parent_profile_female.png", 4),
("Bernard", "Pierre", "M", NULL, 5),
("Thomas", "Julie", "F", NULL, 6),
("Petit", "Luc", "M", NULL, 7),
("Robert", "Sophie", "F", NULL, 8),
("Richard", "Marc", "M", NULL, 9),
("Durand", "Isabelle", "F", NULL, 10),
("Dubois", "Thomas", "M", NULL, 11),
("Moreau", "Nathalie", "F", NULL, 12),
("Laurent", "Nicolas", "M", NULL, 13),
("Simon", "Céline", "F", NULL, 14),
("Michel", "David", "M", NULL, 15),
("Lefebvre", "Aurélie", "F", NULL, 16),
("Leroy", "Christophe", "M", NULL, 17),
("Roux", "Élodie", "F", NULL, 18),
("David", "Julien", "M", NULL, 19),
("Bertrand", "Stéphanie", "F", NULL, 20),
("Morel", "Frédéric", "M", NULL, 21),
("Girard", "Sébastien", "M", NULL, 23),
("Bonnet", "Sandrine", "F", NULL, 24),
("Dupuis", "Laurent", "M", NULL, 25),
("Lambert", "Véronique", "F", NULL, 26),
("Faure", "Olivier", "M", NULL, 27),
("Rousseau", "Christine", "F", NULL, 28),
("Blanc", "Jérôme", "M", NULL, 29),
("Guerin", "Anne", "F", NULL, 30),
("Muller", "Guillaume", "M", NULL, 31),
("Henry", "Catherine", "F", NULL, 32),
("Roussel", "Benoît", "M", NULL, 33),
("Nicolas", "Florence", "F", NULL, 34),
("Perrin", "Vincent", "M", NULL, 35),
("Morin", "Magali", "F", NULL, 36),
("Mathieu", "Arnaud", "M", NULL, 37),
("Clement", "Caroline", "F", NULL, 38),
("Gauthier", "Franck", "M", NULL, 39),
("Dumont", "Émilie", "F", NULL, 40),
("Lopez", "Matthieu", "M", NULL, 41),
("Fontaine", "Laetitia", "F", NULL, 42),
("Chevalier", "Stéphane", "M", NULL, 43),
("Masson", "Romain", "M", NULL, 45),
("Sanchez", "Audrey", "F", NULL, 46),
("Gerard", "Ludovic", "M", NULL, 47),
("Nguyen", "Virginie", "F", NULL, 48),
("Boyer", "Cédric", "M", NULL, 49),
("Denis", "Karine", "F", NULL, 50),
("Lemaire", "Fabrice", "M", NULL, 51),
("Duval", "Mélanie", "F", NULL, 52),
("Joly", "Sylvain", "M", NULL, 53);

INSERT INTO classroom (name, school_id)
VALUES
("CP Les Petits Dauphins", 1),
("CE1 Les Explorateurs", 1),
("CE2 Les Artistes", 1),
("CM1 Les Genies", 1),
("CM2 Les Aventuriers", 1);

INSERT INTO student (last_name, first_name, classroom_id, parent_id)
VALUES
-- Classroom 1 (10 students)
("Dupont", "Lucas", 1, 1),
("Martin", "Léa", 1, 2),
("Bernard", "Léo", 1, 3),
("Thomas", "Chloé", 1, 4),
("Petit", "Louis", 1, 5),
("Robert", "Emma", 1, 6),
("Richard", "Gabriel", 1, 7),
("Durand", "Jade", 1, 8),
("Dubois", "Arthur", 1, 9),
("Moreau", "Manon", 1, 10),

-- Classroom 2 (10 students)
("Dupont", "Rose", 2, 1),
("Laurent", "Jules", 2, 11),
("Simon", "Louise", 2, 12),
("Michel", "Raphaël", 2, 13),
("Lefebvre", "Alice", 2, 14),
("Leroy", "Adam", 2, 15),
("Roux", "Lina", 2, 16),
("David", "Maël", 2, 17),
("Bertrand", "Mila", 2, 18),
("Morel", "Liam", 2, 19),

-- Classroom 3 (10 students)
("Girard", "Noah", 3, 20),
("Bonnet", "Anna", 3, 21),
("Dupuis", "Paul", 3, 22),
("Lambert", "Inès", 3, 23),
("Faure", "Ethan", 3, 24),
("Rousseau", "Sarah", 3, 25),
("Blanc", "Sacha", 3, 26),
("Guerin", "Julia", 3, 27),
("Muller", "Gabin", 3, 28),
("Henry", "Ambre", 3, 29),

-- Classroom 4 (10 students)
("Roussel", "Nathan", 4, 30),
("Nicolas", "Zoé", 4, 31),
("Perrin", "Mohamed", 4, 32),
("Morin", "Juliette", 4, 33),
("Mathieu", "Aaron", 4, 34),
("Clement", "Léna", 4, 35),
("Gauthier", "Tom", 4, 36),
("Dumont", "Agathe", 4, 37),
("Lopez", "Théo", 4, 38),
("Fontaine", "Mia", 4, 39),

-- Classroom 5 (10 students)
("Chevalier", "Léon", 5, 40),
("Masson", "Isaac", 5, 41),
("Sanchez", "Charlotte", 5, 42),
("Gerard", "Noé", 5, 43),
("Nguyen", "Eva", 5, 44),
("Boyer", "Marius", 5, 45),
("Denis", "Jeanne", 5, 46),
("Lemaire", "Victor", 5, 47),
("Duval", "Nina", 5, 48),
("Joly", "Mathis", 5, 49);