import { useEffect, useState } from "react";
import logo_site from "../../assets/images/logo_site.png";
import AnnouncementCard from "../../components/AnnouncementCard/AnnouncementCard";
import type { Announcement } from "../../types/Announcement";
import type { Student } from "../../types/Student";
import styles from "./Announcements.module.css";

function AnnouncementsParentView() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [students, setStudents] = useState<Student[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);

  const categories = [
    { id: null, label: "Toutes les catégories" },
    { id: 1, label: "Vie de l'école" },
    { id: 2, label: "Administratif" },
    { id: 3, label: "Événement" },
  ];

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;
    fetch(`${API_URL}/api/parents/me/students`)
      .then((response) => response.json())
      .then((students) => {
        setStudents(students);
      });
  }, []);

  useEffect(() => {
    const url = new URL(
      `${import.meta.env.VITE_API_URL}/api/parents/me/announcements`,
    );
    if (selectedCategory !== null) {
      url.searchParams.append("category", String(selectedCategory));
    }

    if (selectedStudent !== null) {
      url.searchParams.append("student", String(selectedStudent));
    }

    fetch(url.toString())
      .then((response) => response.json())
      .then((categories) => setAnnouncements(categories));
  }, [selectedCategory, selectedStudent]);

  const checkBoxFilter = (student: number) => {
    if (selectedStudent === student) {
      setSelectedStudent(null);
    } else {
      setSelectedStudent(student);
    }
  };

  return (
    <main className="parent-background">
      <header className={styles.an_title}>
        <img src={logo_site} alt="Logo" className={styles.logo} />
        <h1 className="primary-title">Fil d'actualité</h1>
      </header>

      <div className={styles.filters_container}>
        {students.length > 0 && (
          <nav className={styles.filter_bar} aria-label="Filtrer par enfant">
            <span className={styles.filter_label}>Enfants : </span>
            {students.map((student) => (
              <label key={student.id} className={styles.checkbox_label}>
                <input
                  type="checkbox"
                  className={styles.filter_checkbox}
                  checked={selectedStudent === student.id}
                  onChange={() => checkBoxFilter(student.id)}
                />
                <span className={styles.checkbox_name}>
                  {student.firstName}
                </span>
              </label>
            ))}
          </nav>
        )}

        <nav className={styles.filter_bar} aria-label="Filtrer par catégorie">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={`${styles.filter_button} ${
                selectedCategory === category.id ? styles.active : ""
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </nav>
      </div>
      <section className={styles.an_section}>
        <ul>
          {announcements.length > 0 ? (
            announcements.map((announcement) => (
              <li key={announcement.id}>
                <AnnouncementCard announcement={announcement} />
              </li>
            ))
          ) : (
            <p className={styles.empty_message}>Aucune annonce trouvée.</p>
          )}
        </ul>
      </section>
    </main>
  );
}
export default AnnouncementsParentView;
