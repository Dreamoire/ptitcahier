import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import ptit_cahier_logo_original from "../../assets/images/ptit_cahier_logo_original.png";
import AnnouncementCard from "../../components/AnnouncementCard/AnnouncementCard";
import type { Announcement } from "../../types/Announcement";
import type { OutletAuthContext } from "../../types/OutletAuthContext";
import type { Student } from "../../types/Student";
import styles from "./AnnouncementsParentView.module.css";

function AnnouncementsParentView() {
  const [students, setStudents] = useState<Student[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
  const [selectedStudentId, setSelectedStudentId] = useState<number>(0);
  const { auth } = useOutletContext<OutletAuthContext>();
  const navigate = useNavigate();

  const categories = [
    { id: 0, label: "Toutes les catégories" },
    { id: 1, label: "Vie de l'école" },
    { id: 2, label: "Administratif" },
    { id: 3, label: "Événement" },
  ];

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;
    fetch(`${API_URL}/api/parents/me/students`, {
      headers: { Authorization: `Bearer ${auth?.token}` },
    })
      .then((res) => {
        // if (res.status === 401 || res.status === 403) {
        //   navigate("/redirection");
        //   return;
        // }

        // if (!res.ok) {
        // setLoadingError(true);
        //   return;
        // }

        return res.json();
      })
      .then((students: Student[] | undefined) => {
        if (!students) return;
        setStudents(students);
      });
  }, [auth]);

  useEffect(() => {
    const url = new URL(
      `${import.meta.env.VITE_API_URL}/api/parents/me/announcements`,
    );
    if (selectedCategoryId !== 0) {
      url.searchParams.append("category", String(selectedCategoryId));
    }

    if (selectedStudentId !== 0) {
      url.searchParams.append("student", String(selectedStudentId));
    }

    fetch(url.toString(), {
      headers: { Authorization: `Bearer ${auth?.token}` },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          navigate("/redirection");
          return;
        }

        // if (!res.ok) {
        // setLoadingError(true);
        //   return;
        // }

        return res.json();
      })
      .then((announcements: Announcement[] | undefined) => {
        if (!announcements) return;
        setAnnouncements(announcements);
      });
  }, [auth, navigate, selectedCategoryId, selectedStudentId]);

  const checkBoxFilter = (studentId: number) => {
    if (selectedStudentId === studentId) {
      setSelectedStudentId(0);
    } else {
      setSelectedStudentId(studentId);
    }
  };

  return (
    <main className="parent-background">
      <header className={styles.title}>
        <img
          src={ptit_cahier_logo_original}
          alt="Le P'tit Cahier"
          className={styles.logo}
        />
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
