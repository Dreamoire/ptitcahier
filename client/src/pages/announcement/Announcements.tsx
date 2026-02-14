import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import logo_site from "../../assets/images/logo_site.png";
import AnnouncementCard from "../../components/AnnouncementCard/AnnouncementCard";
import type { Announcement } from "../../types/Announcement";
import type { OutletAuthContext } from "../../types/OutletAuthContext";
import type { Student } from "../../types/Student";
import styles from "./Announcements.module.css";

function Announcements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);

  const { auth } = useOutletContext<OutletAuthContext>();

  const userRole = auth?.role;

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
          if (students.length === 1) {
            setSelectedStudent(students[0].id);
          }
        });
    }
  }, [userRole]);

  const categories = [
    { id: 0, label: "Toutes les catégories" },
    { id: 1, label: "Vie de l'école" },
    { id: 2, label: "Administratif" },
    { id: 3, label: "Événement" },
  ];

  useEffect(() => {
    const headers = { Authorization: `Bearer ${auth?.token}` };
    let endpoint = "";

    if (userRole === "school") {
      endpoint = `${import.meta.env.VITE_API_URL}/api/schools/me/announcements`;
    } else {
      endpoint = `${import.meta.env.VITE_API_URL}/api/parents/me/announcements`;
    }

    const url = new URL(endpoint);

    if (selectedCategory !== 0)
      url.searchParams.append("category", String(selectedCategory));
    if (selectedStudent !== null)
      url.searchParams.append("student", String(selectedStudent));

    fetch(url.toString(), { headers })
      .then((response) => response.json())
      .then((announcements) => setAnnouncements(announcements));
  }, [auth, selectedCategory, selectedStudent, userRole]);

  const checkBoxFilter = (student: number) => {
    if (selectedStudent === student) {
      setSelectedStudent(null);
    } else {
      setSelectedStudent(student);
    }
  };

  // const deleteAnnouncement = async (announcementId: number) => {
  //   fetch(
  //     `${import.meta.env.VITE_API_URL}/api/announcements/${announcementId}`,
  //     {
  //       method: "DELETE",
  //       headers:
  //     },
  //   );

  //   setAnnouncements((prev) =>
  //     prev.filter((announcement) => announcement.id !== announcementId),
  //   );
  // };

  const deleteAnnouncement = (announcementId: number) => {
    fetch(
      `${import.meta.env.VITE_API_URL}/api/announcements/${announcementId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.token}`,
        },
      },
    ).then(() => {
      // if (!response.ok) {
      //   throw new Error("Failed to delete announcement");
      // }

      setAnnouncements((prev) =>
        prev.filter((announcement) => announcement.id !== announcementId),
      );
    });
  };

  const editAnnouncement = async (announcementId: number, content: string) => {
    fetch(
      `${import.meta.env.VITE_API_URL}/api/announcements/${announcementId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      },
    );

    setAnnouncements((prev) =>
      prev.map((announcement) =>
        announcement.id === announcementId
          ? { ...announcement, content }
          : announcement,
      ),
    );

    return true;
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
          {userRole === "school" && (
            <button
              type="button"
              className={`${styles.button_add_ann}`}
              onClick={() => navigate("/school/announcements/new")}
            >
              Nouvelle annonce
            </button>
          )}
        </nav>
      </div>
      <section className={styles.an_section}>
        <ul>
          {announcements.length > 0 ? (
            announcements.map((announcement) => (
              <li key={announcement.id}>
                <AnnouncementCard
                  announcement={announcement}
                  onDelete={
                    userRole === "school" ? deleteAnnouncement : undefined
                  }
                  onEdit={userRole === "school" ? editAnnouncement : undefined}
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
