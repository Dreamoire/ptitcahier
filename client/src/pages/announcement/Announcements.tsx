import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import logo_site from "../../assets/images/logo_site.png";
import AnnouncementCard from "../../components/AnnouncementCard/AnnouncementCard";
import type { Announcement } from "../../types/Announcement";
import type { Student } from "../../types/Student";
import styles from "./Announcements.module.css";

type UserRole = "parent" | "school";

interface AnnouncementsProps {
  userRole: UserRole;
}

function Announcements({ userRole }: AnnouncementsProps) {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);

  const backgroundClass =
    userRole === "school" ? "school-background" : "parent-background";
  const titleText =
    userRole === "school" ? "Fil d'actualité - École" : "Fil d'actualité";

  useEffect(() => {
    if (userRole === "parent") {
      const API_URL = import.meta.env.VITE_API_URL;
      fetch(`${API_URL}/api/parents/me/students`)
        .then((response) => response.json())
        .then((students) => {
          setStudents(students);
        });
    }
  }, [userRole]);

  const categories = [
    { id: null, label: "Toutes les catégories" },
    { id: 1, label: "Vie de l'école" },
    { id: 2, label: "Administratif" },
    { id: 3, label: "Événement" },
  ];

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;

    let endpoint = "";

    if (userRole === "school") {
      endpoint = `${API_URL}/api/school/announcements`;
    } else {
      endpoint = `${API_URL}/api/parents/me/announcements`;
    }

    const url = new URL(endpoint);
    if (selectedCategory !== null)
      url.searchParams.append("category", String(selectedCategory));
    if (selectedStudent !== null)
      url.searchParams.append("student", String(selectedStudent));

    fetch(url.toString())
      .then((response) => response.json())
      .then((announcements) => setAnnouncements(announcements));
  }, [selectedCategory, selectedStudent, userRole]);

  const checkBoxFilter = (student: number) => {
    if (selectedStudent === student) {
      setSelectedStudent(null);
    } else {
      setSelectedStudent(student);
    }
  };

  const deleteAnnouncement = async (announcementId: number) => {
    fetch(
      `${import.meta.env.VITE_API_URL}/api/announcements/${announcementId}`,
      {
        method: "DELETE",
      },
    );

    setAnnouncements((prev) =>
      prev.filter((announcement) => announcement.id !== announcementId),
    );
  };

  const navigate = useNavigate();

  return (
    <main className={backgroundClass}>
      <header className={styles.an_title}>
        <img src={logo_site} alt="Logo" className={styles.logo} />
        <h1 className="primary-title">{titleText}</h1>
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
          <button
            type="button"
            className={`${styles.button_addannouncement}`}
            onClick={() => navigate("/school/announcements/new")}
          >
            Nouvelle annonce
          </button>
        </nav>
      </div>
      <section className={styles.an_section}>
        <ul>
          {announcements.length > 0 ? (
            announcements.map((announcement) => (
              <li key={announcement.id}>
                <AnnouncementCard
                  announcement={announcement}
                  userRole={userRole}
                  onDelete={
                    userRole === "school" ? deleteAnnouncement : undefined
                  }
                  key={announcement.id}
                />
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

export default Announcements;
