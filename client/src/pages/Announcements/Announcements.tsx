import { useEffect, useState } from "react";
import logo_site from "../../assets/images/logo_site.png";
import AnnouncementCard from "../../components/AnnouncementCard/AnnouncementCard";
import type { Announcement } from "../../types/AnnouncementType";
import styles from "./Announcements.module.css";

function Announcements() {
  const [announcementList, setAnnouncementList] = useState<Announcement[]>([]);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    if (!apiUrl) {
      console.error(
        "Configuration manquante : VITE_API_URL n'est pas définie.",
      );
      return;
    }
    fetch(`${apiUrl}/api/announcements`)
      .then((response) => response.json())
      .then((data) => {
        setAnnouncementList(data);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des annonces :", error),
      );
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
