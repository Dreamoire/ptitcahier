import { useEffect, useState } from "react";
import logoSite from "../../assets/images/logo_site.png";
import AnnouncementCard from "../../components/AnnouncementCard/AnnouncementCard";
import type { Announcement } from "../../types/Announcement";
import type { School } from "../../types/school";
import styles from "./Home.module.css";

function Home() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [school, setSchool] = useState<School | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/parents/me/announcements`)
      .then((response) => response.json())
      .then((announcements) => {
        setAnnouncements(announcements);
      });

    fetch(`${import.meta.env.VITE_API_URL}/api/parents/me/school`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setSchool(data);
        }
      })
      .catch((error) => {
        console.error(
          "erreur du chargement des inforamtions de l'école",
          error,
        );
      });
  }, []);

  return (
    <main className="parent-background">
      <header className={styles.home_title}>
        <img src={logoSite} alt="Logo" className={styles.logo} />
        <article className={styles.ba_card}>
          <header className={styles.ba_card_header}>
            <h2 className="card-title">{school?.name ?? "Ecole"}</h2>
            <img
              src={`/public/images/schools/banner-${school?.id ?? 0}.jpg`}
              alt="school banner"
              className={styles.school_banner}
            />
          </header>
        </article>
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
export default Home;
