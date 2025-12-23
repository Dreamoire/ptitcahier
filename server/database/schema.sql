CREATE TABLE school (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE parent (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    password VARCHAR(255) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE announcement_category (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE ticket_category (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE class (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    school_id INT UNSIGNED NOT NULL,
    name VARCHAR(100) NOT NULL,
    FOREIGN KEY (school_id) REFERENCES school(id)
);

CREATE TABLE announcement (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    school_id INT UNSIGNED NOT NULL,         
    title VARCHAR(255) NOT NULL,
    body_message TEXT NOT NULL,              
    announcement_category_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (school_id) REFERENCES school(id),
    FOREIGN KEY (announcement_category_id) REFERENCES announcement_category(id)
);

CREATE TABLE student (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    last_name VARCHAR(100) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    parent_id INT unsigned NOT NULL,
    born_at DATE NOT NULL,
    class_id INT unsigned NOT NULL,
    FOREIGN KEY (parent_id) REFERENCES parent(id),
    FOREIGN KEY (class_id) REFERENCES class(id)
);

CREATE TABLE target_student (
    announcement_id INT UNSIGNED NOT NULL,
    student_id INT UNSIGNED NOT NULL,
    PRIMARY KEY (announcement_id, student_id),
    FOREIGN KEY (announcement_id) REFERENCES announcement(id),
    FOREIGN KEY (student_id) REFERENCES student(id)
);

CREATE TABLE ticket (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ticket_category_id INT UNSIGNED NOT NULL,
    parent_id INT UNSIGNED NOT NULL,
    body_message TEXT NOT NULL,
    FOREIGN KEY (ticket_category_id) REFERENCES ticket_category(id),
    FOREIGN KEY (parent_id) REFERENCES parent(id)
);

CREATE TABLE concerned_student ( 
    ticket_id INT UNSIGNED NOT NULL,
    student_id INT UNSIGNED NOT NULL,
    PRIMARY KEY (ticket_id, student_id),
    FOREIGN KEY (ticket_id) REFERENCES ticket(id),
    FOREIGN KEY (student_id) REFERENCES student(id)
);
