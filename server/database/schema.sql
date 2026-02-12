CREATE TABLE user (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    hashed_password VARCHAR(255) NOT NULL,
    role ENUM('parent', 'school') NOT NULL
);

CREATE TABLE announcement_category (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE
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
    user_id INT UNSIGNED NOT NULL UNIQUE,
    FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE parent (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    last_name VARCHAR(120) NOT NULL,
    first_name VARCHAR(120) NOT NULL,
    genre VARCHAR(1) NOT NULL,
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

INSERT INTO user (email, hashed_password, role)
VALUES
  ("example@school1.com", "$argon2id$v=19$m=19456,t=2,p=1$xsYzDUDCSLYdyxW34L88bw$kfEBBkMtmsHPuN7RVZYJ8tNfG6jj1an6aUB5Tiobf+c", "school"),
  ("example@school2.com", "$argon2id$v=19$m=19456,t=2,p=1$xsYzDUDCSLYdyxW34L88bw$kfEBBkMtmsHPuN7RVZYJ8tNfG6jj1an6aUB5Tiobf+c", "school"),
  ("example@parent1.com", "$argon2id$v=19$m=19456,t=2,p=1$xsYzDUDCSLYdyxW34L88bw$kfEBBkMtmsHPuN7RVZYJ8tNfG6jj1an6aUB5Tiobf+c", "parent"),
  ("example@parent2.com", "$argon2id$v=19$m=19456,t=2,p=1$xsYzDUDCSLYdyxW34L88bw$kfEBBkMtmsHPuN7RVZYJ8tNfG6jj1an6aUB5Tiobf+c", "parent"),
  ("example@parent3.com", "$argon2id$v=19$m=19456,t=2,p=1$xsYzDUDCSLYdyxW34L88bw$kfEBBkMtmsHPuN7RVZYJ8tNfG6jj1an6aUB5Tiobf+c", "parent"),
  ("example@parent4.com", "$argon2id$v=19$m=19456,t=2,p=1$xsYzDUDCSLYdyxW34L88bw$kfEBBkMtmsHPuN7RVZYJ8tNfG6jj1an6aUB5Tiobf+c", "parent");

INSERT INTO school (name, user_id)
VALUES
  ("École Primaire Emile Zola", 1),
  ("École Primaire Voltaire", 2);

INSERT INTO parent (last_name, first_name, genre, user_id)
VALUES
  ("Martin", "Laurent", "M", 3),
  ("Leroy", "Patricia", "F", 4),
  ("Perrin", "Jean", "M", 5),
  ("Turin", "Isabelle", "F", 6);

INSERT INTO classroom (name, school_id)
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
("Martin", "Sophie", "2014-05-14", 1, 1),
("Martin", "Lucas", "2012-09-22", 2, 1),
("Leroy", "Emma", "2013-11-30", 3, 2),
("Perrin", "Lucie", "2016-03-24", 6, 3), 
("Perin", "Michel", "2012-09-22", 7, 4), 
("Turin", "Julie", "2013-11-30", 8, 4); 
