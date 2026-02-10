// import { useEffect, useState } from "react";
import { Link } from "react-router";
// import type { Announcement } from "../../types/Announcement";
import styles from "./AnnouncementsSchoolView.module.css";

const AnnouncementsSchoolView = () => {
  //   const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  //   useEffect(() => {
  //     fetch(`${import.meta.env.VITE_API_URL}/api/schools/me/announcements`)
  //       .then((response) => response.json())
  //       .then((announcements) => {
  //         setAnnouncements(announcements);
  //       });
  //   }, []);

  return (
    <main className="parent-background">
      <header className={styles.an_title}>
        <h1 className="primary-title">Annonces publiées</h1>
      </header>
      <Link
        to="/school/announcements/new"
        className={`${styles.primary_button} ${styles.create_announcement_button}`}
      >
        Nouvelle annonce
      </Link>
      <section className={styles.an_section}>
        {/* <ul>
          {announcements.map((announcement) => (
            <li key={announcement.id}>
              <AnnouncementCard announcement={announcement} />
            </li>
          ))}
        </ul> */}
      </section>
    </main>
  );
};

export default AnnouncementsSchoolView;
