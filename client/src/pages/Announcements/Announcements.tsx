import { useEffect, useState } from "react";
import styles from "./Announcements.module.css";
import AnnouncementCard from "../../components/AnnouncementCard/AnnouncementCard";
import type { Announcement } from "../../types/AnnouncementType";
import logo_site from "../../assets/images/logo_site.png";
function Announcements() {
  const [announcementList, setAnnouncementList] = useState<Announcement[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/announcements`)
      .then((response) => response.json())
      .then((data) => {
        setAnnouncementList(data);
      });
  }, []);

  return (
    <main className="parent-background">
      <header className={styles.an_title}>
        <img src={logo_site} alt="Logo" className={styles.logo} />
        <h1>Fil d'actualité</h1>
      </header>
      <section className={styles.an_section}>
        <ul>
          {announcementList.map((announcement) => (
            <li key={announcement.id}>
              <AnnouncementCard {...announcement} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
export default Announcements;
