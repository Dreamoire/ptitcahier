import { useEffect, useState } from "react";
import logo_site from "../../assets/images/logo_site.png";
import AnnouncementCard from "../../components/AnnouncementCard/AnnouncementCard";
import type { Announcement } from "../../types/Announcement";
import styles from "./Announcements.module.css";

function Announcements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/parents/me/announcements`)
      .then((response) => response.json())
      .then((announcements) => {
        setAnnouncements(announcements);
      });
  }, []);

  return (
    <main className="parent-background">
      <header className={styles.an_title}>
        <img src={logo_site} alt="Logo" className={styles.logo} />
        <h1 className="primary-title">Fil d'actualité</h1>
      </header>
      <section className={styles.an_section}>
        <ul>
          {announcements.map((announcement) => (
            <li key={announcement.id}>
              <AnnouncementCard announcement={announcement} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
export default Announcements;
