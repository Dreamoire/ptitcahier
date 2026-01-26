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
("mlaurent@aol.fr", "po3?JioL@143ij", "Martin", "Laurent", "M"),
("pleroy143@gmail.com", "plKJ43!lmno", "Leroy", "Patricia", "F"),
("joijeofij@hotmail.com", "Jio43!lmno", "Perrin", "Jean", "M"),
("Turin3498@gmail.com", "Turin!4309", "Turin", "Isabelle", "F");

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
('Martin', 'Sophie', '2014-05-14', 1, 1),
('Martin', 'Lucas', '2012-09-22', 2, 1),
('Dubois', 'Léo', '2014-02-10', 1, 1),
('Thomas', 'Manon', '2013-07-05', 3, 1),
('Robert', 'Hugo', '2012-11-12', 4, 1),
('Richard', 'Jade', '2014-08-30', 5, 1),
('Petit', 'Nathan', '2013-01-15', 2, 1),
('Leroy', 'Emma', '2013-11-30', 6, 2),
('Perrin', 'Lucie', '2016-03-24', 6, 2),
('Perin', 'Michel', '2012-09-22', 7, 2),
('Turin', 'Julie', '2013-11-30', 8, 2),
('Moreau', 'Enzo', '2015-04-18', 7, 2),
('Lefebvre', 'Chloé', '2014-12-01', 9, 2),
('Roux', 'Gabriel', '2013-06-20', 10, 2),
('Garcia', 'Inès', '2015-09-11', 8, 2),
('Fournier', 'Arthur', '2014-03-03', 9, 2),
('Girard', 'Sarah', '2012-05-25', 10, 2);