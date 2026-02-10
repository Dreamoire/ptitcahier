import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import logo_site from "../../assets/images/logo_site.png";
import AnnouncementCard from "../../components/AnnouncementCard/AnnouncementCard";
import type { Announcement } from "../../types/Announcement";
import type { OutletAuthContext } from "../../types/OutletAuthContext";
import styles from "./AnnouncementsParentView.module.css";

function AnnouncementsParentView() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const { auth } = useOutletContext<OutletAuthContext>();

  const navigate = useNavigate();

  if (!auth) return;

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/parents/me/announcements`, {
      headers: { Authorization: `Bearer ${auth.token}` },
    })
      .then((res) => {
        if (!res.ok) {
          navigate("/redirection");
          return null;
        }
        return res.json();
      })
      .then((announcements) => {
        setAnnouncements(announcements);
      });
  }, [auth, navigate]);

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
export default AnnouncementsParentView;
