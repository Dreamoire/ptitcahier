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
    name VARCHAR(100) NOT NULL UNIQUE
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

INSERT INTO ticket_category (id, name)
VALUES
(1, "Urgence"),
(2, "Absence"),
(3, "Divers"),
(4, "Autorisation");

INSERT INTO school (email, password, school_name)
VALUES
("contact@greenvalley.edu", "GreenValley123!", "Ecole Primaire Emile Zola"),
("admin@riverside-intl.edu", "Riverside2024$", "Ecole Primaire Voltaire");

INSERT INTO parent (email, password, last_name, first_name, genre)
VALUES
('jean.dupont@email.com', 'pass123', 'Dupont', 'Jean', 'M'),
('marie.martin@email.com', 'pass123', 'Martin', 'Marie', 'F'),
('pierre.bernard@email.com', 'pass123', 'Bernard', 'Pierre', 'M'),
('julie.thomas@email.com', 'pass123', 'Thomas', 'Julie', 'F'),
('luc.petit@email.com', 'pass123', 'Petit', 'Luc', 'M'),
('sophie.robert@email.com', 'pass123', 'Robert', 'Sophie', 'F'),
('marc.richard@email.com', 'pass123', 'Richard', 'Marc', 'M'),
('isabelle.durand@email.com', 'pass123', 'Durand', 'Isabelle', 'F'),
('thomas.dubois@email.com', 'pass123', 'Dubois', 'Thomas', 'M'),
('nathalie.moreau@email.com', 'pass123', 'Moreau', 'Nathalie', 'F'),
('nicolas.laurent@email.com', 'pass123', 'Laurent', 'Nicolas', 'M'),
('celine.simon@email.com', 'pass123', 'Simon', 'Céline', 'F'),
('david.michel@email.com', 'pass123', 'Michel', 'David', 'M'),
('aurelie.lefebvre@email.com', 'pass123', 'Lefebvre', 'Aurélie', 'F'),
('christophe.leroy@email.com', 'pass123', 'Leroy', 'Christophe', 'M'),
('elodie.roux@email.com', 'pass123', 'Roux', 'Élodie', 'F'),
('julien.david@email.com', 'pass123', 'David', 'Julien', 'M'),
('stephanie.bertrand@email.com', 'pass123', 'Bertrand', 'Stéphanie', 'F'),
('frederic.morel@email.com', 'pass123', 'Morel', 'Frédéric', 'M'),
('valerie.fournier@email.com', 'pass123', 'Fournier', 'Valérie', 'F'),
('sebastien.girard@email.com', 'pass123', 'Girard', 'Sébastien', 'M'),
('sandrine.bonnet@email.com', 'pass123', 'Bonnet', 'Sandrine', 'F'),
('laurent.dupuis@email.com', 'pass123', 'Dupuis', 'Laurent', 'M'),
('veronique.lambert@email.com', 'pass123', 'Lambert', 'Véronique', 'F'),
('olivier.faure@email.com', 'pass123', 'Faure', 'Olivier', 'M'),
('christine.rousseau@email.com', 'pass123', 'Rousseau', 'Christine', 'F'),
('jerome.blanc@email.com', 'pass123', 'Blanc', 'Jérôme', 'M'),
('anne.guerin@email.com', 'pass123', 'Guerin', 'Anne', 'F'),
('guillaume.muller@email.com', 'pass123', 'Muller', 'Guillaume', 'M'),
('catherine.henry@email.com', 'pass123', 'Henry', 'Catherine', 'F'),
('benoit.roussel@email.com', 'pass123', 'Roussel', 'Benoît', 'M'),
('florence.nicolas@email.com', 'pass123', 'Nicolas', 'Florence', 'F'),
('vincent.perrin@email.com', 'pass123', 'Perrin', 'Vincent', 'M'),
('magali.morin@email.com', 'pass123', 'Morin', 'Magali', 'F'),
('arnaud.mathieu@email.com', 'pass123', 'Mathieu', 'Arnaud', 'M'),
('caroline.clement@email.com', 'pass123', 'Clement', 'Caroline', 'F'),
('franck.gauthier@email.com', 'pass123', 'Gauthier', 'Franck', 'M'),
('emilie.dumont@email.com', 'pass123', 'Dumont', 'Émilie', 'F'),
('matthieu.lopez@email.com', 'pass123', 'Lopez', 'Matthieu', 'M'),
('laetitia.fontaine@email.com', 'pass123', 'Fontaine', 'Laetitia', 'F'),
('stephane.chevalier@email.com', 'pass123', 'Chevalier', 'Stéphane', 'M'),
('helene.robin@email.com', 'pass123', 'Robin', 'Hélène', 'F'),
('romain.masson@email.com', 'pass123', 'Masson', 'Romain', 'M'),
('audrey.sanchez@email.com', 'pass123', 'Sanchez', 'Audrey', 'F'),
('ludovic.gerard@email.com', 'pass123', 'Gerard', 'Ludovic', 'M'),
('virginie.nguyen@email.com', 'pass123', 'Nguyen', 'Virginie', 'F'),
('cedric.boyer@email.com', 'pass123', 'Boyer', 'Cédric', 'M'),
('karine.denis@email.com', 'pass123', 'Denis', 'Karine', 'F'),
('fabrice.lemaire@email.com', 'pass123', 'Lemaire', 'Fabrice', 'M'),
('melanie.duval@email.com', 'pass123', 'Duval', 'Mélanie', 'F'),
('sylvain.joly@email.com', 'pass123', 'Joly', 'Sylvain', 'M'),
('delphine.gautier@email.com', 'pass123', 'Gautier', 'Delphine', 'F'),
('gregory.roger@email.com', 'pass123', 'Roger', 'Grégory', 'M'),
('laure.roche@email.com', 'pass123', 'Roche', 'Laure', 'F'),
('anthony.roy@email.com', 'pass123', 'Roy', 'Anthony', 'M'),
('claire.noel@email.com', 'pass123', 'Noel', 'Claire', 'F'),
('emmanuel.meyer@email.com', 'pass123', 'Meyer', 'Emmanuel', 'M'),
('agnes.lucas@email.com', 'pass123', 'Lucas', 'Agnès', 'F'),
('samuel.meunier@email.com', 'pass123', 'Meunier', 'Samuel', 'M'),
('patricia.jean@email.com', 'pass123', 'Jean', 'Patricia', 'F'),
('xavier.perez@email.com', 'pass123', 'Perez', 'Xavier', 'M'),
('monique.marchand@email.com', 'pass123', 'Marchand', 'Monique', 'F'),
('maxime.dufour@email.com', 'pass123', 'Dufour', 'Maxime', 'M'),
('sylvie.blanchard@email.com', 'pass123', 'Blanchard', 'Sylvie', 'F'),
('jonathan.dasilva@email.com', 'pass123', 'Da Silva', 'Jonathan', 'M'),
('camille.barbier@email.com', 'pass123', 'Barbier', 'Camille', 'F'),
('alexandre.brun@email.com', 'pass123', 'Brun', 'Alexandre', 'M'),
('chloe.dumas@email.com', 'pass123', 'Dumas', 'Chloé', 'F'),
('kevin.brunet@email.com', 'pass123', 'Brunet', 'Kévin', 'M'),
('sarah.schmitt@email.com', 'pass123', 'Schmitt', 'Sarah', 'F'),
('damien.leroux@email.com', 'pass123', 'Leroux', 'Damien', 'M'),
('laura.colin@email.com', 'pass123', 'Colin', 'Laura', 'F'),
('florian.vidal@email.com', 'pass123', 'Vidal', 'Florian', 'M'),
('manon.caron@email.com', 'pass123', 'Caron', 'Manon', 'F'),
('benjamin.picard@email.com', 'pass123', 'Picard', 'Benjamin', 'M'),
('pauline.leclerc@email.com', 'pass123', 'Leclerc', 'Pauline', 'F'),
('adrien.arnaud@email.com', 'pass123', 'Arnaud', 'Adrien', 'M'),
('alice.renard@email.com', 'pass123', 'Renard', 'Alice', 'F'),
('gabriel.gaillard@email.com', 'pass123', 'Gaillard', 'Gabriel', 'M'),
('mathilde.rolland@email.com', 'pass123', 'Rolland', 'Mathilde', 'F'),
('raphael.aubry@email.com', 'pass123', 'Aubry', 'Raphaël', 'M'),
('lea.besse@email.com', 'pass123', 'Besse', 'Léa', 'F'),
('leo.adam@email.com', 'pass123', 'Adam', 'Léo', 'M'),
('clemence.bailly@email.com', 'pass123', 'Bailly', 'Clémence', 'F'),
('theo.carpentier@email.com', 'pass123', 'Carpentier', 'Théo', 'M'),
('anais.fleury@email.com', 'pass123', 'Fleury', 'Anaïs', 'F'),
('hugo.klein@email.com', 'pass123', 'Klein', 'Hugo', 'M'),
('marion.marchal@email.com', 'pass123', 'Marchal', 'Marion', 'F'),
('enzo.hamon@email.com', 'pass123', 'Hamon', 'Enzo', 'M');;

INSERT INTO classroom (classroom_name, school_id)
VALUES
("CP", 1), 
("CE1", 1), 
("CE2", 1),
("CM1", 1),
("CM2", 1), 
("CP", 2),
("CE1", 2), 
("CE2", 2),
("CM1", 2),
("CM2", 2);

INSERT INTO student (last_name, first_name, born_at, classroom_id, parent_id)
VALUES
('Lucas', 'Dupont', '2018-05-14', 1, 1),
('Léa', 'Martin', '2017-03-22', 2, 2),
('Léo', 'Bernard', '2016-11-05', 3, 3),
('Chloé', 'Thomas', '2015-08-30', 4, 4),
('Louis', 'Petit', '2014-02-12', 5, 5),
('Emma', 'Robert', '2013-09-19', 6, 6),
('Gabriel', 'Richard', '2012-12-01', 7, 7),
('Jade', 'Durand', '2011-06-25', 8, 8),
('Arthur', 'Dubois', '2018-04-10', 9, 9),
('Manon', 'Moreau', '2017-01-15', 10, 10),
('Jules', 'Laurent', '2016-07-28', 11, 11),
('Louise', 'Simon', '2015-10-03', 12, 12),
('Raphaël', 'Michel', '2014-05-20', 13, 13),
('Alice', 'Lefebvre', '2013-11-14', 14, 14),
('Adam', 'Leroy', '2012-08-08', 15, 15),
('Lina', 'Roux', '2018-03-05', 16, 16),
('Maël', 'David', '2017-09-12', 17, 17),
('Mila', 'Bertrand', '2016-04-25', 18, 18),
('Liam', 'Morel', '2015-12-30', 19, 19),
('Rose', 'Fournier', '2014-06-18', 20, 20),
('Noah', 'Girard', '2013-02-09', 21, 21),
('Anna', 'Bonnet', '2012-05-27', 22, 22),
('Paul', 'Dupuis', '2018-11-15', 23, 23),
('Inès', 'Lambert', '2017-08-20', 24, 24),
('Ethan', 'Faure', '2016-01-10', 25, 25),
('Sarah', 'Rousseau', '2015-07-04', 26, 26),
('Sacha', 'Blanc', '2014-09-16', 27, 27),
('Julia', 'Guerin', '2013-03-22', 28, 28),
('Gabin', 'Muller', '2012-10-08', 29, 29),
('Ambre', 'Henry', '2018-02-14', 30, 30),
('Nathan', 'Roussel', '2017-06-30', 31, 31),
('Zoé', 'Nicolas', '2016-12-12', 32, 32),
('Mohamed', 'Perrin', '2015-05-05', 33, 33),
('Juliette', 'Morin', '2014-11-20', 34, 34),
('Aaron', 'Mathieu', '2013-08-15', 35, 35),
('Léna', 'Clement', '2012-01-30', 36, 36),
('Tom', 'Gauthier', '2018-09-09', 37, 37),
('Agathe', 'Dumont', '2017-04-04', 38, 38),
('Théo', 'Lopez', '2016-10-18', 39, 39),
('Mia', 'Fontaine', '2015-02-22', 40, 40),
('Léon', 'Chevalier', '2014-07-14', 41, 41),
('Lola', 'Robin', '2013-12-05', 42, 42),
('Isaac', 'Masson', '2012-06-28', 43, 43),
('Charlotte', 'Sanchez', '2018-01-19', 44, 44),
('Noé', 'Gerard', '2017-08-02', 45, 45),
('Eva', 'Nguyen', '2016-03-15', 1, 46),
('Marius', 'Boyer', '2015-09-29', 2, 47),
('Jeanne', 'Denis', '2014-12-25', 3, 48),
('Victor', 'Lemaire', '2013-05-10', 4, 49),
('Nina', 'Duval', '2012-11-20', 5, 50),
('Mathis', 'Joly', '2018-06-06', 6, 51),
('Lou', 'Gautier', '2017-10-30', 7, 52),
('Timéo', 'Roger', '2016-02-15', 8, 53),
('Camille', 'Roche', '2015-07-08', 9, 54),
('Yan', 'Roy', '2014-04-12', 10, 55),
('Romy', 'Noel', '2013-09-03', 11, 56),
('Enzo', 'Meyer', '2012-12-18', 12, 57),
('Adèle', 'Lucas', '2018-03-25', 13, 58),
('Antoine', 'Meunier', '2017-08-09', 14, 59),
('Iris', 'Jean', '2016-01-20', 15, 60),
('Robin', 'Perez', '2015-06-11', 16, 61),
('Margaux', 'Marchand', '2014-10-05', 17, 62),
('Axel', 'Dufour', '2013-02-28', 18, 63),
('Luna', 'Blanchard', '2012-05-15', 19, 64),
('Nolan', 'Da Silva', '2018-11-01', 20, 65),
('Valentine', 'Barbier', '2017-07-22', 21, 66),
('Maxence', 'Brun', '2016-12-30', 22, 67),
('Clara', 'Dumas', '2015-04-18', 23, 68),
('Gaspard', 'Brunet', '2014-08-08', 24, 69),
('Victoire', 'Schmitt', '2013-01-12', 25, 70),
('Valentin', 'Leroux', '2012-09-25', 26, 71),
('Éléonore', 'Colin', '2018-05-02', 27, 72),
('Augustin', 'Vidal', '2017-03-14', 28, 73),
('Olivia', 'Caron', '2016-10-22', 29, 74),
('Clément', 'Picard', '2015-12-09', 30, 75),
('Alix', 'Leclerc', '2014-06-03', 31, 76),
('Baptiste', 'Arnaud', '2013-11-15', 32, 77),
('Apolline', 'Renard', '2012-02-05', 33, 78),
('Côme', 'Gaillard', '2018-08-28', 34, 79),
('Capucine', 'Rolland', '2017-01-09', 35, 80),
('Simon', 'Aubry', '2016-07-17', 36, 81),
('Constance', 'Besse', '2015-03-30', 37, 82),
('Martin', 'Adam', '2014-09-12', 38, 83),
('Héloïse', 'Bailly', '2013-04-25', 39, 84),
('Evan', 'Carpentier', '2012-10-10', 40, 85),
('Suzanne', 'Fleury', '2018-02-18', 41, 86),
('Max', 'Klein', '2017-06-05', 42, 87),
('Elsa', 'Marchal', '2016-11-22', 43, 88),
('Sohan', 'Hamon', '2015-05-14', 44, 89),
('Mathéo', 'Dupont', '2014-02-12', 1, 1),
('Lise', 'Martin', '2018-09-19', 16, 2),
('Hugo', 'Bernard', '2012-12-01', 31, 3),
('Diane', 'Thomas', '2017-06-25', 2, 4),
('Arthur', 'Petit', '2016-04-10', 17, 5),
('Yasmine', 'Robert', '2015-01-15', 32, 6),
('Ibrahim', 'Richard', '2014-07-28', 3, 7),
('Sofia', 'Durand', '2013-10-03', 18, 8),
('Oscar', 'Dubois', '2012-05-20', 33, 9),
('Basile', 'Moreau', '2018-11-14', 4, 10),
('Elisa', 'Laurent', '2017-08-08', 19, 11);