import { useEffect, useState } from "react";
import logo_site from "../../assets/images/logo_site.png";
import AnnouncementCard from "../../components/AnnouncementCard/AnnouncementCard";
import type { Announcement } from "../../types/Announcement";
import type { Student } from "../../types/Student";
import styles from "./AnnouncementsParentView.module.css";

function AnnouncementsParentView() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [students, setStudents] = useState<Student[]>([]);

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(
    null,
  );

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
    if (selectedCategoryId !== null) {
      url.searchParams.append("category", String(selectedCategoryId));
    }

    if (selectedStudentId !== null) {
      url.searchParams.append("student", String(selectedStudentId));
    }

    fetch(url.toString())
      .then((response) => response.json())
      .then((data) => setAnnouncements(data))
      .catch((err) => console.error(err));
  }, [selectedCategoryId, selectedStudentId]);

  const checkBoxFilter = (studentId: number) => {
    if (selectedStudentId === studentId) {
      setSelectedStudentId(null);
    } else {
      setSelectedStudentId(studentId);
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
                  checked={selectedStudentId === student.id}
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
                selectedCategoryId === category.id ? styles.active : ""
              }`}
              onClick={() => setSelectedCategoryId(category.id)}
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
