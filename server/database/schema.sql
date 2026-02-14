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

INSERT INTO user (email, hashed_password, role)
VALUES
  ("example@school1.com", "$argon2id$v=19$m=19456,t=2,p=1$xsYzDUDCSLYdyxW34L88bw$kfEBBkMtmsHPuN7RVZYJ8tNfG6jj1an6aUB5Tiobf+c", "school"),
  ("example@school2.com", "$argon2id$v=19$m=19456,t=2,p=1$xsYzDUDCSLYdyxW34L88bw$kfEBBkMtmsHPuN7RVZYJ8tNfG6jj1an6aUB5Tiobf+c", "school"),
  ("example@parent1.com", "$argon2id$v=19$m=19456,t=2,p=1$xsYzDUDCSLYdyxW34L88bw$kfEBBkMtmsHPuN7RVZYJ8tNfG6jj1an6aUB5Tiobf+c", "parent"),
  ("example@parent2.com", "$argon2id$v=19$m=19456,t=2,p=1$xsYzDUDCSLYdyxW34L88bw$kfEBBkMtmsHPuN7RVZYJ8tNfG6jj1an6aUB5Tiobf+c", "parent"),
  ("example@parent3.com", "$argon2id$v=19$m=19456,t=2,p=1$xsYzDUDCSLYdyxW34L88bw$kfEBBkMtmsHPuN7RVZYJ8tNfG6jj1an6aUB5Tiobf+c", "parent"),
  ("example@parent4.com", "$argon2id$v=19$m=19456,t=2,p=1$xsYzDUDCSLYdyxW34L88bw$kfEBBkMtmsHPuN7RVZYJ8tNfG6jj1an6aUB5Tiobf+c", "parent");

INSERT INTO school (name, photo_url, user_id)
VALUES
  ("École Primaire Émile Zola", "/images/schools/school_profile_1_zola.png", 1),
  ("École Primaire Voltaire", "/images/schools/school_profile_2_voltaire.png", 2);

INSERT INTO parent (last_name, first_name, genre, photo_url, user_id)
VALUES
  ("Martin", "Laurent", "M", "/images/parents/parent_profile_male.png", 3),
  ("Leroy", "Patricia", "F", "/images/parents/parent_profile_female.png", 4),
  ("Perrin", "Jean", "M", "/images/parents/parent_profile_male.png", 5),
  ("Turin", "Isabelle", "F","/images/parents/parent_profile_female.png", 6);

INSERT INTO classroom (name, school_id)
VALUES
("CP Les Petits Dauphins", 1),
("CE1 Les Explorateurs", 1),
("CE2 Les Artistes", 1),
("CM1 Les Genies", 1),
("CM2 Les Aventuriers", 1),
('CP', 2),
('CE1', 2),
('CE2', 2),
('CM1', 2),
('CM2', 2);

INSERT INTO student (last_name, first_name, born_at, classroom_id, parent_id)
VALUES

("Martin", "Sophie", "2014-05-14", 1, 1),
("Martin", "Lucas", "2012-09-22", 2, 1),
("Leroy", "Emma", "2013-11-30", 3, 2),
("Perrin", "Lucie", "2016-03-24", 6, 3), 
("Perin", "Michel", "2012-09-22", 7, 4), 
("Turin", "Julie", "2013-11-30", 8, 4); 

-- ("Dupont", "Lucas", "2018-05-14", 1, 1),
-- ("Martin", "Léa", "2018-06-24", 1, 2),
-- ("Bernard", "Léo", "2019-01-04", 1, 3),
-- ("Thomas", "Chloé", "2019-02-14", 1, 4),
-- ("Petit", "Louis", "2018-10-21", 1, 5),
-- ("Robert", "Emma", "2019-03-23", 1, 6),
-- ("Richard", "Gabriel", "2019-04-05", 1, 7),
-- ("Durand", "Jade", "2019-06-27", 1, 8),
-- ("Dubois", "Arthur", "2018-08-24", 1, 9),
-- ("Moreau", "Manon", "2018-08-25", 1, 10),
-- ("Laurent", "Jules", "2018-08-26", 1, 11),
-- ("Simon", "Louise", "2018-08-27", 1, 12),
-- ("Michel", "Raphaël", "2018-08-28", 1, 13),
-- ("Lefebvre", "Alice", "2018-08-29", 1, 14),
-- ("Leroy", "Adam", "2019-03-23", 1, 15),
-- ("Roux", "Lina", "2019-03-24", 1, 16),
-- ("David", "Maël", "2019-03-25", 1, 17),
-- ("Bertrand", "Mila", "2019-03-26", 1, 18),
-- ("Morel", "Liam", "2018-09-03", 1, 19),
-- ("Fournier", "Rose", "2014-06-18", 2, 1),
-- ("Girard", "Noah", "2013-02-09", 2, 20),
-- ("Bonnet", "Anna", "2012-05-27", 2, 21),
-- ("Dupuis", "Paul", "2018-11-15", 2, 22),
-- ("Lambert", "Inès", "2017-08-20", 2, 23),
-- ("Faure", "Ethan", "2016-01-10", 2, 24),
-- ("Rousseau", "Sarah", "2015-07-04", 2, 25),
-- ("Blanc", "Sacha", "2014-09-16", 2, 26),
-- ("Guerin", "Julia", "2013-03-22", 2, 27),
-- ("Muller", "Gabin", "2012-10-08", 2, 28),
-- ("Henry", "Ambre", "2018-02-14", 2, 29),
-- ("Roussel", "Nathan", "2017-06-30", 2, 30),
-- ("Nicolas", "Zoé", "2016-12-12", 2, 31),
-- ("Perrin", "Mohamed", "2015-05-05", 2, 32),
-- ("Morin", "Juliette", "2014-11-20", 2, 33),
-- ("Mathieu", "Aaron", "2013-08-15", 2, 34),
-- ("Clement", "Léna", "2012-01-30", 2, 35),
-- ("Gauthier", "Tom", "2018-09-09", 2, 36),
-- ("Dumont", "Agathe", "2017-04-04", 2, 37),
-- ("Lopez", "Théo", "2016-10-18", 2, 38),
-- ("Fontaine", "Mia", "2015-02-22", 2, 39),
-- ("Chevalier", "Léon", "2014-07-14", 2, 40),
-- ("Robin", "Lola", "2013-12-05", 3, 5),
-- ("Masson", "Isaac", "2012-06-28", 3, 41),
-- ("Sanchez", "Charlotte", "2018-01-19", 3, 42),
-- ("Gerard", "Noé", "2017-08-02", 3, 43),
-- ("Nguyen", "Eva", "2016-03-15", 3, 44),
-- ("Boyer", "Marius", "2015-09-29", 3, 45),
-- ("Denis", "Jeanne", "2014-12-25", 3, 46),
-- ("Lemaire", "Victor", "2013-05-10", 3, 47),
-- ("Duval", "Nina", "2012-11-20", 3, 48),
-- ("Joly", "Mathis", "2018-06-06", 3, 49),
-- ("Gautier", "Lou", "2017-10-30", 3, 50),
-- ("Roger", "Timéo", "2016-02-15", 3, 51),
-- ("Roche", "Camille", "2015-07-08", 3, 52),
-- ("Roy", "Yan", "2014-04-12", 3, 53),
-- ("Noel", "Romy", "2013-09-03", 3, 54),
-- ("Meyer", "Enzo", "2012-12-18", 3, 55),
-- ("Lucas", "Adèle", "2018-03-25", 3, 56),
-- ("Meunier", "Antoine", "2017-08-09", 3, 57),
-- ("Jean", "Iris", "2016-01-20", 3, 58),
-- ("Perez", "Robin", "2015-06-11", 3, 59),
-- ("Marchand", "Margaux", "2014-10-05", 4, 60),
-- ("Dufour", "Axel", "2013-02-28", 4, 61),
-- ("Blanchard", "Luna", "2012-05-15", 4, 62),
-- ("Da Silva", "Nolan", "2018-11-01", 4, 63),
-- ("Barbier", "Valentine", "2017-07-22", 4, 64),
-- ("Brun", "Maxence", "2016-12-30", 4, 65),
-- ("Dumas", "Clara", "2015-04-18", 4, 66),
-- ("Brunet", "Gaspard", "2014-08-08", 4, 67),
-- ("Schmitt", "Victoire", "2013-01-12", 4, 68),
-- ("Leroux", "Valentin", "2012-09-25", 4, 69),
-- ("Colin", "Éléonore", "2018-05-02", 4, 70),
-- ("Vidal", "Augustin", "2017-03-14", 4, 71),
-- ("Caron", "Olivia", "2016-10-22", 4, 72),
-- ("Picard", "Clément", "2015-12-09", 4, 73),
-- ("Leclerc", "Alix", "2014-06-03", 4, 74),
-- ("Arnaud", "Baptiste", "2013-11-15", 4, 75),
-- ("Renard", "Apolline", "2012-02-05", 4, 76),
-- ("Gaillard", "Côme", "2018-08-28", 4, 77),
-- ("Rolland", "Capucine", "2017-01-09", 4, 78),
-- ("Aubry", "Simon", "2016-07-17", 4, 79),
-- ("Besse", "Constance", "2015-03-30", 4, 80),
-- ("Adam", "Martin", "2014-09-12", 4, 81),
-- ("Bailly", "Héloïse", "2013-04-25", 5, 82),
-- ("Carpentier", "Evan", "2012-10-10", 5, 83),
-- ("Fleury", "Suzanne", "2018-02-18", 5, 41),
-- ("Klein", "Max", "2017-06-05", 5, 84),
-- ("Marchal", "Elsa", "2016-11-22", 5, 85),
-- ("Hamon", "Sohan", "2015-05-14", 5, 86),
-- ("Dupont", "Mathéo", "2014-02-12", 5, 87),
-- ("Martin", "Lise", "2018-09-19", 5, 88),
-- ("Bernard", "Hugo", "2012-12-01", 5, 89),
-- ("Thomas", "Diane", "2017-06-25", 5, 90),
-- ("Petit", "Arthur", "2016-04-10", 5, 91),
-- ("Robert", "Yasmine", "2015-01-15", 5, 92),
-- ("Richard", "Ibrahim", "2014-07-28", 5, 93),
-- ("Durand", "Sofia", "2013-10-03", 5, 94),
-- ("Dubois", "Oscar", "2012-05-20", 5, 95),
-- ("Moreau", "Basile", "2018-11-14", 5, 96),
-- ("Laurent", "Elisa", "2017-08-08", 5, 97);
